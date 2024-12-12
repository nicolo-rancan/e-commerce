import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")("sk_test_51OVFIcAc9rG7JkiQLvINKatbaSiBddNBUIdqXIL5bR6XXprNH3Vf2iV2s6neEVeCqpDEIJB7Eg8VM0sq6l1Ngevg00HVCSSj6v");

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log("Internal Error: ", error);
    return NextResponse.json({ error: `Internal Error: ${error}` }, { status: 500 });
  }
}
