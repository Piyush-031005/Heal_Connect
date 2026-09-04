import { prisma } from './src/lib/prisma';
async function main() {
  const active = await prisma.session.count({ where: { status: { in: ['ACTIVE', 'ACCEPTED', 'JOINING_CHANNEL'] } } });
  const all = await prisma.session.count();
  console.log(`Active: ${active}, All: ${all}`);
}
main().finally(() => prisma.$disconnect());
