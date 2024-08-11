import {PrismaClient} from '@prisma/client'

const client = new PrismaClient()

const seed = async () => {
  const entries = await client.categories.count()
  if (entries > 0) {
    return
  }

  console.log('Start seeding')

  const categories = [
    {name: 'Lanche'},
    {name: 'Acompanhamento'},
    {name: 'Bebida'},
    {name: 'Sobremesa'},
  ];
  await client.categories.createMany({data: categories})
}

seed()
  .then(async () => {
    console.log('Database seeded')
    await client.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await client.$disconnect()
    process.exit(1)
  })
