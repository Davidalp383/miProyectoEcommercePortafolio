import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import ProductGrid from "@/components/ProductGrid";
import { prisma } from "@/lib/prisma";

export const revalidate = 300;

export const metadata = {
  title: "Catálogo | Nexus",
  description: "Explora todos nuestros productos disponibles.",
};

async function getCategories() {
  return prisma.category.findMany();
}

async function getProducts(categoryId?: string) {
  return prisma.product.findMany({
    where: categoryId ? { categoryId: Number(categoryId) } : {},
    include: { category: true },
  });
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: { categoryId?: string };
}) {
  const categoryId = searchParams.categoryId ?? "";

  const [products, categories] = await Promise.all([
    getProducts(categoryId),
    getCategories(),
  ]);

  return (
    <main className="relative w-full overflow-hidden">
      {/* Fondo texturizado */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/FondoTextura.jpg"
          alt="Fondo Textura"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-white/80"></div>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Catálogo</h1>

        <div className="mb-6 flex gap-4 flex-wrap">
          <Link href="/catalog" className="px-4 py-2 border rounded bg-white">
            Todos
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/catalog?categoryId=${cat.id}`}
              className="px-4 py-2 border rounded bg-white"
            >
              {cat.name}
            </Link>
          ))}
        </div>

        <Suspense fallback={<p className="text-center">Cargando productos...</p>}>
          <ProductGrid products={products} />
        </Suspense>
      </div>
    </main>
  );
}
