"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Credenciales incorrectas. Intenta de nuevo.");
    } else {
      router.push("/");
    }
  };

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen p-4">
      {/* Fondo texturizado */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/FondoTextura.jpg"
          alt="Fondo Textura"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-[#6B21A8]/50"></div>
      </div>

      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#1C1C1E] font-montserrat">
          Iniciar sesión
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <input
            name="email"
            type="email"
            placeholder="Correo electrónico"
            className="mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6B21A8]"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            className="mb-6 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6B21A8]"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#6B21A8] hover:bg-[#5a1a8f] text-white py-3 rounded font-semibold transition-colors duration-200"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-[#1C1C1E]/80">
          ¿No tienes cuenta?{" "}
          <Link href="/accounts/signup" className="text-[#F97316] font-semibold hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </main>
  );
}
