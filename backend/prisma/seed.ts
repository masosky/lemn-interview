import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "hashedpassword123",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Jane Smith",
      email: "janesmith@example.com",
      password: "hashedpassword456",
    },
  });

  // Create Books
  const book1 = await prisma.book.create({
    data: {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: 10.99,
      stock: 5,
    },
  });

  const book2 = await prisma.book.create({
    data: {
      title: "1984",
      author: "George Orwell",
      price: 8.99,
      stock: 10,
    },
  });

  // Create an Order
  const order1 = await prisma.order.create({
    data: {
      userId: user1.id,
      total: 19.98,
      items: {
        create: [
          {
            bookId: book1.id,
            quantity: 1,
            price: book1.price,
          },
          {
            bookId: book2.id,
            quantity: 1,
            price: book2.price,
          },
        ],
      },
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
