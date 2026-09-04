import { prisma } from './src/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const email = 'admin@zenauraa.com';
  const password = 'Password123!';
  const passwordHash = await bcrypt.hash(password, 12);
  
  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: {
      email,
      passwordHash,
      role: 'superadmin',
    }
  });
  
  console.log(`Admin created: ${admin.email} / ${password}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
