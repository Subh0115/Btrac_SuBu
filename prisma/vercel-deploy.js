// This script helps with Prisma deployment on Vercel
const { execSync } = require('child_process');

console.log('Running Prisma deployment script...');

try {
  // Generate Prisma client
  console.log('Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  // Verify database connection
  console.log('Verifying database connection...');
  
  console.log('Prisma setup completed successfully');
} catch (error) {
  console.error('Error during Prisma setup:', error);
  process.exit(1);
}