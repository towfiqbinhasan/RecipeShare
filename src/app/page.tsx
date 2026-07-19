import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedRecipes from "@/components/FeaturedRecipes";
import CategoryChart from "@/components/CategoryChart";
import FeaturesSection from "@/components/FeaturesSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsletterSection from "@/components/NewsletterSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CategoriesSection />
      <FeaturedRecipes />
      <CategoryChart />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <NewsletterSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}