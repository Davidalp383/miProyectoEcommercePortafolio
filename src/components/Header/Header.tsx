"use client";

import HeaderLogo from "./HeaderLogo";
import HeaderNavDesktop from "./HeaderNavDesktop";
import HeaderNavMobile from "./HeaderNavMobile";
import HeaderActions from "./HeaderActions";

export default function Header() {
  return (
    <header className="w-full bg-[#1C1C1E] text-white border-b border-[#6B21A8] shadow-sm md:border-b-0">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <HeaderLogo />

        {/* ✅ Navegación Desktop */}
        <HeaderNavDesktop />

        <HeaderActions />
      </div>

      {/* ✅ Navegación Mobile */}
      <HeaderNavMobile />
    </header>
  );
}
