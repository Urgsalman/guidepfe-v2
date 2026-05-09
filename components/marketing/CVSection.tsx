import Link from 'next/link'
import {
  FileText,
  CheckCircle2,
  Download,
  ArrowRight,
} from 'lucide-react'

export default function CVSection() {
  return (
    <section
      id="cv"
      className="py-32 relative overflow-hidden"
    >

      <div className="
        absolute
        inset-0
        bg-gradient-to-b
        from-transparent
        via-purple-50/40
        to-transparent
      " />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        <div className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-20
          items-center
        ">

          {/* LEFT */}

          <div className="relative">

            <div className="
              absolute
              inset-0
              bg-gradient-to-r
              from-blue-600/20
              to-purple-600/20
              blur-3xl
            " />

            <div className="
              relative
              card-premium
              p-10
            ">

              <div className="flex items-center gap-4">

                <div className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-gradient-to-r
                  from-blue-600
                  to-purple-600
                  flex
                  items-center
                  justify-center
                  text-white
                ">
                  <FileText size={30} />
                </div>

                <div>

                  <h3 className="text-3xl font-black text-slate-950">
                    CV ATS Builder
                  </h3>

                  <p className="text-slate-500">
                    CV professionnel intelligent
                  </p>

                </div>

              </div>

              <div className="mt-10 space-y-5">

                {[
                  'Compatible ATS',
                  'Structure professionnelle',
                  'Optimisation intelligente',
                  'Export PDF instantané',
                ].map((item, index) => (
                  <div
                    key={index}
                    className="
                      flex
                      items-center
                      gap-4
                      rounded-2xl
                      bg-slate-100
                      p-5
                    "
                  >

                    <CheckCircle2
                      size={24}
                      className="text-emerald-600"
                    />

                    <span className="font-semibold text-slate-700">
                      {item}
                    </span>

                  </div>
                ))}

              </div>

              <div className="
                mt-10
                rounded-3xl
                border-2
                border-dashed
                border-slate-200
                p-10
                text-center
              ">

                <Download
                  size={40}
                  className="mx-auto text-slate-400"
                />

                <p className="mt-4 text-slate-500">
                  Export PDF haute qualité
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div>

            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">
              CV intelligent
            </span>

            <h2 className="
              mt-5
              text-5xl
              md:text-7xl
              font-black
              text-slate-950
              leading-tight
            ">
              Créez un
              <span className="gradient-text"> CV ATS premium</span>
            </h2>

            <p className="
              mt-8
              text-xl
              text-slate-600
              leading-relaxed
            ">
              Générez un CV moderne,
              optimisé pour les systèmes ATS
              et conçu pour maximiser vos opportunités professionnelles.
            </p>

            <div className="mt-12 space-y-5">

              {[
                'Design moderne professionnel',
                'Optimisation automatique ATS',
                'Compatible recrutement international',
                'Téléchargement PDF rapide',
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4"
                >

                  <div className="
                    w-10
                    h-10
                    rounded-xl
                    bg-emerald-100
                    text-emerald-600
                    flex
                    items-center
                    justify-center
                  ">
                    <CheckCircle2 size={20} />
                  </div>

                  <span className="text-lg text-slate-700 font-medium">
                    {item}
                  </span>

                </div>
              ))}

            </div>

            <div className="mt-12">

              <Link
                href="/cv-builder"
                className="
                  inline-flex
                  items-center
                  gap-3
                  px-8
                  py-5
                  rounded-2xl
                  bg-gradient-to-r
                  from-blue-600
                  to-purple-600
                  text-white
                  font-bold
                  text-lg
                  shadow-2xl
                  shadow-purple-500/30
                  hover:scale-105
                  transition
                "
              >

                Générer mon CV

                <ArrowRight size={20} />

              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}