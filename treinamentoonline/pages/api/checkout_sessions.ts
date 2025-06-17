import type { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@/lib/stripe";
import { supabaseServer } from "@/lib/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { priceId } = req.body;
  const supabase = supabaseServer(req.headers as any, req.cookies);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return res.status(401).json({ error: "Not authenticated" });

  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/(auth)/dashboard`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
  });
  res.json({ sessionId: checkoutSession.id });
}
