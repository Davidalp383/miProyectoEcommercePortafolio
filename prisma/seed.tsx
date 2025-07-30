import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ✅ Limpia productos (no necesitas borrar imágenes aparte)
  await prisma.product.deleteMany();
  console.log("🧹 Productos eliminados");

  // ✅ Crea 7 productos con 1 imagen cada uno
  const productsData = [
    {
      name: "Camisa Hombre",
      description: "Camisa casual para hombre",
      price: 50,
      isOnOffer: false,
      slug: "camisa-hombre",
      categoryId: 5,
      image: "https://res.cloudinary.com/dffotyl1i/image/upload/descarga_1_xq8v5f.jpg",
    },
    {
      name: "Vestido Mujer",
      description: "Vestido elegante para mujer",
      price: 80,
      isOnOffer: false,
      slug: "vestido-mujer",
      categoryId: 6,
      image: "https://res.cloudinary.com/dffotyl1i/image/upload/descarga_kiuer3.jpg",
    },
    {
      name: "Silla Hogar",
      description: "Silla moderna para hogar",
      price: 120,
      isOnOffer: false,
      slug: "silla-hogar",
      categoryId: 7,
      image: "https://res.cloudinary.com/dffotyl1i/image/upload/samples/shoe.jpg",
    },
    {
      name: "Laptop Tecnología",
      description: "Laptop de alto rendimiento",
      price: 1400,
      isOnOffer: false,
      slug: "laptop-tecnologia",
      categoryId: 8,
      image: "https://res.cloudinary.com/dffotyl1i/image/upload/samples/smile.jpg",
    },
    {
      name: "Camisa Hombre Oferta",
      description: "Camisa de hombre en descuento",
      price: 50,
      offerPrice: 35,
      isOnOffer: true,
      slug: "camisa-hombre-oferta",
      categoryId: 5,
      image: "https://res.cloudinary.com/dffotyl1i/image/upload/descarga_2_nvngay.jpg",
    },
    {
      name: "Bolso de Cuero Oferta",
      description: "Bolso de cuero gris en oferta",
      price: 150,
      offerPrice: 120,
      isOnOffer: true,
      slug: "bolso-cuero-oferta",
      categoryId: 7,
      image: "https://res.cloudinary.com/dffotyl1i/image/upload/samples/ecommerce/leather-bag-gray.jpg",
    },
    {
      name: "Reloj Clásico Oferta",
      description: "Reloj analógico clásico en oferta",
      price: 200,
      offerPrice: 150,
      isOnOffer: true,
      slug: "reloj-clasico-oferta",
      categoryId: 8,
      image: "https://res.cloudinary.com/dffotyl1i/image/upload/samples/ecommerce/analog-classic.jpg",
    },
  ];

  await prisma.product.createMany({
    data: productsData,
  });

  console.log("✅ Productos de prueba con imágenes Cloudinary creados");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
