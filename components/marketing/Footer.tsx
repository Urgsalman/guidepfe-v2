import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="
          grid
          grid-cols-1
          md:grid-cols-4
          gap-12
        ">

          {/* BRAND */}

          <div>

            <h2 className="text-4xl font-black gradient-text">
              GuidePFE
            </h2>

            <p className="mt-6 text-slate-400 leading-relaxed">
              Plateforme académique intelligente
              nouvelle génération.
            </p>

          </div>

          {/* LINKS */}

          <div>

            <h3 className="text-xl font-bold">
              Navigation
            </h3>

            <div className="mt-6 space-y-4 text-slate-400">

              <Link href="/dashboard" className="block hover:text-white transition">
                Dashboard
              </Link>

              <Link href="/assistant" className="block hover:text-white transition">
                Assistant IA
              </Link>

              <Link href="/planning" className="block hover:text-white transition">
                Planning
              </Link>

            </div>

          </div>

          {/* FEATURES */}

          <div>

            <h3 className="text-xl font-bold">
              Fonctionnalités
            </h3>

            <div className="mt-6 space-y-4 text-slate-400">

              <p>Assistant IA</p>
              <p>CV ATS</p>
              <p>Méthodologie</p>
              <p>Ressources</p>

            </div>

          </div>

          {/* ABOUT */}

          <div>

            <h3 className="text-xl font-bold">
              Projet
            </h3>

            <p className="mt-6 text-slate-400 leading-relaxed">
              Solution moderne pour accompagner
              les étudiants dans leurs projets académiques.
            </p>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="
          mt-16
          pt-8
          border-t
          border-slate-800
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          gap-4
        ">

          <p className="text-slate-500">
            Guide PFE
          </p>

          <p className="text-slate-500">
            Réalisé par : Cherif Soulaimane, Zakaria Laabid , Aissi Saad , Nadir Yassine , Hala Benrhebal , Hind khettabi
          </p>

        </div>

      </div>

    </footer>
  )
}