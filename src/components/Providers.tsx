"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishListContext";

/**
 * ✅ Providers: Envuelve toda la app con:
 * - next-auth SessionProvider
 * - Carrito global (CartContext)
 * - Wishlist global (WishListContext)
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        <WishlistProvider>{children}</WishlistProvider>
      </CartProvider>
    </SessionProvider>
  );
}
