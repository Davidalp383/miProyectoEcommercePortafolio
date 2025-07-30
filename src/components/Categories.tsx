"use client";

import Link from "next/link";
import Image from "next/image";

// ✅ Imágenes Cloudinary subidas
const categories = [
  {
    name: "Hombre",
    href: "/catalog?categoryId=5",
    image: "https://res.cloudinary.com/dffotyl1i/image/upload/descarga_1_xq8v5f.jpg",
  },
  {
    name: "Mujer",
    href: "/catalog?categoryId=6",
    image: "https://res.cloudinary.com/dffotyl1i/image/upload/descarga_kiuer3.jpg",
  },
  {
    name: "Accesorios",
    href: "/catalog?categoryId=7",
    image: "https://res.cloudinary.com/dffotyl1i/image/upload/samples/ecommerce/leather-bag-gray.jpg",
  },
  {
    name: "Ofertas",
    href: "/catalog/ofertas",
    image: "https://res.cloudinary.com/dffotyl1i/image/upload/samples/ecommerce/analog-classic.jpg",
  },
];

export default function Categories() {
  return (
    <section className="relative max-w-7xl mx-auto px-4 py-16 overflow-hidden rounded-xl">
      {/* Fondo con textura y overlay morado más transparente */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/FondoTextura.jpg"
          alt="Textura de fondo"
          fill
          className="object-cover"
          priority // Fondo, sí va con prioridad
        />
        <div className="absolute inset-0 bg-[#6B21A8]/50"></div>
      </div>

      {/* Contenido */}
      <h2 className="relative z-10 text-3xl md:text-4xl font-bold mb-8 text-center text-white">
        Categorías Destacadas
      </h2>

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <Link
            key={cat.name}
            href={cat.href}
            className="group relative block overflow-hidden rounded-xl shadow-md hover:shadow-xl transition"
          >
            <div className="relative w-full h-48">
              <Image
                src={cat.image || "/placeholder.jpg"} // ✅ Fallback robusto
                alt={cat.name}
                fill
                priority={index === 0} // ✅ Solo la primera imagen tiene prioridad
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white text-lg font-semibold tracking-wide group-hover:text-[#F97316] transition-colors duration-300">
                {cat.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
