// This script ensures Prisma client is generated during deployment
const { execSync } = require('child_process');

try {
  console.log('Running Prisma generate...');
  execSync('npx prisma generate');
  console.log('Prisma client generated successfully');
} catch (error) {
  console.error('Error generating Prisma client:', error);
  process.exit(1);
}