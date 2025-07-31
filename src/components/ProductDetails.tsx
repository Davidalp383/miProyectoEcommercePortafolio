"use client";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishListContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";

// ✅ Usa el tipo real de Prisma (mejor mantenimiento)
import { Product as PrismaProduct } from "@prisma/client";

// ✅ Ajusta si tienes relación con Category u otros modelos
type Product = PrismaProduct & {
  category?: { name: string };
};

export default function ProductDetails({ product }: { product: Product }) {
  const { cart, addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { data: session } = useSession();

  // ✅ No uses estado local para "added" → puede desincronizarse
  const isAdded = cart.some((item) => item.id === product.id);
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const [isAdding, setIsAdding] = useState(false);
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);

  const finalPrice = product.isOnOffer && product.offerPrice
    ? product.offerPrice
    : product.price;

  const handleAddToCart = async () => {
    if (!session) {
      signIn();
      return;
    }

    setIsAdding(true);
    try {
      await addToCart({
        id: product.id,
        name: product.name,
        price: finalPrice,
        slug: product.slug,
        image: product.image ?? undefined,
        quantity: 1,
      });
      // ✅ No usamos estado local: confiamos en el contexto
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Podrías mostrar un toast o mensaje de error aquí
    } finally {
      setIsAdding(false);
    }
  };

  const toggleWishlist = async () => {
    if (!session) {
      signIn();
      return;
    }

    setIsTogglingWishlist(true);
    try {
      if (isWishlisted) {
        await removeFromWishlist(product.id);
      } else {
        await addToWishlist({
          id: product.id,
          name: product.name,
          price: finalPrice,
          slug: product.slug,
          image: product.image ?? undefined,
        });
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    } finally {
      setIsTogglingWishlist(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 font-montserrat">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1C1C1E]">
          {product.name}
        </h2>
        <button
          onClick={toggleWishlist}
          disabled={isTogglingWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isWishlisted ? (
            <FaHeart className="text-[#F97316] w-6 h-6 transition duration-200" />
          ) : (
            <FaRegHeart className="text-gray-400 w-6 h-6 transition duration-200 hover:text-[#F97316]" />
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
            ${finalPrice.toFixed(2)}
          </p>
          <span className="inline-block bg-[#F97316] text-white px-2 py-1 text-xs rounded mt-1">
            ¡En oferta!
          </span>
        </div>
      ) : (
        <p className="mb-4 font-semibold text-xl text-[#6B21A8]">
          ${finalPrice.toFixed(2)}
        </p>
      )}

      <button
        className={`px-6 py-3 rounded font-semibold transition-colors ${
          isAdded || isAdding
            ? "bg-green-600 cursor-not-allowed"
            : "bg-[#6B21A8] hover:bg-[#5a1a8f]"
        } text-white`}
        onClick={handleAddToCart}
        disabled={isAdded || isAdding}
        aria-label={
          isAdded
            ? "Producto ya agregado al carrito"
            : "Agregar al carrito"
        }
      >
        {isAdding ? "Agregando..." : isAdded ? "¡Agregado!" : "Agregar al carrito"}
      </button>
    </div>
  );
}