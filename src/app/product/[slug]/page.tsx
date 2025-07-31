import { prisma } from "@/lib/prisma";
import Image from "next/image";
import ProductDetails from "@/components/ProductDetails";
import { notFound } from "next/navigation";

// ✅ Eliminada la interfaz PageProps → causa del conflicto de tipos

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) {
    notFound();
  }

  return (
    <section className="relative w-full overflow-hidden">
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

      <main className="relative max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={384}
                className="rounded object-cover"
                priority
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded">
                Sin imagen
              </div>
            )}
          </div>

          <ProductDetails product={product} />
        </div>
      </main>
    </section>
  );
}

// ✅ generateStaticParams con tipo explícito para evitar ambigüedad
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const products = await prisma.product.findMany({
    select: { slug: true },
  });

  return products.map((product) => ({
    slug: product.slug,
  }));
}