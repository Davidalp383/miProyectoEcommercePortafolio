import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[80vh] flex flex-col justify-center items-center text-center px-4 font-montserrat bg-[url('/FondoTextura.jpg')] bg-cover bg-center">
      {/* Capa de banner encima de la textura */}
      <div className="absolute inset-0 bg-[url('/banner.jpg')] bg-cover bg-center opacity-40"></div>

      {/* Contenido */}
      <div className="relative z-10 max-w-2xl text-black">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#1C1C1E]">
          Nueva Colección 2025
        </h1>
        <p className="text-lg md:text-xl mb-8 font-source text-[#1C1C1E]">
          Descubre nuestras ofertas exclusivas y renueva tu estilo.
        </p>
        <Link
          href="/catalog/ofertas"
          className="inline-block bg-[#F97316] text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition"
        >
          Comprar ahora
        </Link>
      </div>
    </section>
  );
}
