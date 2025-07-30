// ✅ src/app/api/products/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 👇 Lógica reutilizable dentro del handler (NO como export)
async function getProducts(categoryId?: string) {
  return prisma.product.findMany({
    where: categoryId ? { categoryId: Number(categoryId) } : {},
    include: { category: true },
  });
}

// ✅ Exporta el handler como GET
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId") || undefined;

  try {
    const products = await getProducts(categoryId);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Error fetching products" }, { status: 500 });
  }
}
