const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const reviews = await prisma.review.findMany();
  console.log('Reviews:', reviews);
  const practitioners = await prisma.practitioner.findMany({ select: { id: true, name: true, avgRating: true, reviewCount: true } });
  console.log('Practitioners:', practitioners);
}

main().catch(console.error).finally(() => prisma.$disconnect());
