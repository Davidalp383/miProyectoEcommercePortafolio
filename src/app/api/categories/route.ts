// src/app/api/categories/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/categories
export async function GET() {
  const categories = await prisma.category.findMany();
  return NextResponse.json(categories);
}

// POST /api/categories
export async function POST(req: Request) {
  const body = await req.json();
  const category = await prisma.category.create({
    data: { name: body.name },
  });
  return NextResponse.json(category);
}
