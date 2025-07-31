import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts"; // ✅ Correcto
import Banner from "@/components/OfferBanner";
import Testimonials from "@/components/Testimonials";

export const revalidate = 60;

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Categories />
      <FeaturedProducts /> {/* ✅ Usa el componente, NO la API */}
      <Banner />
      <Testimonials />
    </main>
  );
}
