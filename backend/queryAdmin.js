require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Users:', await prisma.user.count());
  console.log('Practitioners:', await prisma.practitioner.count());
  console.log('Sessions:', await prisma.session.count());
}

main().catch(console.error).finally(() => process.exit(0));
