import Link from 'next/link'

export default function CTA() {
  return (
    <section className="py-32">

      <div className="max-w-6xl mx-auto px-6">

        <div className="
          relative
          overflow-hidden
          rounded-[40px]
          bg-gradient-to-r
          from-blue-600
          to-purple-600
          p-16
          text-center
          text-white
          shadow-2xl
          shadow-purple-500/30
        ">

          <div className="
            absolute
            inset-0
            bg-white/5
            backdrop-blur-3xl
          " />

          <div className="relative z-10">

            <h2 className="
              text-5xl
              md:text-7xl
              font-black
              leading-tight
            ">
              Réinventez
              <br />

              votre manière
              <br />

              de réussir.
            </h2>

            <p className="
              mt-8
              text-xl
              text-white/90
              max-w-3xl
              mx-auto
              leading-relaxed
            ">
              Une plateforme moderne,
              intelligente et professionnelle
              pour accompagner chaque étudiant
              vers la réussite académique.
            </p>

            <div className="mt-12">

              <Link
                href="/dashboard"
                className="
                  inline-flex
                  px-10
                  py-5
                  rounded-2xl
                  bg-white
                  text-slate-950
                  font-black
                  text-lg
                  hover:scale-105
                  transition
                "
              >
                Commencer maintenant
              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}