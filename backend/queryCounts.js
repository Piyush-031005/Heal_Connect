const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://pgadmin:HealConnect%402026@healconnect-db.postgres.database.azure.com:5432/postgres?sslmode=require"
    }
  }
});

async function main() {
  console.log('Users:', await prisma.user.count());
  console.log('Practitioners:', await prisma.practitioner.count());
  console.log('Sessions:', await prisma.session.count());
  console.log('AdminUsers:', await prisma.adminUser.count());
}

main().catch(console.error).finally(() => process.exit(0));
