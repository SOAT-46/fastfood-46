import {PrismaClient} from '@prisma/client'

const client = new PrismaClient()

const seed = async () => {
  const categoriesEntries = await client.categories.count();
  const productsEntries = await client.products.count();

  const entries = categoriesEntries + productsEntries;

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

  const products = [
    {name: 'Misto', description: 'Misto', price: 10, categoryId: 1},
    {name: 'Batata frita', description: 'Batata frita', price: 8, categoryId: 2},
    {name: 'Suco de laranja', description: 'Suco de laranja', price: 5, categoryId: 3},
    {name: 'Pudim', description: 'Pudim', price: 6, categoryId: 4}
  ];
  await client.products.createMany({data: products})
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
