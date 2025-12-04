import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import Image from "next/image";
import bannerSrc from "../Images/WhatsApp Image 2025-12-04 at 15.31.12.jpeg";

export default function Page() {
  return (
    <>
      <Hero />
      <Image src={bannerSrc} alt="Banner" className="mx-auto my-8" />
      <ProductGrid />
    </>
  );
}
