import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@/lib/stripe";
import { supabaseServer } from "@/lib/supabase";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sig = req.headers["stripe-signature"]!;
  let event: any;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig as string, endpointSecret);
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "customer.subscription.updated" || event.type === "customer.subscription.created") {
    const subscription = event.data.object as any;
    const email = (subscription.customer_email || subscription.customer_details?.email) as string;
    const supabase = supabaseServer(req.headers as any, req.cookies);
    const { data: user } = await supabase.from("users").select("id").eq("email", email).single();
    if (user) {
      await supabase.from("stripe_subscriptions").upsert({
        id: subscription.id,
        user_id: user.id,
        status: subscription.status,
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      });
    }
  }
  res.json({ received: true });
}
