require('dotenv').config();
import { prisma } from './src/lib/prisma';

async function test() {
  const user = await prisma.user.findFirst({ where: { name: 'DeepaK SharMa' } });
  if (!user) return console.log('User not found');
  console.log('User ID:', user.id);

  const practitioner = await prisma.practitioner.findFirst({ where: { name: 'Deepak\'s Expert' } });
  if (!practitioner) return console.log('Practitioner not found');
  console.log('Practitioner ID:', practitioner.id);

  try {
    const result = await prisma.$transaction(async (tx) => {
      const p = await tx.practitioner.findUnique({
        where: { id: practitioner.id },
        select: { id: true, isOnline: true, perMinuteRate: true },
      });
      console.log('Practitioner details:', p);

      const wallet = await tx.wallet.findUnique({ where: { userId: user.id } });
      console.log('Wallet:', wallet);

      const session = await tx.session.create({
        data: {
          userId: user.id,
          practitionerId: practitioner.id,
          type: 'CHAT',
          status: 'INITIATED',
          perMinuteRate: p.perMinuteRate,
          createdAt: new Date(),
        },
        include: { user: { select: { id: true, name: true, photoUrl: true } } },
      });
      return session;
    });
    console.log('Success:', result.id);
  } catch (err) {
    console.error('Error in transaction:', err);
  }
}
test().catch(console.error).finally(() => prisma.$disconnect());
