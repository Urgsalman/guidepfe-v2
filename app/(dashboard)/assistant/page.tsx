'use client'

import {
  useEffect,
  useRef,
  useState,
} from 'react'

import ReactMarkdown from 'react-markdown'

import {
  BrainCircuit,
  Send,
  Sparkles,
  BookOpen,
  GraduationCap,
  FileText,
  Loader2,
  Trash2,
} from 'lucide-react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const suggestions = [
  'Comment rédiger une problématique ?',
  'Donne-moi un plan de mémoire.',
  'Comment réussir ma soutenance ?',
  'Explique la méthodologie qualitative.',
]

export default function AssistantPage() {

  const [message, setMessage] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [messages, setMessages] =
    useState<Message[]>([
      {
        role: 'assistant',
        content:
          `Bonjour 👋

Je suis votre assistant académique premium GuidePFE.

Je peux vous aider pour :

• la rédaction scientifique
• la méthodologie
• la problématique
• le mémoire
• la soutenance
• le CV ATS
• l'organisation du PFE`,
      },
    ])

  const messagesEndRef =
    useRef<HTMLDivElement>(null)

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    })

  }, [messages])

  async function handleSend() {

    if (!message.trim()) return

    const userMessage = message

    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        content: userMessage,
      },
    ])

    setMessage('')

    setLoading(true)

    try {

      const response =
        await fetch('/api/chat', {

          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            message: userMessage,
          }),

        })

      const data =
        await response.json()

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',

          content:
            data.response ||
            data.error ||
            'Erreur IA.',
        },
      ])

    } catch (error) {

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Erreur serveur ⚠️',
        },
      ])

    }

    setLoading(false)
  }

  function clearChat() {

    setMessages([
      {
        role: 'assistant',
        content:
          'Historique supprimé.',
      },
    ])
  }

  return (

    <main
      className="
        relative
        min-h-screen
      "
    >

      {/* BACKGROUND */}

      <div
        className="
          absolute
          inset-0
          -z-10
          bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.10),transparent_25%)]
        "
      />

      {/* GRID */}

      <div
        className="
          grid
          grid-cols-12
          gap-8
        "
      >

        {/* CHAT */}

        <div
          className="
            col-span-12
            xl:col-span-9
          "
        >

          <div
            className="
              overflow-hidden
              rounded-[36px]
              border
              border-white/40
              bg-white/75
              shadow-[0_20px_80px_rgba(15,23,42,0.08)]
              backdrop-blur-2xl
              flex
              flex-col
              h-[86vh]
            "
          >

            {/* HEADER */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-slate-200/70
                px-8
                py-6
                bg-white/70
                backdrop-blur-xl
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-5
                "
              >

                <div
                  className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-3xl
                    bg-gradient-to-r
                    from-blue-600
                    via-violet-600
                    to-fuchsia-500
                    shadow-[0_10px_40px_rgba(124,58,237,0.35)]
                  "
                >

                  <BrainCircuit
                    className="
                      text-white
                    "
                    size={30}
                  />

                </div>

                <div>

                  <h2
                    className="
                      text-4xl
                      font-black
                      text-slate-900
                    "
                  >
                    Assistant IA
                  </h2>

                  <p
                    className="
                      mt-1
                      text-slate-500
                    "
                  >
                    Assistant académique intelligent.
                  </p>

                </div>

              </div>

              <button
                onClick={clearChat}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  bg-red-50
                  px-5
                  py-4
                  text-sm
                  font-bold
                  text-red-600
                  transition
                  hover:bg-red-100
                "
              >

                <Trash2 size={18} />

                Supprimer historique

              </button>

            </div>

            {/* SUGGESTIONS */}

            <div
              className="
                flex
                gap-3
                overflow-x-auto
                border-b
                border-slate-200/70
                px-8
                py-5
                bg-white/50
              "
            >

              {
                suggestions.map(
                  (
                    item,
                    index
                  ) => (

                    <button
                      key={index}
                      onClick={() =>
                        setMessage(item)
                      }
                      className="
                        whitespace-nowrap
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        px-5
                        py-3
                        text-sm
                        font-semibold
                        text-slate-700
                        transition
                        hover:border-blue-300
                        hover:text-blue-600
                      "
                    >

                      {item}

                    </button>

                  )
                )
              }

            </div>

            {/* MESSAGES */}

            <div
              className="
                flex-1
                overflow-y-auto
                px-8
                py-8
                space-y-8
                bg-gradient-to-b
                from-slate-50
                to-white
              "
            >

              {
                messages.map(
                  (
                    msg,
                    index
                  ) => (

                    <div
                      key={index}
                      className={`flex ${
                        msg.role === 'user'
                          ? 'justify-end'
                          : 'justify-start'
                      }`}
                    >

                      <div
                        className={`
                          max-w-3xl
                          rounded-[28px]
                          px-7
                          py-6
                          leading-relaxed
                          shadow-sm
                          whitespace-pre-line
                          transition-all
                          duration-300
                          
                          ${
                            msg.role === 'user'
                              ? `
                                bg-gradient-to-r
                                from-blue-600
                                via-violet-600
                                to-fuchsia-500
                                text-white
                                shadow-[0_10px_40px_rgba(124,58,237,0.25)]
                              `
                              : `
                                border
                                border-slate-200/70
                                bg-white
                                text-slate-700
                              `
                          }
                        `}
                      >

                        {
                          msg.role === 'assistant'
                            ? (
                              <div
                                className="
                                  prose
                                  prose-slate
                                  max-w-none
                                "
                              >

                                <ReactMarkdown>

                                  {msg.content}

                                </ReactMarkdown>

                              </div>
                            )
                            : (
                              <p>

                                {msg.content}

                              </p>
                            )
                        }

                      </div>

                    </div>

                  )
                )
              }

              {/* LOADING */}

              {
                loading && (

                  <div
                    className="
                      flex
                      justify-start
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-4
                        rounded-[28px]
                        border
                        border-slate-200
                        bg-white
                        px-7
                        py-6
                        shadow-sm
                      "
                    >

                      <Loader2
                        className="
                          animate-spin
                          text-violet-600
                        "
                        size={22}
                      />

                      <span
                        className="
                          font-medium
                          text-slate-600
                        "
                      >
                        Génération intelligente...
                      </span>

                    </div>

                  </div>

                )
              }

              <div ref={messagesEndRef} />

            </div>

            {/* INPUT */}

            <div
              className="
                border-t
                border-slate-200/70
                bg-white/80
                p-6
                backdrop-blur-xl
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-4
                  rounded-[28px]
                  border
                  border-slate-200
                  bg-slate-50
                  p-4
                  shadow-inner
                "
              >

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-r
                    from-blue-600
                    to-fuchsia-500
                    text-white
                  "
                >

                  <Sparkles size={20} />

                </div>

                <textarea
                  value={message}
                  onChange={(e) =>
                    setMessage(
                      e.target.value
                    )
                  }
                  onKeyDown={(e) => {

                    if (
                      e.key === 'Enter' &&
                      !e.shiftKey
                    ) {

                      e.preventDefault()

                      handleSend()
                    }
                  }}
                  placeholder="Posez votre question académique..."
                  className="
                    min-h-[60px]
                    flex-1
                    resize-none
                    bg-transparent
                    px-2
                    py-3
                    text-lg
                    text-slate-700
                    outline-none
                    placeholder:text-slate-400
                  "
                />

                <button
                  onClick={handleSend}
                  disabled={loading}
                  className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-r
                    from-blue-600
                    via-violet-600
                    to-fuchsia-500
                    text-white
                    shadow-[0_10px_40px_rgba(124,58,237,0.30)]
                    transition-all
                    duration-300
                    hover:scale-105
                    disabled:opacity-50
                  "
                >

                  <Send size={24} />

                </button>

              </div>

            </div>

          </div>

        </div>

        {/* SIDEBAR */}

        <div
          className="
            hidden
            xl:block
            xl:col-span-3
          "
        >

          <div
            className="
              sticky
              top-8
              space-y-6
            "
          >

            {/* CARD */}

            <div
              className="
                overflow-hidden
                rounded-[32px]
                bg-gradient-to-br
                from-blue-600
                via-violet-600
                to-fuchsia-500
                p-8
                text-white
                shadow-[0_20px_70px_rgba(124,58,237,0.30)]
              "
            >

              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-3xl
                  bg-white/15
                  backdrop-blur-xl
                "
              >

                <Sparkles size={30} />

              </div>

              <h3
                className="
                  mt-8
                  text-4xl
                  font-black
                  leading-tight
                "
              >
                Assistant
                Premium IA
              </h3>

              <p
                className="
                  mt-5
                  leading-relaxed
                  text-blue-100
                "
              >

                Génération intelligente
                pour mémoire,
                méthodologie,
                soutenance
                et recherche scientifique.

              </p>

            </div>

            {/* TOOLS */}

            <div
              className="
                rounded-[32px]
                border
                border-slate-200
                bg-white/70
                p-8
                shadow-sm
                backdrop-blur-xl
              "
            >

              <h3
                className="
                  text-2xl
                  font-black
                  text-slate-900
                "
              >
                Outils disponibles
              </h3>

              <div
                className="
                  mt-8
                  space-y-5
                "
              >

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
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-blue-100
                    "
                  >

                    <BookOpen
                      className="
                        text-blue-600
                      "
                    />

                  </div>

                  <div>

                    <p
                      className="
                        font-bold
                        text-slate-900
                      "
                    >
                      Recherche scientifique
                    </p>

                    <p
                      className="
                        text-sm
                        text-slate-500
                      "
                    >
                      Aide méthodologique
                    </p>

                  </div>

                </div>

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
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-violet-100
                    "
                  >

                    <GraduationCap
                      className="
                        text-violet-600
                      "
                    />

                  </div>

                  <div>

                    <p
                      className="
                        font-bold
                        text-slate-900
                      "
                    >
                      Soutenance
                    </p>

                    <p
                      className="
                        text-sm
                        text-slate-500
                      "
                    >
                      Préparation académique
                    </p>

                  </div>

                </div>

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
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-fuchsia-100
                    "
                  >

                    <FileText
                      className="
                        text-fuchsia-600
                      "
                    />

                  </div>

                  <div>

                    <p
                      className="
                        font-bold
                        text-slate-900
                      "
                    >
                      CV ATS
                    </p>

                    <p
                      className="
                        text-sm
                        text-slate-500
                      "
                    >
                      Optimisation recrutement
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>

  )

}