'use client'

import {
  useState,
} from 'react'

import ReactMarkdown from 'react-markdown'

import {
  Sparkles,
  BrainCircuit,
  Send,
  BookOpen,
  Loader2,
  Lightbulb,
  Target,
  CheckCircle2,
} from 'lucide-react'

export default function ProblematiquePage() {

  const [topic, setTopic] =
    useState('')

  const [domain, setDomain] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [result, setResult] =
    useState('')

  async function generateProblematique() {

    if (!topic || !domain)
      return

    setLoading(true)

    setResult('')

    try {

      const prompt = `
Tu es un expert académique universitaire.

Génère une problématique académique professionnelle et complète.

Sujet :
${topic}

Domaine :
${domain}

Structure obligatoire :

# Problématique

# Questions de recherche

# Objectifs

# Hypothèses

Réponse professionnelle,
académique,
détaillée,
structurée.
`

      const response =
        await fetch('/api/chat', {

          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            message: prompt,
          }),

        })

      const data =
        await response.json()

      setResult(
        data.response
      )

    } catch (error) {

      setResult(
        'Erreur lors de la génération.'
      )

    } finally {

      setLoading(false)

    }
  }

  return (

    <main className="space-y-10">

      {/* HERO */}

      <section
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

        {/* BACKGROUND */}

        <div
          className="
            absolute
            top-0
            right-0
            h-[350px]
            w-[350px]
            rounded-full
            bg-blue-500/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-0
            left-0
            h-[250px]
            w-[250px]
            rounded-full
            bg-purple-500/10
            blur-3xl
          "
        />

        <div className="relative z-10">

          {/* BADGE */}

          <div
            className="
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-blue-100
              px-5
              py-3
            "
          >

            <Sparkles
              size={18}
              className="
                text-blue-600
              "
            />

            <span
              className="
                text-sm
                font-semibold
                text-blue-700
              "
            >
              Intelligence académique
            </span>

          </div>

          {/* TITLE */}

          <h1
            className="
              mt-8
              text-5xl
              md:text-7xl
              font-black
              leading-tight
              tracking-tight
              text-slate-900
            "
          >

            Générateur de
            <br />

            <span
              className="
                bg-gradient-to-r
                from-blue-600
                via-indigo-600
                to-purple-600
                bg-clip-text
                text-transparent
              "
            >
              problématique IA
            </span>

          </h1>

          {/* DESCRIPTION */}

          <p
            className="
              mt-8
              max-w-3xl
              text-xl
              leading-relaxed
              text-slate-500
            "
          >

            Générez une problématique
            académique professionnelle
            avec questions de recherche,
            objectifs et hypothèses.

          </p>

        </div>

      </section>

      {/* GRID */}

      <section
        className="
          grid
          grid-cols-1
          gap-8
          xl:grid-cols-3
        "
      >

        {/* LEFT */}

        <div
          className="
            xl:col-span-1
            rounded-[40px]
            border
            border-slate-200
            bg-white
            p-8
            shadow-sm
          "
        >

          {/* HEADER */}

          <div
            className="
              flex
              items-center
              gap-4
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
              "
            >

              <BrainCircuit
                size={30}
              />

            </div>

            <div>

              <h2
                className="
                  text-3xl
                  font-black
                  text-slate-900
                "
              >
                Paramètres
              </h2>

              <p
                className="
                  mt-2
                  text-slate-500
                "
              >
                Configurez votre sujet.
              </p>

            </div>

          </div>

          {/* FORM */}

          <div
            className="
              mt-10
              space-y-6
            "
          >

            {/* TOPIC */}

            <div>

              <label
                className="
                  mb-3
                  block
                  text-sm
                  font-bold
                  text-slate-700
                "
              >
                Sujet de recherche
              </label>

              <input
                type="text"
                placeholder="Ex : Intelligence artificielle et éducation"
                value={topic}
                onChange={(e) =>
                  setTopic(
                    e.target.value
                  )
                }
                className="
                  h-16
                  w-full
                  rounded-3xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-6
                  text-lg
                  outline-none
                  focus:border-blue-400
                "
              />

            </div>

            {/* DOMAIN */}

            <div>

              <label
                className="
                  mb-3
                  block
                  text-sm
                  font-bold
                  text-slate-700
                "
              >
                Domaine
              </label>

              <input
                type="text"
                placeholder="Ex : Informatique"
                value={domain}
                onChange={(e) =>
                  setDomain(
                    e.target.value
                  )
                }
                className="
                  h-16
                  w-full
                  rounded-3xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-6
                  text-lg
                  outline-none
                  focus:border-blue-400
                "
              />

            </div>

            {/* BUTTON */}

            <button
              onClick={
                generateProblematique
              }
              disabled={loading}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-3xl
                bg-gradient-to-r
                from-blue-600
                via-indigo-600
                to-purple-600
                px-8
                py-5
                text-lg
                font-bold
                text-white
                shadow-xl
                transition-all
                duration-300
                hover:scale-[1.02]
                disabled:opacity-50
              "
            >

              {
                loading
                  ? (
                    <>
                      <Loader2
                        size={22}
                        className="
                          animate-spin
                        "
                      />

                      Génération...
                    </>
                  )
                  : (
                    <>
                      <Send size={22} />

                      Générer
                    </>
                  )
              }

            </button>

          </div>

          {/* INFO */}

          <div
            className="
              mt-10
              rounded-3xl
              bg-slate-50
              p-6
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <Lightbulb
                className="
                  text-yellow-500
                "
                size={22}
              />

              <h3
                className="
                  text-lg
                  font-bold
                  text-slate-900
                "
              >
                Conseil IA
              </h3>

            </div>

            <p
              className="
                mt-4
                leading-relaxed
                text-slate-600
              "
            >

              Soyez précis dans
              votre sujet afin
              d’obtenir une
              problématique plus
              professionnelle.

            </p>

          </div>

        </div>

        {/* RESULT */}

        <div
          className="
            xl:col-span-2
            rounded-[40px]
            border
            border-slate-200
            bg-white
            p-8
            shadow-sm
          "
        >

          {/* HEADER */}

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <div>

              <h2
                className="
                  text-3xl
                  font-black
                  text-slate-900
                "
              >
                Résultat IA
              </h2>

              <p
                className="
                  mt-2
                  text-slate-500
                "
              >
                Génération académique intelligente.
              </p>

            </div>

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
              "
            >

              <BookOpen
                size={28}
              />

            </div>

          </div>

          {/* EMPTY */}

          {
            !result &&
            !loading && (

              <div
                className="
                  mt-10
                  flex
                  min-h-[500px]
                  flex-col
                  items-center
                  justify-center
                  rounded-[32px]
                  border
                  border-dashed
                  border-slate-300
                  bg-slate-50
                  p-10
                  text-center
                "
              >

                <div
                  className="
                    flex
                    h-24
                    w-24
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-r
                    from-blue-600
                    to-purple-600
                    text-white
                  "
                >

                  <Sparkles
                    size={40}
                  />

                </div>

                <h3
                  className="
                    mt-8
                    text-3xl
                    font-black
                    text-slate-900
                  "
                >
                  Aucune génération
                </h3>

                <p
                  className="
                    mt-4
                    max-w-xl
                    text-lg
                    leading-relaxed
                    text-slate-500
                  "
                >

                  Configurez votre sujet
                  puis lancez la génération
                  de problématique IA.

                </p>

              </div>

            )
          }

          {/* LOADING */}

          {
            loading && (

              <div
                className="
                  mt-10
                  flex
                  min-h-[500px]
                  flex-col
                  items-center
                  justify-center
                  rounded-[32px]
                  border
                  border-slate-200
                  bg-slate-50
                "
              >

                <Loader2
                  size={50}
                  className="
                    animate-spin
                    text-purple-600
                  "
                />

                <h3
                  className="
                    mt-8
                    text-3xl
                    font-black
                    text-slate-900
                  "
                >
                  Génération IA...
                </h3>

              </div>

            )
          }

          {/* RESULT */}

          {
            result && !loading && (

              <div
                className="
                  mt-10
                  rounded-[32px]
                  border
                  border-slate-200
                  bg-slate-50
                  p-8
                "
              >

                <div
                  className="
                    prose
                    prose-slate
                    max-w-none
                  "
                >

                  <ReactMarkdown>

                    {result}

                  </ReactMarkdown>

                </div>

              </div>

            )
          }

        </div>

      </section>

      {/* BOTTOM CARDS */}

      <section
        className="
          grid
          grid-cols-1
          gap-6
          md:grid-cols-3
        "
      >

        <div
          className="
            rounded-[32px]
            border
            border-slate-200
            bg-white
            p-8
            shadow-sm
          "
        >

          <Target
            className="
              text-blue-600
            "
            size={34}
          />

          <h3
            className="
              mt-6
              text-2xl
              font-black
              text-slate-900
            "
          >
            Questions de recherche
          </h3>

          <p
            className="
              mt-4
              leading-relaxed
              text-slate-500
            "
          >
            Obtenez des questions
            académiques cohérentes
            et professionnelles.

          </p>

        </div>

        <div
          className="
            rounded-[32px]
            border
            border-slate-200
            bg-white
            p-8
            shadow-sm
          "
        >

          <BrainCircuit
            className="
              text-purple-600
            "
            size={34}
          />

          <h3
            className="
              mt-6
              text-2xl
              font-black
              text-slate-900
            "
          >
            Intelligence IA
          </h3>

          <p
            className="
              mt-4
              leading-relaxed
              text-slate-500
            "
          >
            Génération avancée
            basée sur l’intelligence
            artificielle moderne.

          </p>

        </div>

        <div
          className="
            rounded-[32px]
            border
            border-slate-200
            bg-white
            p-8
            shadow-sm
          "
        >

          <CheckCircle2
            className="
              text-green-600
            "
            size={34}
          />

          <h3
            className="
              mt-6
              text-2xl
              font-black
              text-slate-900
            "
          >
            Structure académique
          </h3>

          <p
            className="
              mt-4
              leading-relaxed
              text-slate-500
            "
          >
            Résultats structurés :
            problématique,
            hypothèses,
            objectifs et analyse.

          </p>

        </div>

      </section>

    </main>

  )

}