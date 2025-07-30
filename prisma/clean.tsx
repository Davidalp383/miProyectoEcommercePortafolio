import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Borra imágenes primero (por relación FK)
  await prisma.productImage.deleteMany({});
  console.log('🗑️ Todas las imágenes eliminadas.');

  // Borra productos
  await prisma.product.deleteMany({});
  console.log('🗑️ Todos los productos eliminados.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
