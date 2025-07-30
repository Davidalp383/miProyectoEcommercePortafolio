// ✅ src/components/Footer.tsx

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-16 bg-gray-50 text-gray-600">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Columna 1: Logo & Descripción */}
        <div>
          <h2 className="text-2xl font-bold uppercase mb-4">Nexus</h2>
          <p className="text-sm">
            Tu tienda de confianza para ropa, zapatos y accesorios de calidad.
            Explora lo último y luce increíble cada día.
          </p>
        </div>

        {/* Columna 2: Links exactamente iguales al Header */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Categorías</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/catalog" className="hover:underline">
                Todos
              </Link>
            </li>
            <li>
              <Link href="/catalog?categoryId=5" className="hover:underline">
                Hombre
              </Link>
            </li>
            <li>
              <Link href="/catalog?categoryId=6" className="hover:underline">
                Mujer
              </Link>
            </li>
            <li>
              <Link href="/catalog?categoryId=7" className="hover:underline">
                Accesorios
              </Link>
            </li>
            <li>
              <Link href="/catalog/ofertas" className="hover:underline text-red-600">
                Ofertas
              </Link>
            </li>
          </ul>
        </div>

        {/* Columna 3: Contacto */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contacto</h3>
          <p className="text-sm mb-2">Email: contacto@nexus.com</p>
          <p className="text-sm mb-2">Tel: +57 300 000 0000</p>
          <p className="text-sm">Bogotá, Colombia</p>
        </div>
      </div>

      <div className="text-center text-xs py-4 border-t">
        &copy; {new Date().getFullYear()} Nexus. Todos los derechos reservados.
      </div>
    </footer>
  );
}
