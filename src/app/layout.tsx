import type { Metadata } from "next";
import { Inter, Montserrat, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

// ✅ Fuentes de Google Fonts
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

// ✅ Metadata global
export const metadata = {
  title: {
    default: "Mi Ecommerce | Nexus",
    template: "%s | Nexus",
  },
  description: "Explora productos tecnológicos con estilo.",
};

// ✅ Layout raíz con Providers
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${montserrat.variable} ${sourceSans.variable}`}
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