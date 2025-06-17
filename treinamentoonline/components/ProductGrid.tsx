import { stripe } from "@/lib/stripe";
import { CheckoutButton } from "@/components/CheckoutButton";

export async function ProductGrid() {
  const products = await stripe.prices.list({ expand: ["data.product"] });
  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      {products.data.map((price) => {
        const product = price.product as any;
        return (
          <div
            key={price.id}
            className="bg-gradient-to-br from-yellow-800 to-red-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between"
          >
            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
            <p className="flex-1 text-sm opacity-80 mb-4">{product.description}</p>
            <CheckoutButton priceId={price.id} />
          </div>
        );
      })}
    </section>
  );
}
