import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

// ❗️NO declares `export const authOptions` aquí
// ✅ SOLO usa handler
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
