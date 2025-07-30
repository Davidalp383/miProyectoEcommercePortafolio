// src/app/api/products/offers/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    where: {
      isOnOffer: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(products);
}
