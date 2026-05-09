
import {
  Users,
  BrainCircuit,
  FileCheck,
  GraduationCap,
} from 'lucide-react'

export default function Stats() {
  return (
    <section className="py-28">

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}

        <div className="text-center">

          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">
            Plateforme académique premium
          </span>

          <h2 className="mt-5 text-5xl md:text-6xl font-black text-slate-950">
            Une expérience
            <span className="gradient-text"> académique premium</span>
          </h2>

          <p className="mt-6 text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed">
            GuidePFE combine intelligence artificielle,
            méthodologie scientifique et productivité
            pour transformer complètement votre manière
            de travailler.
          </p>

        </div>

        {/* STATS */}

        <div className="
          mt-20
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-8
        ">

          {/* CARD */}

          <div className="card-premium p-10 text-center card-hover">

            <div className="
              mx-auto
              w-20
              h-20
              rounded-3xl
              bg-blue-100
              flex
              items-center
              justify-center
              text-blue-600
            ">
              <Users size={36} />
            </div>

            <h3 className="mt-8 text-6xl font-black text-slate-950">
              10K+
            </h3>

            <p className="mt-4 text-slate-600 text-lg">
              Étudiants accompagnés
            </p>

          </div>

          {/* CARD */}

          <div className="card-premium p-10 text-center card-hover">

            <div className="
              mx-auto
              w-20
              h-20
              rounded-3xl
              bg-purple-100
              flex
              items-center
              justify-center
              text-purple-600
            ">
              <BrainCircuit size={36} />
            </div>

            <h3 className="mt-8 text-6xl font-black text-slate-950">
              IA
            </h3>

            <p className="mt-4 text-slate-600 text-lg">
              Assistant académique intelligent
            </p>

          </div>

          {/* CARD */}

          <div className="card-premium p-10 text-center card-hover">

            <div className="
              mx-auto
              w-20
              h-20
              rounded-3xl
              bg-emerald-100
              flex
              items-center
              justify-center
              text-emerald-600
            ">
              <FileCheck size={36} />
            </div>

            <h3 className="mt-8 text-6xl font-black text-slate-950">
              ATS
            </h3>

            <p className="mt-4 text-slate-600 text-lg">
              CV professionnels optimisés
            </p>

          </div>

          {/* CARD */}

          <div className="card-premium p-10 text-center card-hover">

            <div className="
              mx-auto
              w-20
              h-20
              rounded-3xl
              bg-orange-100
              flex
              items-center
              justify-center
              text-orange-600
            ">
              <GraduationCap size={36} />
            </div>

            <h3 className="mt-8 text-6xl font-black text-slate-950">
              PFE
            </h3>

            <p className="mt-4 text-slate-600 text-lg">
              Accompagnement complet
            </p>

          </div>

        </div>

      </div>

    </section>
  )
}