const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.wallet.updateMany({ data: { currency: 'INR' } });
  console.log('Done migrating currency to INR');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
