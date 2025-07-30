"use client";

import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className="absolute inset-0 bg-white/70"></div>
      </div>

      {/* Contenido */}
      <main className="relative max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#1C1C1E] font-montserrat">
          ¡Pago exitoso!
        </h1>
        <p className="text-lg text-gray-700 font-source">
          Gracias por tu compra. Tu carrito ha sido vaciado.
        </p>
      </main>
    </section>
  );
}
