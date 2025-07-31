"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const result = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (result?.error) {
        setError("Error al iniciar sesión automáticamente.");
      } else {
        router.push("/");
      }
    } else {
      const data = await res.json();
      setError(data.error || "Error al crear cuenta.");
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
          Crea tu cuenta Nexus
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <input
            type="text"
            placeholder="Nombre"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6B21A8]"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6B21A8]"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="mb-6 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6B21A8]"
          />

          <button
            type="submit"
            className="w-full bg-[#6B21A8] hover:bg-[#5a1a8f] text-white py-3 rounded font-semibold transition-colors duration-200"
          >
            Crear cuenta
          </button>

          {error && (
            <p className="text-red-600 text-sm text-center mt-4">{error}</p>
          )}
        </form>

        <p className="text-center mt-6 text-sm text-[#1C1C1E]/80">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/auth/signin" className="text-[#F97316] font-semibold hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
