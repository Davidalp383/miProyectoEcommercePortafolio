"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type CheckoutResponse = {
  url?: string;
};

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    setLoading(true);

    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }),
      });

      let data: CheckoutResponse = {};
      try {
        data = await res.json();
      } catch (err) {
        console.error("Error al parsear JSON:", err);
        alert("Error inesperado en la respuesta del servidor.");
        setLoading(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        setLoading(false);
        alert(
          "No se pudo crear la sesión de pago. Revisa la consola para más info."
        );
      }
    } catch (err) {
      console.error("Error en fetch:", err);
      setLoading(false);
      alert("Error en la petición.");
    }
  };

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

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Tu Carrito</h1>

        {cart.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 border p-4 rounded bg-white"
                >
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">Cantidad: {item.quantity}</p>
                    <p className="text-gray-600">${item.price} c/u</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={clearCart}
                  className="mt-4 bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700"
                >
                  Vaciar carrito
                </button>
                <button
                  onClick={handleCheckout}
                  className="mt-4 bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
                  disabled={loading}
                >
                  {loading ? "Redirigiendo..." : "Pagar ahora"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
