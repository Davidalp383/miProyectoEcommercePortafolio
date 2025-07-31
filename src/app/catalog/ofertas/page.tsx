"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  price: number | null;
  offerPrice: number | null;
  isOnOffer: boolean;
  slug: string;
  image: string | null;
};

export default function OfertasPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch("/api/products/offers");
        if (!res.ok) {
          console.error(
            "API /api/products/offers failed:",
            res.status,
            res.statusText
          );
          throw new Error("Failed to fetch offers");
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("❌ Error al traer ofertas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

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
        <div className="absolute inset-0 bg-white/80"></div>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#1C1C1E]">
          Ofertas Especiales
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Cargando ofertas...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-600">
            No hay productos en oferta actualmente.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.slug}`}
                className="group relative block border rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white"
              >
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={500}
                    height={500}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <Image
                    src="/placeholder.jpg"
                    alt="Sin imagen"
                    width={500}
                    height={500}
                    className="w-full h-64 object-cover"
                  />
                )}

                {typeof p.offerPrice === "number" &&
                  typeof p.price === "number" &&
                  p.offerPrice < p.price && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                      -
                      {Math.round(100 - (p.offerPrice / p.price) * 100)}%
                    </span>
                  )}

                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-1">{p.name}</h2>
                  <div className="flex items-center gap-2">
                    {typeof p.price === "number" && (
                      <span className="text-gray-500 line-through text-sm">
                        ${p.price.toFixed(2)}
                      </span>
                    )}
                    {typeof p.offerPrice === "number" && (
                      <span className="text-red-600 font-bold text-base">
                        ${p.offerPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
