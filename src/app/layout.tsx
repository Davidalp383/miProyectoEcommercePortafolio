import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

// ✅ Configuración de fuentes
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// ✅ Metadata global (ajústala para producción)
export const metadata: Metadata = {
  title: "Mi Ecommerce | Nexus",
  description: "Explora productos tecnológicos con estilo.",
};

// ✅ Layout principal
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${sourceSans.variable}`}
    >
      <body className="antialiased font-montserrat bg-white text-[#1C1C1E]">
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
