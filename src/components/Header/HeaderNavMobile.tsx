"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FaList, FaRocket, FaUser } from "react-icons/fa";
import { useSession, signIn, signOut } from "next-auth/react";

export default function HeaderNavMobile() {
  const [showCategories, setShowCategories] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { data: session } = useSession();

  const categoriesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCategoriesClick = () => {
    setShowCategories(!showCategories);
    if (categoriesTimeoutRef.current) clearTimeout(categoriesTimeoutRef.current);
    if (!showCategories) {
      categoriesTimeoutRef.current = setTimeout(() => {
        setShowCategories(false);
      }, 5000);
    }
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  useEffect(() => {
    return () => {
      if (categoriesTimeoutRef.current) clearTimeout(categoriesTimeoutRef.current);
    };
  }, []);

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[#1C1C1E] text-white border-t border-[#6B21A8] shadow md:hidden z-50 font-montserrat">
      <div className="flex justify-between items-center h-16 relative">
        {/* Categorías */}
        <button
          className="flex flex-col items-center text-xs flex-1 hover:text-[#F97316] transition"
          onClick={handleCategoriesClick}
        >
          <FaList className="w-5 h-5 mb-1" />
          Categorías
        </button>

        {/* Ofertas */}
        <Link
          href="/catalog/ofertas"
          className="flex flex-col items-center text-xs text-[#F97316] font-semibold flex-1"
        >
          <FaRocket className="w-5 h-5 mb-1" />
          Ofertas
        </Link>

        {/* Usuario */}
        <button
          onClick={toggleUserMenu}
          className="flex flex-col items-center text-xs flex-1 hover:text-[#F97316] transition"
        >
          <FaUser className="w-5 h-5 mb-1" />
          Usuario
        </button>

        {/* User dropdown */}
        {showUserMenu && (
          <div className="absolute bottom-16 right-0 w-full bg-[#1C1C1E] text-white border-t border-[#6B21A8] shadow flex flex-col">
            {session ? (
              <>
                <Link
                  href="/account"
                  className="p-4 border-b border-[#333] text-center text-sm hover:bg-[#2C2C2E] transition"
                  onClick={() => setShowUserMenu(false)}
                >
                  Mi cuenta
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setShowUserMenu(false);
                  }}
                  className="p-4 text-center text-sm hover:bg-[#2C2C2E] transition"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  signIn();
                  setShowUserMenu(false);
                }}
                className="p-4 text-center text-sm hover:bg-[#2C2C2E] transition"
              >
                Iniciar sesión
              </button>
            )}
          </div>
        )}
      </div>

      {/* Categorías desplegable */}
      {showCategories && (
        <div className="absolute bottom-16 left-0 w-full bg-[#1C1C1E] text-white border-t border-[#6B21A8] shadow flex flex-col">
          <Link
            href="/catalog"
            className="p-4 border-b border-[#333] text-center text-sm hover:bg-[#2C2C2E] transition"
            onClick={() => setShowCategories(false)}
          >
            Todos
          </Link>
          <Link
            href="/catalog?categoryId=5"
            className="p-4 border-b border-[#333] text-center text-sm hover:bg-[#2C2C2E] transition"
            onClick={() => setShowCategories(false)}
          >
            Hombre
          </Link>
          <Link
            href="/catalog?categoryId=6"
            className="p-4 border-b border-[#333] text-center text-sm hover:bg-[#2C2C2E] transition"
            onClick={() => setShowCategories(false)}
          >
            Mujer
          </Link>
          <Link
            href="/catalog?categoryId=8"
            className="p-4 text-center text-sm hover:bg-[#2C2C2E] transition"
            onClick={() => setShowCategories(false)}
          >
            Accesorios
          </Link>
        </div>
      )}
    </nav>
  );
}
