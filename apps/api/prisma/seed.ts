import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      email: "test@test.com",
      firstName: "John",
      lastName: "Smith",
      password: "$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm",
    },
  });
}

main()
  .catch((e: unknown) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
