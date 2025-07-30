// ✅ src/app/product/[slug]/page.tsx

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/ProductDetails";
import Image from "next/image";

// ⚡ Habilita ISR: refresca cada minuto en segundo plano
export const revalidate = 60;

// ⚡ Pre-generación de rutas conocidas
export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: { slug: true },
    take: 100, // Opcional: limita a los más recientes o destacados
  });

  return products.map((p) => ({ slug: p.slug }));
}

// ⚡ Permite fallback dinámico si no está pre-generado
export const dynamicParams = true;

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });

  if (!product) return notFound();

  const safeProduct = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    offerPrice: product.offerPrice,
    isOnOffer: product.isOnOffer,
    image: product.image,
    description: product.description,
    createdAt: product.createdAt.toISOString(),
    category: product.category
      ? {
          id: product.category.id,
          name: product.category.name,
        }
      : null,
  };

  return (
    <section className="relative w-full overflow-hidden">
      {/* Fondo texturizado */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/FondoTextura.jpg"
          alt="Fondo Textura"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-white/70"></div>
      </div>

      {/* Contenido */}
      <main className="relative max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {safeProduct.image ? (
              <img
                src={safeProduct.image}
                alt={safeProduct.name}
                className="w-full h-96 object-cover rounded"
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded">
                Sin imagen
              </div>
            )}
          </div>

          <ProductDetails product={safeProduct} />
        </div>
      </main>
    </section>
  );
}
