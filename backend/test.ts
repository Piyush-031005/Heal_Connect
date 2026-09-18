import { prisma } from './src/lib/prisma';

async function main() {
  const user = await prisma.user.findFirst({
    where: { phone: '+919105149594' }
  });
  console.log('User for +919105149594:', user);
  
  const anyUser = await prisma.user.findFirst({
    where: { name: 'Vaishu Test 2' }
  });
  console.log('User named Vaishu Test 2:', anyUser);
}

main().finally(() => prisma.$disconnect());
