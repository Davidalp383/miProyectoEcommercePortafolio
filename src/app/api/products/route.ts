import { prisma } from "@/lib/prisma";

export async function getProducts(categoryId?: string) {
  return prisma.product.findMany({
    where: categoryId ? { categoryId: Number(categoryId) } : {},
    include: { category: true },
  });
}
