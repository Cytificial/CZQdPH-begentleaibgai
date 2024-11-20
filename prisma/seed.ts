import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      id: 'admin-id',
      email: 'admin@admin.com',
      password: 'admin@admin',
      globalRole: 'ADMIN'
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
