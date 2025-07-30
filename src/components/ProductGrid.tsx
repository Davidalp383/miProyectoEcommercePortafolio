"use client";

import Link from "next/link";
import Image from "next/image";

type Product = {
  id: number;
  slug: string;
  name: string;
  price: number;
  image?: string | null;
  category?: {
    name: string;
  } | null;
};

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.slug}`}
          className="border p-4 rounded hover:shadow bg-white"
        >
          <div className="aspect-square bg-gray-100 mb-2 overflow-hidden relative">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Sin imagen
              </div>
            )}
          </div>
          <h2 className="text-sm font-semibold">{product.name}</h2>
          <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
          <p className="text-xs text-gray-400">
            {product.category?.name ?? "Sin categoría"}
          </p>
        </Link>
      ))}
    </div>
  );
}
