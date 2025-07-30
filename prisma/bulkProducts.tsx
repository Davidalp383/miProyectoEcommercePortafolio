// ✅ prisma/bulkProducts.tsx

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      name: "Zapatos Hombre",
      description: "Zapatos formales para hombre",
      price: 90,
      isOnOffer: false,
      slug: "zapatos-hombre",
      categoryId: 5,
      image: "https://res.cloudinary.com/dffotyl1i/image/upload/descarga_1_xq8v5f.jpg",
    },
    {
      name: "Blusa Mujer",
      description: "Blusa casual para mujer",
      price: 40,
      isOnOffer: false,
      slug: "blusa-mujer",
      categoryId: 6,
      image: "https://res.cloudinary.com/dffotyl1i/image/upload/descarga_kiuer3.jpg",
    },
    {
      name: "Mesa de Centro",
      description: "Mesa de centro moderna",
      price: 150,
      isOnOffer: true,
      offerPrice: 120,
      slug: "mesa-centro",
      categoryId: 7,
      image: "https://res.cloudinary.com/dffotyl1i/image/upload/samples/shoe.jpg",
    },
    {
      name: "Smartphone",
      description: "Smartphone de última generación",
      price: 800,
      isOnOffer: false,
      slug: "smartphone",
      categoryId: 8,
      image: "https://res.cloudinary.com/dffotyl1i/image/upload/samples/smile.jpg",
    },
    {
      name: "Chaqueta Hombre",
      description: "Chaqueta impermeable",
      price: 120,
      isOnOffer: true,
      offerPrice: 95,
      slug: "chaqueta-hombre",
      categoryId: 5,
      image: "https://res.cloudinary.com/dffotyl1i/image/upload/descarga_2_nvngay.jpg",
    },
    {
      name: "Falda Mujer",
      description: "Falda casual para oficina",
      price: 55,
      isOnOffer: false,
      slug: "falda-mujer",
      categoryId: 6,
      image: "https://res.cloudinary.com/dffotyl1i/image/upload/descarga_kiuer3.jpg",
    },
    {
      name: "Lámpara Decorativa",
      description: "Lámpara de mesa para hogar",
      price: 70,
      isOnOffer: false,
      slug: "lampara-decorativa",
      categoryId: 7,
      image: "https://res.cloudinary.com/dffotyl1i/image/upload/samples/ecommerce/leather-bag-gray.jpg",
    },
    {
      name: "Audífonos Inalámbricos",
      description: "Audífonos bluetooth con cancelación",
      price: 200,
      isOnOffer: true,
      offerPrice: 150,
      slug: "audifonos-inalambricos",
      categoryId: 8,
      image: "https://res.cloudinary.com/dffotyl1i/image/upload/samples/ecommerce/analog-classic.jpg",
    },
    {
      name: "Gorra Hombre",
      description: "Gorra casual para hombre",
      price: 25,
      isOnOffer: false,
      slug: "gorra-hombre",
      categoryId: 5,
      image: "https://res.cloudinary.com/dffotyl1i/image/upload/descarga_1_xq8v5f.jpg",
    },
    {
      name: "Bolso Mujer",
      description: "Bolso elegante para mujer",
      price: 95,
      isOnOffer: true,
      offerPrice: 80,
      slug: "bolso-mujer",
      categoryId: 6,
      image: "https://res.cloudinary.com/dffotyl1i/image/upload/descarga_kiuer3.jpg",
    },
  ];

  await prisma.product.createMany({
    data: products,
  });

  console.log("✅ Productos creados en masa correctamente");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  // ejecutarlo: npx tsx prisma/bulkProducts.tsx
