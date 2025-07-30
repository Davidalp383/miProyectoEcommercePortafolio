import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server"; // solo si lo usas

export async function GET() {
  const products = await prisma.product.findMany({
    where: { isOnOffer: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}
