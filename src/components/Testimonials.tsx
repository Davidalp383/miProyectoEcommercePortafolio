"use client";

export default function Testimonials() {
  return (
    <section className="relative w-full py-16 px-4">
      {/* Fondo morado con textura */}
      <div className="absolute inset-0 bg-[#6B21A8]/90 bg-[url('/FondoTextura.jpg')] bg-cover bg-center"></div>

      <div className="relative max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-white font-montserrat">
          Lo que dicen nuestros clientes
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              quote:
                "“Excelente calidad y atención. Compré unas zapatillas y llegaron rapidísimo.”",
              name: "Juan Pérez",
              city: "Bogotá, Colombia",
            },
            {
              quote:
                "“Me encanta la variedad. Mi nueva gorra Nexus es de mis favoritas.”",
              name: "María Rodríguez",
              city: "Medellín, Colombia",
            },
            {
              quote:
                "“Muy buena experiencia de compra. Todo llegó como lo esperaba.”",
              name: "Carlos Gómez",
              city: "Cali, Colombia",
            },
          ].map((t, idx) => (
            <div
              key={idx}
              className="bg-white/90 shadow p-6 rounded-lg backdrop-blur-sm"
            >
              <p className="text-gray-700 mb-4">{t.quote}</p>
              <p className="font-bold text-[#1C1C1E]">{t.name}</p>
              <p className="text-sm text-gray-500">{t.city}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
