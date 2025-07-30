import { prisma } from '@/lib/prisma';

async function main() {
  await prisma.category.deleteMany({});
  console.log('✅ Todas las categorías fueron eliminadas.');
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
