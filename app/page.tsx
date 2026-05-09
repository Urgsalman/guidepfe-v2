import Navbar from '@/components/marketing/Navbar'
import Hero from '@/components/marketing/Hero'
import Stats from '@/components/marketing/Stats'
import Features from '@/components/marketing/Features'
import Timeline from '@/components/marketing/Timeline'
import AISection from '@/components/marketing/AISection'
import CVSection from '@/components/marketing/CVSection'
import Testimonials from '@/components/marketing/Testimonials'
import FAQ from '@/components/marketing/FAQ'
import CTA from '@/components/marketing/CTA'
import Footer from '@/components/marketing/Footer'

export default function HomePage() {

  return (

    <main
      className="
        relative
        overflow-hidden
        bg-[#f8fafc]
      "
    >

      {/* PREMIUM BACKGROUND */}

      <div
        className="
          absolute
          inset-0
          -z-10
          bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_25%)]
        "
      />

      {/* GRID */}

      <div
        className="
          absolute
          inset-0
          -z-10
          opacity-[0.35]
          bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)]
          bg-[size:72px_72px]
        "
      />

      {/* BLUR EFFECTS */}

      <div
        className="
          absolute
          top-[-200px]
          left-[-200px]
          w-[500px]
          h-[500px]
          rounded-full
          bg-blue-500/10
          blur-3xl
          -z-10
        "
      />

      <div
        className="
          absolute
          bottom-[-250px]
          right-[-250px]
          w-[600px]
          h-[600px]
          rounded-full
          bg-fuchsia-500/10
          blur-3xl
          -z-10
        "
      />

      {/* NAVBAR */}

      <Navbar />

      {/* HERO */}

      <section
        className="
          relative
          z-10
        "
      >

        <Hero />

      </section>

      {/* STATS */}

      <section
        id="stats"
        className="
          relative
          z-10
        "
      >

        <Stats />

      </section>

      {/* FEATURES */}

      <section
        id="features"
        className="
          relative
          z-10
        "
      >

        <Features />

      </section>

      {/* TIMELINE */}

      <section
        id="timeline"
        className="
          relative
          z-10
        "
      >

        <Timeline />

      </section>

      {/* ASSISTANT IA */}

      <section
        id="assistant"
        className="
          relative
          z-10
        "
      >

        <AISection />

      </section>

      {/* CV ATS */}

      <section
        id="cvats"
        className="
          relative
          z-10
        "
      >

        <CVSection />

      </section>

      {/* TESTIMONIALS */}

      <section
        id="testimonials"
        className="
          relative
          z-10
        "
      >

        <Testimonials />

      </section>

      {/* FAQ */}

      <section
        id="faq"
        className="
          relative
          z-10
        "
      >

        <FAQ />

      </section>

      {/* CTA */}

      <section
        className="
          relative
          z-10
        "
      >

        <CTA />

      </section>

      {/* FOOTER */}

      <Footer />

    </main>

  )

}