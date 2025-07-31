// src/app/api/products/offers/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const offers = await prisma.product.findMany({
    where: {
      isOnOffer: true,
    },
  });
  return NextResponse.json(offers);
}
