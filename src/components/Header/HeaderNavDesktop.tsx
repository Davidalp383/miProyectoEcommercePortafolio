"use client";

import Link from "next/link";

export default function HeaderNavDesktop() {
  return (
    <nav className="hidden md:flex flex-1 justify-center items-center gap-8 font-montserrat">
      <Link
        href="/catalog"
        className="text-sm text-white hover:text-[#F97316] transition"
      >
        Todos
      </Link>
      <Link
        href="/catalog?categoryId=5"
        className="text-sm text-white hover:text-[#F97316] transition"
      >
        Hombre
      </Link>
      <Link
        href="/catalog?categoryId=6"
        className="text-sm text-white hover:text-[#F97316] transition"
      >
        Mujer
      </Link>
      <Link
        href="/catalog?categoryId=7"
        className="text-sm text-white hover:text-[#F97316] transition"
      >
        Accesorios
      </Link>
      <Link
        href="/catalog/ofertas"
        className="text-sm text-[#F97316] font-semibold hover:underline"
      >
        Ofertas
      </Link>
    </nav>
  );
}
