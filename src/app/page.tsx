import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Features from "@/components/FeaturedProducts";
import Banner from "@/components/OfferBanner";
import Testimonials from "@/components/Testimonials";

// ✅ Incremental Static Regeneration (ISR): rebuild cada 60 segundos
export const revalidate = 60;

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Categories />
      <Features />
      <Banner />
      <Testimonials />
    </main>
  );
}

