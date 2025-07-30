"use client";

import Link from "next/link";
import { FaRocket } from "react-icons/fa";

export default function HeaderLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-2xl font-bold tracking-tight uppercase font-montserrat text-white"
      aria-label="Volver al inicio"
    >
      <FaRocket className="w-6 h-6 text-[#6B21A8]" />
      Nexus
    </Link>
  );
}
