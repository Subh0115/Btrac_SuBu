#!/bin/bash

# Exit on error
set -e

# Debug information
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Build the Next.js application
echo "Building Next.js application..."
npm run build

echo "Build completed successfully"