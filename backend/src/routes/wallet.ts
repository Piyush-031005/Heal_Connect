import { Router, type Request, type Response } from 'express';
import { body } from 'express-validator';
import Stripe from 'stripe';
import { prisma } from '../lib/prisma';
import { requireAuth, requireAdmin, type AuthRequest } from '../middleware/auth';
import { handleValidation } from '../middleware/validate';

const router = Router();

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'dummy_stripe_secret');

// ─── Get Wallet Balance & Transactions ────────────────────────────────────────

router.get('/', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const practitionerId = req.user?.practitionerId || (req.user?.role === 'practitioner' ? req.user.userId : undefined);
    
    // Check if authenticated user is a practitioner
    let practitioner = null;
    if (practitionerId) {
      practitioner = await prisma.practitioner.findUnique({
        where: { id: practitionerId },
      });
    } else if (req.user?.userId) {
      practitioner = await prisma.practitioner.findUnique({
        where: { id: req.user.userId },
      });
    }

    if (practitioner) {
      const [aggregations, recentSessions] = await Promise.all([
        prisma.session.aggregate({
          where: { practitionerId: practitioner.id, status: 'COMPLETED' },
          _sum: { totalCost: true },
          _count: { _all: true },
        }),
        prisma.session.findMany({
          where: { practitionerId: practitioner.id, status: 'COMPLETED' },
          orderBy: { endTime: 'desc' },
          take: 20,
          include: { user: { select: { name: true } } },
        }),
      ]);

      const earnings = aggregations._sum.totalCost || 0;
      const transactions = recentSessions.map((s) => ({
        id: s.id,
        amount: s.totalCost,
        type: 'EARNING',
        status: 'SUCCESS',
        description: `${s.type} session with ${s.user.name || 'Client'}`,
        createdAt: s.endTime ? s.endTime.toISOString() : s.createdAt.toISOString(),
      }));

      res.json({
        success: true,
        data: {
          wallet: {
            id: practitioner.id,
            balance: earnings,
            currency: 'INR',
            totalEarnings: earnings,
            totalSessionsCompleted: aggregations._count._all,
            transactions,
          },
        },
      });
      return;
    }

    // Normal User Wallet
    let wallet = await prisma.wallet.findUnique({
      where: { userId: req.user!.userId },
      include: {
        transactions: {
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
      },
    });

    if (!wallet) {
      // Auto-create wallet for standard user if not found
      try {
        wallet = await prisma.wallet.create({
          data: {
            userId: req.user!.userId,
            balance: 0,
            currency: 'INR',
          },
          include: {
            transactions: true,
          },
        });
      } catch {
        // Fallback response with zero balance if user table constraints fail
        res.json({
          success: true,
          data: {
            wallet: {
              id: req.user!.userId,
              balance: 0,
              currency: 'INR',
              transactions: [],
            },
          },
        });
        return;
      }
    }

    res.json({ success: true, data: { wallet } });
  } catch (err) {
    console.error('Fetch wallet error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// ─── Temp Dev Recharge (Bypass Gateway) ─────────────────────────────────────────

router.post(
  '/dev-recharge',
  requireAuth,
  requireAdmin,
  [body('amount').isNumeric().withMessage('Amount must be a number')],
  handleValidation,
  async (req: AuthRequest, res: Response) => {
    if (process.env['NODE_ENV'] === 'production') {
      res.status(403).json({ success: false, message: 'Not available in production' });
      return;
    }
    const { amount } = req.body as { amount: number };
    try {
      // Tasks 8/9: Wrap balance update in a single atomic $transaction to prevent
      // concurrent dev-recharge calls from double-crediting the wallet.
      const updatedWallet = await prisma.$transaction(async (tx) => {
        const wallet = await tx.wallet.findUnique({ where: { userId: req.user!.userId } });
        if (!wallet) return null;

        await tx.transaction.create({
          data: {
            walletId: wallet.id,
            amount,
            type: 'RECHARGE',
            status: 'SUCCESS',
            referenceId: `dev_recharge_${Date.now()}_${Math.random().toString(36).slice(2)}`,
          }
        });

        return tx.wallet.update({
          where: { id: wallet.id },
          data: { balance: { increment: amount } },
        });
      });

      if (!updatedWallet) {
        res.status(404).json({ success: false, message: 'Wallet not found' });
        return;
      }

      res.json({ success: true, message: 'Dev recharge successful', data: { balance: updatedWallet.balance } });
    } catch (err) {
      console.error('Dev recharge error:', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
);


// ─── Initialize Recharge (Create Stripe Checkout Session) ─────────────────

router.post(
  '/recharge/stripe',
  requireAuth,
  [body('amount').isNumeric().custom((val) => val >= 10).withMessage('Amount must be at least ₹10 (equivalent)')],
  handleValidation,
  async (req: AuthRequest, res: Response) => {
    const { amount } = req.body as { amount: number };

    try {
      const wallet = await prisma.wallet.findUnique({ where: { userId: req.user!.userId } });
      if (!wallet) {
        res.status(404).json({ success: false, message: 'Wallet not found' });
        return;
      }

      // Stripe expects amount in cents
      const amountInCents = Math.round(amount * 100);

      // Create a PENDING transaction in DB
      const transaction = await prisma.transaction.create({
        data: {
          walletId: wallet.id,
          amount,
          type: 'RECHARGE',
          status: 'PENDING',
          // we'll update referenceId when session is created
        },
      });

      const frontendUrl = process.env.APP_URL || (process.env.NODE_ENV === 'production' ? 'https://blue-plant-0d21bc900.7.azurestaticapps.net' : 'http://localhost:3000');

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'ZenAuraa Wallet Recharge',
                description: `Recharge wallet with $${amount}`,
              },
              unit_amount: amountInCents,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${frontendUrl}/dashboard/wallet?recharge=success`,
        cancel_url: `${frontendUrl}/dashboard/wallet?recharge=cancel`,
        client_reference_id: transaction.id,
      });

      // Update the transaction with the Stripe Session ID
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: { referenceId: session.id },
      });

      res.json({
        success: true,
        data: {
          url: session.url,
          sessionId: session.id,
        },
      });
    } catch (err) {
      console.error('Stripe recharge init error:', err);
      res.status(500).json({ success: false, message: 'Failed to initialize Stripe recharge' });
    }
  }
);

// ─── Stripe Webhook (Payment Captured) ────────────────────────────────────────

router.post('/stripe-webhook', async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  // Notice we use req.rawBody which we set in index.ts
  const rawBody = (req as any).rawBody;

  let event;

  try {
    // Fail closed instead of falling back to a hardcoded, publicly-visible secret.
    if (!webhookSecret) throw new Error('STRIPE_WEBHOOK_SECRET is not set');
    if (!sig || !rawBody) throw new Error('Missing stripe signature or raw body');
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    console.error('Stripe Webhook Error:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const transactionId = session.client_reference_id;

    if (transactionId) {
      try {
        await prisma.$transaction(async (tx) => {
          const transaction = await tx.transaction.findUnique({
            where: { id: transactionId },
          });

          if (!transaction || transaction.status === 'SUCCESS') return;

          // Mark transaction as SUCCESS
          await tx.transaction.update({
            where: { id: transactionId },
            data: { status: 'SUCCESS' },
          });

          // Add amount to wallet
          await tx.wallet.update({
            where: { id: transaction.walletId },
            data: { balance: { increment: transaction.amount } },
          });
        });
        console.log(`Stripe recharge successful for transaction: ${transactionId}`);
      } catch (dbErr) {
        console.error('Failed to process Stripe transaction in DB:', dbErr);
      }
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
});

export default router;
