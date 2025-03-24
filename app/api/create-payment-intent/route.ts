import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/utils";

export async function POST(request: NextRequest) {
	try {
		const data = await request.json();
		let items = data.items;

		const paymentIntent = await stripe.checkout.sessions.create({
			ui_mode: "embedded",
			line_items: items,
			mode: "payment",
			submit_type: "pay",
			automatic_tax: { enabled: true },
			redirect_on_completion: "never",
		});

		/*const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      automatic_payment_methods: { enabled: true },
    });*/

		return NextResponse.json({ clientSecret: paymentIntent.client_secret });
	} catch (error) {
		console.log("Internal Error: ", error);
		return NextResponse.json({ error: `Internal Error: ${error}` }, { status: 500 });
	}
}
