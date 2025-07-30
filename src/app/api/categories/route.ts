// ✅ src/app/api/categories/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Tipo para body del POST
interface CategoryBody {
  name: string;
}

// ✅ GET /api/categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    return NextResponse.json(
      { error: 'Error al obtener categorías' },
      { status: 500 }
    );
  }
}

// ✅ POST /api/categories
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CategoryBody;

    if (!body.name || typeof body.name !== 'string') {
      return NextResponse.json(
        { error: 'El nombre es requerido y debe ser un string' },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: { name: body.name },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error al crear categoría:', error);
    return NextResponse.json(
      { error: 'Error al crear categoría' },
      { status: 500 }
    );
  }
}
