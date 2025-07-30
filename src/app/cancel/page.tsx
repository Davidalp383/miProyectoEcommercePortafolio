import Image from "next/image";

export default function CancelPage() {
  return (
    <main className="relative w-full overflow-hidden">
      {/* Fondo texturizado */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/FondoTextura.jpg"
          alt="Fondo Textura"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-white/80"></div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Pago cancelado</h1>
        <p className="text-lg text-gray-700">
          El proceso de pago fue cancelado. Puedes volver a intentarlo cuando quieras.
        </p>
      </div>
    </main>
  );
}
