"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishListContext";
import { useSession, signIn, signOut } from "next-auth/react";

export default function HeaderActions() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { data: session } = useSession();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center gap-4 md:gap-6 relative text-white">
      {session && (
        <>
          <Link href="/wishlist" className="relative" aria-label="Wishlist">
            <FaHeart className="w-5 h-5 text-white" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full px-1">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link href="/cart" className="relative" aria-label="Carrito">
            <FaShoppingCart className="w-5 h-5 text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
                {cartCount}
              </span>
            )}
          </Link>

          {/* 👤 SOLO DESKTOP */}
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="hidden md:flex items-center gap-1 text-sm text-white hover:text-[#F97316] transition"
          >
            <FaUser className="w-5 h-5 text-white" />
            <span>Cuenta</span>
          </button>

          {/* Dropdown SOLO DESKTOP */}
          {showUserMenu && (
            <div
              ref={menuRef}
              className="hidden md:flex absolute top-full right-0 mt-2 w-40 bg-[#1F2937] text-white border border-gray-700 shadow-lg rounded-md flex-col z-50"
            >
              <Link
                href="/account"
                className="p-3 text-sm hover:bg-gray-800 border-b border-gray-600"
                onClick={() => setShowUserMenu(false)}
              >
                Mi cuenta
              </Link>
              <button
                onClick={() => {
                  signOut();
                  setShowUserMenu(false);
                }}
                className="p-3 text-sm hover:bg-gray-800 text-left"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </>
      )}

      {!session && (
        <button
          onClick={() => signIn()}
          className="hidden md:flex items-center gap-1 text-sm text-white hover:text-[#F97316] transition"
        >
          <FaUser className="w-5 h-5 text-white" /> {/* ✅ color explícito */}
          <span>Login</span>
        </button>
      )}
    </div>
  );
}
