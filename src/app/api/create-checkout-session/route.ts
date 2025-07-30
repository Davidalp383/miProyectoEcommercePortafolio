// src/app/api/create-checkout-session/route.ts

import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

export async function POST(req: NextRequest) {
  const { cart } = await req.json();
  console.log("Cart recibido:", cart);

  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    console.error("Cart inválido:", cart);
    return NextResponse.json(
      { error: "Cart vacío o inválido" },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cart.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      success_url: `${req.nextUrl.origin}/success`,
      cancel_url: `${req.nextUrl.origin}/cancel`,
    });

    console.log("Session creada:", session.url);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Error en Stripe:", err);
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 }
    );
  }
}
