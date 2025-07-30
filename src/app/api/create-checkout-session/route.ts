// src/app/api/create-checkout-session/route.ts

import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("⚠️ STRIPE_SECRET_KEY no está definido en las variables de entorno.");
}

const stripe = new Stripe(stripeSecretKey, {
});

type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

export async function POST(req: NextRequest) {
  const { cart } = (await req.json()) as { cart?: CartItem[] };

  console.log("🛒 Cart recibido:", cart);

  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    console.error("❌ Cart inválido:", cart);
    return NextResponse.json(
      { error: "Cart vacío o inválido." },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cart.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${req.nextUrl.origin}/success`,
      cancel_url: `${req.nextUrl.origin}/cancel`,
    });

    console.log("✅ Session creada:", session.url);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("❌ Error al crear sesión Stripe:", error);
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 }
    );
  }
}
