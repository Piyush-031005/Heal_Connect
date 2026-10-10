import { prisma } from './src/lib/prisma';
prisma.notificationLog.findMany({ take: 5 }).then(logs => {
  console.log(JSON.stringify(logs, null, 2));
}).catch(console.error).finally(() => prisma.$disconnect());
