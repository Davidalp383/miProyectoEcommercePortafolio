import Link from "next/link";
import Image from "next/image";

// ✅ ISR para que se cachee 5 min
export const revalidate = 300;

type Product = {
  id: number;
  name: string;
  slug: string;
  offerPrice: number | null;
  price: number;
  image: string | null;
};

export default async function OfferBanner() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/offers`,
    { next: { revalidate: 300 } } // ✅ Usa ISR nativo Next 13+
  );

  const offers: Product[] = await res.json();

  const offer = offers.length > 0 ? offers[Math.floor(Math.random() * offers.length)] : null;

  return (
    <section className="relative w-full overflow-hidden">
      {/* Fondo textura + overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/FondoTextura.jpg"
          alt="Fondo Textura"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-[#6B21A8]/40"></div>
      </div>

      <div className="relative flex flex-col md:flex-row w-full h-full">
        {/* Lado izquierdo */}
        <div className="flex-1 text-white flex flex-col justify-center p-12 backdrop-blur-sm">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-montserrat">
            {offer ? `¡${offer.name}!` : "¡Oferta Especial!"}
          </h2>
          <p className="mb-6 font-source">
            {offer
              ? `Antes $${offer.price.toFixed(2)} | Ahora $${offer.offerPrice?.toFixed(2)}`
              : "Hasta 50% de descuento en productos seleccionados. No te lo pierdas."}
          </p>
          <Link
            href="/catalog/ofertas"
            className="inline-block bg-[#F97316] text-white font-semibold px-6 py-3 rounded hover:bg-[#ea6a0a] transition w-[180px] text-center"
          >
            Ver Ofertas
          </Link>

          <div className="mt-8 bg-white/80 backdrop-blur-md text-[#6B21A8] rounded-lg shadow px-6 py-4 text-center max-w-md">
            <h3 className="text-lg md:text-xl font-bold mb-1 font-montserrat">
              🎉 Ofertas nuevas cada mes
            </h3>
            <p className="text-sm md:text-base font-source">
              No te pierdas nuestras promociones especiales y ahorra en grande cada mes.
            </p>
          </div>
        </div>

        {/* Lado derecho */}
        <div className="flex-1 relative h-80 md:h-auto">
          {offer && offer.image ? (
            <Link href={`/product/${offer.slug}`}>
              <Image
                src={offer.image}
                alt={offer.name}
                fill
                className="object-cover w-full h-full"
              />
            </Link>
          ) : (
            <Image
              src="/offers/offer-banner.jpg"
              alt="Oferta especial"
              fill
              className="object-cover w-full h-full"
            />
          )}
        </div>
      </div>
    </section>
  );
}
