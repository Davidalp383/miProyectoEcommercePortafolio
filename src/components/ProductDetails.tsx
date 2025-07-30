"use client";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishListContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSession, signIn } from "next-auth/react";
import { useState, useTransition } from "react";

export default function ProductDetails({ product }: { product: any }) {
  const { cart, addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { data: session } = useSession();

  const isAdded = cart.some((item) => item.id === product.id);
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  // ✅ Tip: Transición para evitar bloqueo UI al añadir
  const [isPending, startTransition] = useTransition();
  const [localAdded, setLocalAdded] = useState(isAdded);

  const handleAddToCart = () => {
    if (!session) {
      signIn();
      return;
    }

    startTransition(() => {
      addToCart({
        id: product.id,
        name: product.name,
        price:
          product.isOnOffer && product.offerPrice
            ? product.offerPrice
            : product.price,
        slug: product.slug,
        image: product.image,
        quantity: 1,
      });
      setLocalAdded(true);
    });
  };

  const toggleWishlist = () => {
    if (!session) {
      signIn();
      return;
    }

    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price:
          product.isOnOffer && product.offerPrice
            ? product.offerPrice
            : product.price,
        slug: product.slug,
        image: product.image,
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 font-montserrat">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1C1C1E]">
          {product.name}
        </h2>
        <button onClick={toggleWishlist} aria-label="Wishlist">
          {isWishlisted ? (
            <FaHeart className="text-[#F97316] w-6 h-6 transition" />
          ) : (
            <FaRegHeart className="text-gray-400 w-6 h-6 transition hover:text-[#F97316]" />
          )}
        </button>
      </div>

      <p className="mb-4 font-source text-[#1C1C1E]/80">
        {product.description}
      </p>

      {product.isOnOffer && product.offerPrice ? (
        <div className="mb-4">
          <p className="text-gray-500 line-through">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-[#6B21A8] font-bold text-xl">
            ${product.offerPrice.toFixed(2)}
          </p>
          <span className="inline-block bg-[#F97316] text-white px-2 py-1 text-xs rounded mt-1">
            ¡En oferta!
          </span>
        </div>
      ) : (
        <p className="mb-4 font-semibold text-xl text-[#6B21A8]">
          ${product.price.toFixed(2)}
        </p>
      )}

      <button
        className={`px-6 py-3 rounded font-semibold transition ${
          localAdded || isAdded || isPending
            ? "bg-green-600 cursor-not-allowed"
            : "bg-[#6B21A8] hover:bg-[#5a1a8f]"
        } text-white`}
        onClick={handleAddToCart}
        disabled={localAdded || isAdded || isPending}
      >
        {localAdded || isAdded ? "¡Agregado!" : "Agregar al carrito"}
      </button>
    </div>
  );
}
