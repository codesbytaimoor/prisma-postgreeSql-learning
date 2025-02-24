const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: {
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'hashedpassword',
            role: 'admin'
        }
    });
}

main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
