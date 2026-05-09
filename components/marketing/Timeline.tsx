import {
  Lightbulb,
  Search,
  PenTool,
  BookOpen,
  Presentation,
  CheckCircle2,
} from 'lucide-react'

const steps = [
  {
    icon: Lightbulb,
    title: 'Choix du sujet',
    desc: 'Définissez une problématique pertinente et innovante.',
    month: 'Mois 1',
  },
  {
    icon: Search,
    title: 'Recherche scientifique',
    desc: 'Collectez et analysez vos sources académiques.',
    month: 'Mois 2',
  },
  {
    icon: PenTool,
    title: 'Rédaction',
    desc: 'Rédigez votre mémoire avec méthodologie professionnelle.',
    month: 'Mois 3',
  },
  {
    icon: BookOpen,
    title: 'Correction',
    desc: 'Optimisez votre structure et votre contenu.',
    month: 'Mois 4',
  },
  {
    icon: Presentation,
    title: 'Soutenance',
    desc: 'Préparez une présentation académique solide.',
    month: 'Mois 5',
  },
  {
    icon: CheckCircle2,
    title: 'Validation',
    desc: 'Finalisez et validez votre projet académique.',
    month: 'Mois 6',
  },
]

export default function Timeline() {
  return (
    <section
      id="timeline"
      className="py-32 relative overflow-hidden"
    >

      {/* BACKGROUND */}

      <div className="
        absolute
        inset-0
        bg-gradient-to-b
        from-transparent
        via-blue-50/40
        to-transparent
      " />

      {/* CONTENT */}

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* HEADER */}

        <div className="text-center">

          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">
            Organisation académique
          </span>

          <h2 className="mt-5 text-5xl md:text-7xl font-black text-slate-950">
            Timeline du
            <span className="gradient-text"> PFE</span>
          </h2>

          <p className="mt-8 text-slate-600 text-xl leading-relaxed max-w-4xl mx-auto">
            Une méthodologie claire pour avancer efficacement
            tout au long de votre mémoire ou projet de fin d’études.
          </p>

        </div>

        {/* TIMELINE */}

        <div className="mt-28 relative">

          {/* LINE */}

          <div className="
            hidden
            lg:block
            absolute
            top-20
            left-0
            right-0
            h-1
            bg-gradient-to-r
            from-blue-600
            to-purple-600
            rounded-full
          " />

          {/* GRID */}

          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-6
            gap-8
          ">

            {steps.map((step, index) => {
              const Icon = step.icon

              return (
                <div
                  key={index}
                  className="relative"
                >

                  {/* CARD */}

                  <div className="
                    card-premium
                    p-8
                    text-center
                    card-hover
                    h-full
                  ">

                    {/* CIRCLE */}

                    <div className="
                      mx-auto
                      w-20
                      h-20
                      rounded-3xl
                      bg-gradient-to-r
                      from-blue-600
                      to-purple-600
                      text-white
                      flex
                      items-center
                      justify-center
                      shadow-xl
                      shadow-purple-500/20
                    ">
                      <Icon size={34} />
                    </div>

                    {/* MONTH */}

                    <div className="
                      mt-6
                      inline-flex
                      px-4
                      py-2
                      rounded-full
                      bg-blue-100
                      text-blue-700
                      text-sm
                      font-bold
                    ">
                      {step.month}
                    </div>

                    {/* TITLE */}

                    <h3 className="
                      mt-6
                      text-2xl
                      font-black
                      text-slate-950
                    ">
                      {step.title}
                    </h3>

                    {/* DESC */}

                    <p className="
                      mt-4
                      text-slate-600
                      leading-relaxed
                    ">
                      {step.desc}
                    </p>

                  </div>

                </div>
              )
            })}

          </div>

        </div>

      </div>

    </section>
  )
}