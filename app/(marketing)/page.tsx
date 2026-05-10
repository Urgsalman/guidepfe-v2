import Hero from "@/components/marketing/Hero";
import Features from "@/components/marketing/Features";
import Stats from "@/components/marketing/Stats";
import Timeline from "@/components/marketing/Timeline";
import AISection from "@/components/marketing/AISection";
import CVSection from "@/components/marketing/CVSection";
import Testimonials from "@/components/marketing/Testimonials";
import FAQ from "@/components/marketing/FAQ";
import CTA from "@/components/marketing/CTA";
import Footer from "@/components/marketing/Footer";

export default function MarketingPage() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Stats />
      <Features />
      <Timeline />
      <AISection />
      <CVSection />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}