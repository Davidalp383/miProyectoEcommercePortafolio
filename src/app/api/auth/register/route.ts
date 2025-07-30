import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, name, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email y contraseña son requeridos" },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return NextResponse.json(
      { message: "Este correo ya está registrado" },
      { status: 400 }
    );
  }

  // 🔐 Encripta la contraseña (necesitarás bcryptjs)
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return NextResponse.json(user);
}
