// prisma/seed.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: 'Product 1',
        description: 'Description for product 1',
        price: 19.99,
        cost: 15.00,
        discount: 2.0,
        sku: 'PROD001',
      },
      {
        name: 'Product 2',
        description: 'Description for product 2',
        price: 29.99,
        cost: 20.00,
        discount: 3.0,
        sku: 'PROD002',
      },
      {
        name: 'Product 3',
        description: 'Description for product 3',
        price: 39.99,
        cost: 25.00,
        discount: 5.0,
        sku: 'PROD003',
      },
      {
        name: 'Product 4',
        description: 'Description for product 4',
        price: 49.99,
        cost: 30.00,
        discount: 4.0,
        sku: 'PROD004',
      },
      {
        name: 'Product 5',
        description: 'Description for product 5',
        price: 59.99,
        cost: 40.00,
        discount: 10.0,
        sku: 'PROD005',
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
