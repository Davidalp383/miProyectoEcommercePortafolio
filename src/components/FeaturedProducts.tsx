// ✅ src/components/FeaturedProducts.tsx — versión Server Component optimizada
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const revalidate = 60; // ⚡ Habilita ISR cada 60s

export default async function FeaturedProducts() {
  // Primero, productos en oferta
  const offers = await prisma.product.findMany({
    where: { isOnOffer: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  let products = offers;

  // Si faltan para completar, trae recientes
  if (offers.length < 4) {
    const extra = await prisma.product.findMany({
      where: { id: { notIn: offers.map((p) => p.id) } },
      orderBy: { createdAt: "desc" },
      take: 4 - offers.length,
    });
    products = [...offers, ...extra];
  }

  if (products.length === 0) return null;

  return (
    <section className="relative max-w-7xl mx-auto px-4 py-16 overflow-hidden">
      {/* Fondo texturizado + overlay blanco */}
      <div className="absolute inset-0 z-0 bg-[url('/FondoTextura.jpg')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 z-0 bg-white/70"></div>

      {/* Título */}
      <h2 className="relative z-10 text-3xl font-bold mb-8 text-center text-[#1C1C1E] font-montserrat">
        Productos Destacados
      </h2>

      {/* Grid */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group block border border-[#E5E7EB] rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <div className="relative w-full h-64">
              <Image
                src={product.image || "/placeholder.jpg"}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-4 bg-white/90 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-2 font-montserrat text-[#1C1C1E]">
                {product.name}
              </h3>
              <p className="text-[#6B21A8] font-bold font-source group-hover:text-[#F97316] transition">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
