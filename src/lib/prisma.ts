// ✅ src/lib/prisma.ts

import { PrismaClient } from "@prisma/client";

// Esta variable global evita múltiples instancias en desarrollo.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// ✅ Exporta una única instancia de PrismaClient
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"], // Opcional: muestra las consultas en consola
  });

// ✅ Guarda la instancia en global SOLO en desarrollo
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
