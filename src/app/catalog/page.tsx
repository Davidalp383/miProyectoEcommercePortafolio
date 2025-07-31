"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ProductGrid from "@/components/ProductGrid"; // ✅ debe venir de /components, no de /app

// ✅ Tipos básicos
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  offerPrice?: number;
  isOnOffer: boolean;
  slug: string;
  image?: string | null;
  createdAt: string;
  category?: {
    id: number;
    name: string;
  } | null;
}

interface Category {
  id: number;
  name: string;
}

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch(`/api/products${selectedCategoryId ? `?categoryId=${selectedCategoryId}` : ""}`).then(r => r.json()),
        fetch("/api/categories").then(r => r.json()),
      ]);

      setProducts(productsRes);
      setCategories(categoriesRes);
    };

    fetchData();
  }, [selectedCategoryId]);

  return (
    <main className="relative w-full overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Catálogo</h1>

        <div className="mb-6 flex gap-4 flex-wrap">
          <button
            onClick={() => setSelectedCategoryId(null)}
            className="px-4 py-2 border rounded bg-white"
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryId(cat.id.toString())}
              className="px-4 py-2 border rounded bg-white"
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* ✅ Asegúrate de que ProductGrid esté en src/components y exporte correctamente */}
        <ProductGrid products={products} />
      </div>
    </main>
  );
}
