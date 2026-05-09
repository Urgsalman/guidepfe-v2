import Link from 'next/link'
import {
  BrainCircuit,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Wand2,
} from 'lucide-react'

export default function AISection() {
  return (
    <section
      id="assistant"
      className="py-32"
    >

      <div className="max-w-7xl mx-auto px-6">

        <div className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-20
          items-center
        ">

          {/* LEFT */}

          <div>

            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">
              Intelligence artificielle
            </span>

            <h2 className="
              mt-5
              text-5xl
              md:text-7xl
              font-black
              text-slate-950
              leading-tight
            ">
              Votre assistant
              <span className="gradient-text"> académique IA</span>
            </h2>

            <p className="
              mt-8
              text-xl
              text-slate-600
              leading-relaxed
            ">
              GuidePFE intègre une intelligence artificielle
              capable de vous aider dans toutes les étapes
              de votre mémoire.
            </p>

            {/* FEATURES */}

            <div className="mt-12 space-y-6">

              <div className="flex items-start gap-5">

                <div className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-blue-100
                  text-blue-600
                  flex
                  items-center
                  justify-center
                  shrink-0
                ">
                  <MessageSquare size={26} />
                </div>

                <div>

                  <h3 className="text-2xl font-black text-slate-950">
                    Chat académique intelligent
                  </h3>

                  <p className="mt-2 text-slate-600 leading-relaxed">
                    Posez des questions scientifiques et obtenez
                    des réponses pertinentes instantanément.
                  </p>

                </div>

              </div>

              <div className="flex items-start gap-5">

                <div className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-purple-100
                  text-purple-600
                  flex
                  items-center
                  justify-center
                  shrink-0
                ">
                  <Wand2 size={26} />
                </div>

                <div>

                  <h3 className="text-2xl font-black text-slate-950">
                    Génération automatique
                  </h3>

                  <p className="mt-2 text-slate-600 leading-relaxed">
                    Problématique, méthodologie,
                    plan de mémoire et bien plus.
                  </p>

                </div>

              </div>

            </div>

            {/* BUTTON */}

            <div className="mt-12">

              <Link
                href="/assistant"
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

                Tester l’assistant IA

                <ArrowRight size={20} />

              </Link>

            </div>

          </div>

          {/* RIGHT */}

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
              overflow-hidden
            ">

              {/* HEADER */}

              <div className="
                flex
                items-center
                gap-4
              ">

                <div className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-gradient-to-r
                  from-blue-600
                  to-purple-600
                  text-white
                  flex
                  items-center
                  justify-center
                ">
                  <BrainCircuit size={30} />
                </div>

                <div>

                  <h3 className="text-3xl font-black text-slate-950">
                    Assistant IA
                  </h3>

                  <p className="text-slate-500">
                    Disponible 24h/24
                  </p>

                </div>

              </div>

              {/* CHAT */}

              <div className="mt-10 space-y-6">

                <div className="
                  max-w-md
                  rounded-3xl
                  bg-slate-100
                  p-5
                ">
                  Bonjour 👋
                  <br />
                  Comment puis-je vous aider aujourd’hui ?
                </div>

                <div className="
                  ml-auto
                  max-w-md
                  rounded-3xl
                  bg-gradient-to-r
                  from-blue-600
                  to-purple-600
                  text-white
                  p-5
                ">
                  Génère-moi une problématique
                  sur l’intelligence artificielle.
                </div>

                <div className="
                  max-w-lg
                  rounded-3xl
                  bg-slate-100
                  p-5
                  leading-relaxed
                ">
                  Voici une problématique possible :
                  <br /><br />

                  « Comment l’intelligence artificielle
                  peut-elle améliorer l’expérience
                  d’apprentissage des étudiants universitaires ? »
                </div>

              </div>

              {/* FOOTER */}

              <div className="
                mt-10
                flex
                items-center
                justify-between
                rounded-2xl
                bg-slate-100
                p-5
              ">

                <span className="text-slate-500">
                  Posez votre question académique...
                </span>

                <div className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-gradient-to-r
                  from-blue-600
                  to-purple-600
                  text-white
                  flex
                  items-center
                  justify-center
                ">
                  <Sparkles size={20} />
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}