import {
  Sparkles,
  Brain,
  CalendarRange,
  FileSpreadsheet,
  LibraryBig,
  ShieldCheck,
} from 'lucide-react'

export default function Features() {
  return (
    <section
      id="features"
      className="py-32 relative overflow-hidden"
    >

      {/* BACKGROUND */}

      <div className="
        absolute
        inset-0
        bg-gradient-to-b
        from-transparent
        via-purple-50/40
        to-transparent
      " />

      {/* CONTENT */}

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* HEADER */}

        <div className="text-center">

          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">
            Fonctionnalités intelligentes
          </span>

          <h2 className="mt-5 text-5xl md:text-7xl font-black text-slate-950 leading-tight">
            Tout ce qu’un étudiant
            <br />

            <span className="gradient-text">
              moderne mérite.
            </span>
          </h2>

          <p className="mt-8 text-slate-600 text-xl leading-relaxed max-w-4xl mx-auto">
            Une plateforme pensée pour accompagner
            chaque étape du mémoire,
            du sujet jusqu’à la soutenance.
          </p>

        </div>

        {/* GRID */}

        <div className="
          mt-24
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-8
        ">

          {/* FEATURE */}

          <div className="card-premium p-10 card-hover">

            <div className="
              w-16
              h-16
              rounded-2xl
              bg-blue-100
              text-blue-600
              flex
              items-center
              justify-center
            ">
              <Brain size={30} />
            </div>

            <h3 className="mt-8 text-3xl font-black text-slate-950">
              Assistant IA
            </h3>

            <p className="mt-5 text-slate-600 leading-relaxed text-lg">
              Générez des problématiques,
              plans de mémoire,
              idées de recherche et contenus académiques intelligents.
            </p>

          </div>

          {/* FEATURE */}

          <div className="card-premium p-10 card-hover">

            <div className="
              w-16
              h-16
              rounded-2xl
              bg-purple-100
              text-purple-600
              flex
              items-center
              justify-center
            ">
              <CalendarRange size={30} />
            </div>

            <h3 className="mt-8 text-3xl font-black text-slate-950">
              Planning intelligent
            </h3>

            <p className="mt-5 text-slate-600 leading-relaxed text-lg">
              Organisez automatiquement votre mémoire,
              vos deadlines et votre soutenance.
            </p>

          </div>

          {/* FEATURE */}

          <div className="card-premium p-10 card-hover">

            <div className="
              w-16
              h-16
              rounded-2xl
              bg-emerald-100
              text-emerald-600
              flex
              items-center
              justify-center
            ">
              <FileSpreadsheet size={30} />
            </div>

            <h3 className="mt-8 text-3xl font-black text-slate-950">
              CV ATS Builder
            </h3>

            <p className="mt-5 text-slate-600 leading-relaxed text-lg">
              Construisez des CV modernes,
              compatibles ATS et prêts pour les recrutements.
            </p>

          </div>

          {/* FEATURE */}

          <div className="card-premium p-10 card-hover">

            <div className="
              w-16
              h-16
              rounded-2xl
              bg-orange-100
              text-orange-600
              flex
              items-center
              justify-center
            ">
              <LibraryBig size={30} />
            </div>

            <h3 className="mt-8 text-3xl font-black text-slate-950">
              Ressources académiques
            </h3>

            <p className="mt-5 text-slate-600 leading-relaxed text-lg">
              Accédez à des guides,
              structures et documents académiques premium.
            </p>

          </div>

          {/* FEATURE */}

          <div className="card-premium p-10 card-hover">

            <div className="
              w-16
              h-16
              rounded-2xl
              bg-pink-100
              text-pink-600
              flex
              items-center
              justify-center
            ">
              <ShieldCheck size={30} />
            </div>

            <h3 className="mt-8 text-3xl font-black text-slate-950">
              Méthodologie scientifique
            </h3>

            <p className="mt-5 text-slate-600 leading-relaxed text-lg">
              Apprenez à rédiger
              correctement une recherche académique professionnelle.
            </p>

          </div>

          {/* FEATURE */}

          <div className="
            relative
            overflow-hidden
            rounded-[32px]
            bg-gradient-to-br
            from-blue-600
            to-purple-600
            p-10
            text-white
            shadow-2xl
            shadow-purple-500/30
          ">

            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl" />

            <div className="relative z-10">

              <div className="
                w-16
                h-16
                rounded-2xl
                bg-white/20
                flex
                items-center
                justify-center
              ">
                <Sparkles size={30} />
              </div>

              <h3 className="mt-8 text-3xl font-black">
                Expérience Premium
              </h3>

              <p className="mt-5 text-white/90 leading-relaxed text-lg">
                Une interface moderne,
                rapide et professionnelle
                pensée pour les étudiants ambitieux.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}