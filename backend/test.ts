import { prisma } from './src/lib/prisma';

async function main() {
  const p = await prisma.practitioner.findMany({ select: { name: true, photoUrl: true } });
  console.log(p);
}

main().finally(() => prisma.$disconnect());
