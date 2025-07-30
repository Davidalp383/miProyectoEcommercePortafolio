import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Features from "@/components/FeaturedProducts";
import Banner from "@/components/OfferBanner";
import Testimonials from "@/components/Testimonials";

// ⏱️ Activa ISR: reconstruye cada 60 segundos
export const revalidate = 60;

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Features />
      <Banner />
      <Testimonials />
    </>
  );
}
