'use client'

import {
  useEffect,
  useState,
} from 'react'

import Link from 'next/link'

import Image from 'next/image'

import {
  useRouter,
} from 'next/navigation'

import {
  ArrowRight,
  Loader2,
  ShieldCheck,
} from 'lucide-react'

import { supabase } from '@/lib/supabase'

export default function LoginPage() {

  const router =
    useRouter()

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [errorMessage, setErrorMessage] =
    useState('')

  useEffect(() => {

    checkSession()

  }, [])

  async function checkSession() {

    const {
      data: { session },
    } =
      await supabase.auth.getSession()

    if (session) {

      router.push('/dashboard')
    }
  }

  async function handleLogin(
    e: React.FormEvent
  ) {

    e.preventDefault()

    setErrorMessage('')

    setLoading(true)

    const {
      error,
    } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })

    setLoading(false)

    if (error) {

      setErrorMessage(
        error.message
      )

      return
    }

    window.location.href =
      '/dashboard'
  }

  return (

    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#f8fafc]
      "
    >

      {/* BACKGROUND */}

      <div
        className="
          absolute
          inset-0
          -z-10
          bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_25%)]
        "
      />

      {/* GRID */}

      <div
        className="
          absolute
          inset-0
          -z-10
          opacity-[0.35]
          bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)]
          bg-[size:70px_70px]
        "
      />

      {/* TOP BLUR */}

      <div
        className="
          absolute
          top-[-200px]
          left-[-200px]
          h-[500px]
          w-[500px]
          rounded-full
          bg-blue-500/10
          blur-3xl
        "
      />

      {/* BOTTOM BLUR */}

      <div
        className="
          absolute
          bottom-[-250px]
          right-[-250px]
          h-[600px]
          w-[600px]
          rounded-full
          bg-fuchsia-500/10
          blur-3xl
        "
      />

      {/* CONTENT */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-screen
          max-w-7xl
          items-center
          justify-center
          px-6
          py-16
        "
      >

        <div
          className="
            grid
            w-full
            overflow-hidden
            rounded-[40px]
            border
            border-white/40
            bg-white/70
            shadow-[0_30px_100px_rgba(15,23,42,0.10)]
            backdrop-blur-2xl
            lg:grid-cols-2
          "
        >

          {/* LEFT */}

          <div
            className="
              relative
              hidden
              overflow-hidden
              bg-gradient-to-br
              from-[#2563eb]
              via-[#7c3aed]
              to-[#d946ef]
              p-14
              text-white
              lg:flex
              lg:flex-col
              lg:justify-between
            "
          >

            {/* GLOW */}

            <div
              className="
                absolute
                right-0
                top-0
                h-[320px]
                w-[320px]
                rounded-full
                bg-white/10
                blur-3xl
              "
            />

            {/* TOP */}

            <div
              className="
                relative
                z-10
              "
            >

              {/* LOGO */}

              <Link
                href="/"
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
                    rounded-3xl
                    bg-white/15
                    backdrop-blur-xl
                  "
                >

                  <Image
                    src="/logo-guidepfe.png"
                    alt="GuidePFE"
                    width={42}
                    height={42}
                    className="
                      object-contain
                    "
                  />

                </div>

                <div>

                  <h1
                    className="
                      text-4xl
                      font-black
                    "
                  >
                    GuidePFE
                  </h1>

                  <p
                    className="
                      mt-1
                      text-blue-100
                    "
                  >
                    Academic Workspace
                  </p>

                </div>

              </Link>

              {/* HERO */}

              <div
                className="
                  mt-24
                "
              >

                <div
                  className="
                    inline-flex
                    items-center
                    gap-3
                    rounded-full
                    bg-white/10
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    backdrop-blur-xl
                  "
                >

                  <ShieldCheck size={18} />

                  Workspace nouvelle génération

                </div>

                <h2
                  className="
                    mt-10
                    text-6xl
                    font-black
                    leading-[1]
                  "
                >

                  Organisez
                  votre mémoire
                  intelligemment.

                </h2>

                <p
                  className="
                    mt-8
                    max-w-xl
                    text-xl
                    leading-relaxed
                    text-blue-100
                  "
                >

                  Planning intelligent,
                  assistant IA,
                  méthodologie,
                  CV ATS et gestion
                  académique premium.

                </p>

              </div>

            </div>

            {/* BOTTOM */}

            <div
              className="
                relative
                z-10
                grid
                grid-cols-2
                gap-5
              "
            >

              <div
                className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/10
                  p-6
                  backdrop-blur-xl
                "
              >

                <h3
                  className="
                    text-5xl
                    font-black
                  "
                >
                  IA
                </h3>

                <p
                  className="
                    mt-3
                    text-blue-100
                  "
                >
                  Génération académique intelligente.
                </p>

              </div>

              <div
                className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/10
                  p-6
                  backdrop-blur-xl
                "
              >

                <h3
                  className="
                    text-5xl
                    font-black
                  "
                >
                  ATS
                </h3>

                <p
                  className="
                    mt-3
                    text-blue-100
                  "
                >
                  CV professionnel optimisé recrutement.
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div
            className="
              flex
              flex-col
              justify-center
              p-8
              md:p-14
            "
          >

            {/* MOBILE LOGO */}

            <Link
              href="/"
              className="
                flex
                items-center
                gap-4
                lg:hidden
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
                  border
                  border-slate-200/70
                  bg-white
                  shadow-[0_10px_30px_rgba(59,130,246,0.12)]
                "
              >

                <Image
                  src="/logo-guidepfe.png"
                  alt="GuidePFE"
                  width={38}
                  height={38}
                  className="
                    object-contain
                  "
                />

              </div>

              <div>

                <h1
                  className="
                    text-3xl
                    font-black
                    gradient-text
                  "
                >
                  GuidePFE
                </h1>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                  "
                >
                  Academic Workspace
                </p>

              </div>

            </Link>

            {/* HEADER */}

            <div
              className="
                mt-10
                lg:mt-0
              "
            >

              <div
                className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  bg-blue-50
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-blue-700
                "
              >

                <ShieldCheck size={18} />

                Connexion sécurisée

              </div>

              <h2
                className="
                  mt-8
                  text-5xl
                  font-black
                  tracking-tight
                  text-slate-900
                "
              >
                Welcome back 👋
              </h2>

              <p
                className="
                  mt-4
                  text-lg
                  leading-relaxed
                  text-slate-500
                "
              >
                Connectez-vous à votre workspace
                académique pour continuer votre projet.
              </p>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleLogin}
              className="
                mt-12
                space-y-5
              "
            >

              {/* EMAIL */}

              <input
                type="email"
                placeholder="Adresse email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="
                  input-premium
                "
              />

              {/* PASSWORD */}

              <input
                type="password"
                placeholder="Mot de passe"
                required
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="
                  input-premium
                "
              />

              {/* ERROR */}

              {
                errorMessage && (

                  <div
                    className="
                      rounded-2xl
                      border
                      border-red-200
                      bg-red-50
                      p-4
                      text-sm
                      font-medium
                      text-red-600
                    "
                  >

                    {errorMessage}

                  </div>

                )
              }

              {/* BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="
                  btn-premium
                  flex
                  h-16
                  w-full
                  items-center
                  justify-center
                  gap-3
                  text-lg
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

                        Connexion...
                      </>
                    )
                    : (
                      <>
                        Open Workspace

                        <ArrowRight
                          size={22}
                        />
                      </>
                    )
                }

              </button>

            </form>

            {/* FOOTER */}

            <div
              className="
                mt-10
                text-center
              "
            >

              <p
                className="
                  text-slate-500
                "
              >

                Pas encore de compte ?

                <Link
                  href="/auth/register"
                  className="
                    ml-2
                    font-bold
                    text-blue-600
                  "
                >
                  Créer un compte
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </main>

  )

}