'use client'

import { useMemo, useState } from 'react'

import {
  Search,
  ExternalLink,
  Globe,
  GraduationCap,
  FileText,
  Sparkles,
  BookOpen,
  PenTool,
  BrainCircuit,
} from 'lucide-react'

const resources = [
  {
    title: 'Google Scholar',
    description:
      'Moteur de recherche scientifique pour articles académiques.',
    category: 'Recherche',
    link: 'https://scholar.google.com',
    icon: Globe,
  },

  {
    title: 'ResearchGate',
    description:
      'Plateforme de collaboration scientifique et publications.',
    category: 'Recherche',
    link: 'https://www.researchgate.net',
    icon: GraduationCap,
  },

  {
    title: 'IEEE Xplore',
    description:
      'Base de données scientifique pour ingénierie et informatique.',
    category: 'Recherche',
    link: 'https://ieeexplore.ieee.org',
    icon: Sparkles,
  },

  {
    title: 'Zotero',
    description:
      'Gestionnaire moderne de références bibliographiques.',
    category: 'Outils',
    link: 'https://www.zotero.org',
    icon: FileText,
  },

  {
    title: 'Mendeley',
    description:
      'Gestion intelligente des références scientifiques.',
    category: 'Outils',
    link: 'https://www.mendeley.com',
    icon: BookOpen,
  },

  {
    title: 'Overleaf',
    description:
      'Éditeur LaTeX collaboratif pour mémoires et thèses.',
    category: 'Rédaction',
    link: 'https://www.overleaf.com',
    icon: PenTool,
  },

  {
    title: 'Grammarly',
    description:
      'Correction avancée de rédaction académique.',
    category: 'Rédaction',
    link: 'https://www.grammarly.com',
    icon: PenTool,
  },

  {
    title: 'Notion',
    description:
      'Organisation intelligente de projets et documents.',
    category: 'Productivité',
    link: 'https://www.notion.so',
    icon: BrainCircuit,
  },

  {
    title: 'Trello',
    description:
      'Gestion moderne des tâches et du planning PFE.',
    category: 'Productivité',
    link: 'https://trello.com',
    icon: BrainCircuit,
  },
]

const categories = [
  'Tous',
  'Recherche',
  'Outils',
  'Rédaction',
  'Productivité',
]

export default function ResourcesPage() {

  const [search, setSearch] =
    useState('')

  const [activeCategory, setActiveCategory] =
    useState('Tous')

  const filteredResources =
    useMemo(() => {

      return resources.filter(
        (resource) => {

          const matchesSearch =
            resource.title
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            resource.description
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )

          const matchesCategory =
            activeCategory === 'Tous'
              ? true
              : resource.category ===
                activeCategory

          return (
            matchesSearch &&
            matchesCategory
          )
        }
      )

    }, [search, activeCategory])

  return (

    <section className="space-y-8">

      {/* HERO */}

      <div
        className="
          relative
          overflow-hidden
          rounded-[40px]
          border
          border-slate-200
          bg-white
          p-10
          shadow-sm
        "
      >

        <div
          className="
            absolute
            top-0
            right-0
            h-[300px]
            w-[300px]
            rounded-full
            bg-purple-500/10
            blur-3xl
          "
        />

        <div className="relative z-10">

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-blue-100
              px-4
              py-2
              text-sm
              font-semibold
              text-blue-700
            "
          >

            <Sparkles size={16} />

            Bibliothèque académique moderne

          </div>

          <h1
            className="
              mt-8
              text-5xl
              font-black
              leading-tight
              text-slate-900
            "
          >
            Ressources
            <br />

            <span
              className="
                bg-gradient-to-r
                from-blue-600
                to-purple-600
                bg-clip-text
                text-transparent
              "
            >
              Premium
            </span>

          </h1>

          <p
            className="
              mt-6
              max-w-3xl
              text-lg
              leading-relaxed
              text-slate-600
            "
          >
            Accédez aux meilleures plateformes,
            outils IA et ressources académiques
            pour réussir votre PFE.
          </p>

        </div>

      </div>

      {/* SEARCH + FILTERS */}

      <div
        className="
          flex
          flex-col
          gap-6
          rounded-[32px]
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
          xl:flex-row
          xl:items-center
          xl:justify-between
        "
      >

        {/* SEARCH */}

        <div className="relative flex-1">

          <Search
            size={20}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Rechercher une ressource..."
            className="
              h-14
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              pl-12
              pr-4
              text-slate-700
              outline-none
              transition
              focus:border-purple-500
              focus:bg-white
            "
          />

        </div>

        {/* FILTERS */}

        <div
          className="
            flex
            flex-wrap
            gap-3
          "
        >

          {categories.map(
            (category) => (

              <button
                key={category}
                onClick={() =>
                  setActiveCategory(
                    category
                  )
                }
                className={`
                  rounded-2xl
                  px-5
                  py-3
                  font-semibold
                  transition-all
                  duration-200

                  ${
                    activeCategory ===
                    category
                      ? `
                        bg-gradient-to-r
                        from-blue-600
                        to-purple-600
                        text-white
                        shadow-lg
                      `
                      : `
                        bg-slate-100
                        text-slate-700
                        hover:bg-slate-200
                      `
                  }
                `}
              >

                {category}

              </button>
            )
          )}

        </div>

      </div>

      {/* RESOURCES */}

      <div
        className="
          grid
          gap-8
          md:grid-cols-2
          xl:grid-cols-3
        "
      >

        {filteredResources.map(
          (resource, index) => {

            const Icon =
              resource.icon

            return (

              <div
                key={index}
                className="
                  rounded-[32px]
                  border
                  border-slate-200
                  bg-white
                  p-8
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >

                {/* TOP */}

                <div
                  className="
                    flex
                    items-start
                    justify-between
                  "
                >

                  <div
                    className="
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gradient-to-r
                      from-blue-600
                      to-purple-600
                      text-white
                      shadow-lg
                    "
                  >

                    <Icon size={28} />

                  </div>

                  <span
                    className="
                      rounded-full
                      bg-slate-100
                      px-4
                      py-2
                      text-sm
                      font-semibold
                      text-slate-600
                    "
                  >

                    {resource.category}

                  </span>

                </div>

                {/* CONTENT */}

                <h2
                  className="
                    mt-8
                    text-3xl
                    font-black
                    text-slate-900
                  "
                >
                  {resource.title}
                </h2>

                <p
                  className="
                    mt-4
                    leading-relaxed
                    text-slate-600
                  "
                >
                  {resource.description}
                </p>

                {/* BUTTON */}

                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    mt-8
                    inline-flex
                    items-center
                    gap-3
                    rounded-2xl
                    bg-gradient-to-r
                    from-blue-600
                    to-purple-600
                    px-5
                    py-3
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:scale-105
                  "
                >

                  Ouvrir la ressource

                  <ExternalLink
                    size={18}
                  />

                </a>

              </div>
            )
          }
        )}

      </div>

      {/* EMPTY */}

      {filteredResources.length ===
        0 && (

        <div
          className="
            rounded-[32px]
            border
            border-dashed
            border-slate-300
            bg-white
            p-16
            text-center
          "
        >

          <h3
            className="
              text-2xl
              font-bold
              text-slate-900
            "
          >
            Aucune ressource trouvée
          </h3>

          <p
            className="
              mt-3
              text-slate-500
            "
          >
            Essayez une autre recherche
            ou catégorie.
          </p>

        </div>
      )}

    </section>
  )
}