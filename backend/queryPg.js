const { Client } = require('pg');

async function main() {
  const client = new Client({
    connectionString: "postgresql://pgadmin:HealConnect%402026@healconnect-db.postgres.database.azure.com:5432/postgres?sslmode=require"
  });

  await client.connect();
  const users = await client.query('SELECT count(*) FROM "User"');
  const pracs = await client.query('SELECT count(*) FROM "Practitioner"');
  const sessions = await client.query('SELECT count(*) FROM "Session"');
  
  console.log('Users:', users.rows[0].count);
  console.log('Practitioners:', pracs.rows[0].count);
  console.log('Sessions:', sessions.rows[0].count);
  
  await client.end();
}

main().catch(console.error);
