import { Router, Response, Request, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../lib/prisma';
import { requireAuth, AuthRequest } from '../middleware/auth';

const handleValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, errors: errors.array() });
    return;
  }
  next();
};

const router = Router();

// ─── GET /api/availability/:practitionerId — Fetch availability slots ────────
router.get('/:practitionerId', async (req: Request, res: Response) => {
  try {
    const { practitionerId } = req.params;
    const { startDate, endDate } = req.query;

    const whereClause: any = { practitionerId };
    
    if (startDate && endDate) {
      whereClause.startTime = {
        gte: new Date(startDate as string),
        lte: new Date(endDate as string),
      };
    } else {
      whereClause.startTime = {
        gte: new Date(),
      };
    }

    const slots = await prisma.availabilitySlot.findMany({
      where: whereClause,
      orderBy: { startTime: 'asc' }
    });

    res.json({ success: true, data: { slots } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── POST /api/availability — Create availability slots (Expert only) ────────
router.post(
  '/',
  requireAuth,
  [
    body('startTime').isISO8601().toDate().withMessage('Invalid start time'),
    body('endTime').isISO8601().toDate().withMessage('Invalid end time'),
  ],
  handleValidation,
  async (req: AuthRequest, res: Response) => {
    const practitionerId = req.user!.practitionerId;
    if (!practitionerId) {
      res.status(403).json({ success: false, message: 'Only practitioners can manage availability' });
      return;
    }

    const { startTime, endTime } = req.body;
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start >= end) {
      res.status(400).json({ success: false, message: 'Start time must be before end time' });
      return;
    }

    const diffHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    if (diffHours > 2) {
      res.status(400).json({ success: false, message: 'A single slot cannot be longer than 2 hours' });
      return;
    }

    try {
      // Check for overlap
      const overlap = await prisma.availabilitySlot.findFirst({
        where: {
          practitionerId,
          startTime: { lt: end },
          endTime: { gt: start }
        }
      });

      if (overlap) {
        res.status(409).json({ success: false, message: 'This time overlaps with an existing availability slot.' });
        return;
      }

      const slot = await prisma.availabilitySlot.create({
        data: {
          practitionerId,
          startTime: start,
          endTime: end,
          isBooked: false,
        }
      });

      res.status(201).json({ success: true, data: { slot } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// ─── DELETE /api/availability/:id — Delete a slot (Expert only) ─────────────
router.delete(
  '/:id',
  requireAuth,
  async (req: AuthRequest, res: Response) => {
    const practitionerId = req.user!.practitionerId;
    if (!practitionerId) {
      res.status(403).json({ success: false, message: 'Only practitioners can manage availability' });
      return;
    }

    const slotId = req.params.id as string;

    try {
      const slot = await prisma.availabilitySlot.findFirst({
        where: { id: slotId, practitionerId }
      });

      if (!slot) {
        res.status(404).json({ success: false, message: 'Slot not found' });
        return;
      }

      if (slot.isBooked) {
        res.status(400).json({ success: false, message: 'Cannot delete a booked slot' });
        return;
      }

      await prisma.availabilitySlot.delete({
        where: { id: slotId }
      });

      res.json({ success: true, message: 'Slot deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// ─── PUT /api/availability/toggle — Toggle calendar scheduling ──────────────
router.put(
  '/toggle',
  requireAuth,
  [
    body('schedulingEnabled').isBoolean().withMessage('schedulingEnabled must be a boolean')
  ],
  handleValidation,
  async (req: AuthRequest, res: Response) => {
    const practitionerId = req.user!.practitionerId;
    if (!practitionerId) {
      res.status(403).json({ success: false, message: 'Only practitioners can manage availability settings' });
      return;
    }

    const { schedulingEnabled } = req.body;

    try {
      const practitioner = await prisma.practitioner.update({
        where: { id: practitionerId },
        data: { schedulingEnabled }
      });

      res.json({ success: true, data: { schedulingEnabled: practitioner.schedulingEnabled } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

export default router;
