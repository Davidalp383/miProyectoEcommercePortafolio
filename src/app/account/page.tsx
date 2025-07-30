import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/auth/signin");

  return (
    <main className="relative max-w-4xl mx-auto p-8 min-h-screen flex items-center justify-center overflow-hidden">
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

      <div className="relative w-full bg-white/90 backdrop-blur-sm p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">
          Bienvenido, {session.user?.name || session.user?.email}!
        </h1>
        <p>Este es tu panel de usuario.</p>
        {/* Aquí pones info del usuario, pedidos, logout, etc. */}
      </div>
    </main>
  );
}
