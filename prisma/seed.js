const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Create initial users
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice',
      password: 'alicepassword',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob',
      password: 'bobpassword',
    },
  });

  // Create initial products
  const product1 = await prisma.product.create({
    data: {
      name: 'Product 1',
      description: 'Description for product 1',
      price: 100.0,
      cost: 60.0,
      status: true,
      discount: 10.0,
      sku: 'SKU001',
      userId: user1.id,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Product 2',
      description: 'Description for product 2',
      price: 200.0,
      cost: 120.0,
      status: true,
      discount: 20.0,
      sku: 'SKU002',
      userId: user2.id,
    },
  });

  console.log({ user1, user2, product1, product2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
