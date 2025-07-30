'use client';

import { useWishlist } from "@/context/WishListContext";
import Image from "next/image";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

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
        <div className="absolute inset-0 bg-white/60"></div>
      </div>

      {/* Contenido */}
      <div className="relative max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6 text-[#1C1C1E] font-montserrat">
          Mi Wishlist
        </h1>

        {wishlist.length === 0 ? (
          <p className="text-gray-700">No tienes productos guardados.</p>
        ) : (
          <ul className="space-y-4">
            {wishlist.map((item) => (
              <li
                key={item.id}
                className="bg-white/90 backdrop-blur-sm border border-[#ddd] p-4 rounded flex justify-between items-center shadow"
              >
                <div>
                  <h2 className="font-semibold text-[#1C1C1E]">{item.name}</h2>
                  <p className="text-[#6B21A8] font-bold">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
