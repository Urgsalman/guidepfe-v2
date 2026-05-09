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
  Sparkles,
  CheckCircle2,
} from 'lucide-react'

import { supabase } from '@/lib/supabase'

export default function RegisterPage() {

  const router =
    useRouter()

  const [name, setName] =
    useState('')

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [confirmPassword, setConfirmPassword] =
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

  async function handleRegister(
    e: React.FormEvent
  ) {

    e.preventDefault()

    setErrorMessage('')

    if (
      password !== confirmPassword
    ) {

      setErrorMessage(
        'Les mots de passe ne correspondent pas.'
      )

      return
    }

    if (
      password.length < 6
    ) {

      setErrorMessage(
        'Le mot de passe doit contenir au moins 6 caractères.'
      )

      return
    }

    setLoading(true)

    try {

      const {
        data,
        error,
      } =
        await supabase.auth.signUp({
          email,
          password,
        })

      if (error) {

        setErrorMessage(
          error.message
        )

        setLoading(false)

        return
      }

      if (data.user) {

        await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              full_name: name,
              email: email,
            },
          ])
      }

      window.location.href =
        '/dashboard'

    } catch (error) {

      setErrorMessage(
        "Erreur lors de l'inscription"
      )

    } finally {

      setLoading(false)
    }
  }

  return (

    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-slate-50
        flex
        items-center
        justify-center
        px-6
        py-20
      "
    >

      {/* BACKGROUND */}

      <div
        className="
          hero-glow
          top-[-300px]
          left-[-250px]
        "
      />

      <div
        className="
          hero-glow
          bottom-[-300px]
          right-[-250px]
        "
      />

      {/* CARD */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-6xl
          grid
          lg:grid-cols-2
          overflow-hidden
          rounded-[40px]
          border
          border-white/40
          bg-white/75
          backdrop-blur-2xl
          shadow-[0_30px_120px_rgba(15,23,42,0.12)]
        "
      >

        {/* LEFT */}

        <div
          className="
            hidden
            lg:flex
            relative
            overflow-hidden
            bg-gradient-to-br
            from-blue-600
            via-indigo-600
            to-fuchsia-600
            p-14
            text-white
            flex-col
            justify-between
          "
        >

          <div
            className="
              absolute
              top-0
              right-0
              w-72
              h-72
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

            <div
              className="
                flex
                items-center
                gap-4
              "
            >

              <div
                className="
                  relative
                  w-16
                  h-16
                  rounded-2xl
                  overflow-hidden
                  shadow-2xl
                "
              >

                <Image
                  src="/logo-guidepfe.png"
                  alt="GuidePFE"
                  fill
                  className="object-cover"
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
                    text-blue-100
                    mt-1
                  "
                >
                  Workspace académique intelligent
                </p>

              </div>

            </div>

            <div
              className="
                mt-20
              "
            >

              <div
                className="
                  inline-flex
                  items-center
                  gap-3
                  px-5
                  py-3
                  rounded-full
                  bg-white/15
                  backdrop-blur-xl
                "
              >

                <Sparkles size={18} />

                <span
                  className="
                    font-semibold
                  "
                >
                  Nouvelle génération IA
                </span>

              </div>

              <h2
                className="
                  mt-10
                  text-6xl
                  font-black
                  leading-[1]
                "
              >

                Construisez
                votre futur
                académique.

              </h2>

              <p
                className="
                  mt-8
                  text-xl
                  text-blue-100
                  leading-relaxed
                  max-w-xl
                "
              >

                Une plateforme moderne
                pour organiser,
                rédiger et réussir
                votre PFE intelligemment.

              </p>

            </div>

          </div>

          {/* BOTTOM */}

          <div
            className="
              relative
              z-10
              space-y-5
            "
          >

            <div
              className="
                flex
                items-center
                gap-4
                bg-white/10
                border
                border-white/10
                rounded-3xl
                p-5
                backdrop-blur-xl
              "
            >

              <CheckCircle2 size={28} />

              <div>

                <h3
                  className="
                    font-bold
                    text-lg
                  "
                >
                  Assistant IA
                </h3>

                <p
                  className="
                    text-blue-100
                    mt-1
                  "
                >
                  Génération académique intelligente.
                </p>

              </div>

            </div>

            <div
              className="
                flex
                items-center
                gap-4
                bg-white/10
                border
                border-white/10
                rounded-3xl
                p-5
                backdrop-blur-xl
              "
            >

              <CheckCircle2 size={28} />

              <div>

                <h3
                  className="
                    font-bold
                    text-lg
                  "
                >
                  Planning intelligent
                </h3>

                <p
                  className="
                    text-blue-100
                    mt-1
                  "
                >
                  Timeline et suivi de progression.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div
          className="
            p-8
            md:p-14
            flex
            flex-col
            justify-center
          "
        >

          {/* MOBILE LOGO */}

          <div
            className="
              lg:hidden
              flex
              items-center
              gap-4
            "
          >

            <div
              className="
                relative
                w-14
                h-14
                rounded-2xl
                overflow-hidden
                shadow-xl
              "
            >

              <Image
                src="/logo-guidepfe.png"
                alt="GuidePFE"
                fill
                className="object-cover"
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
                  text-sm
                  text-slate-500
                  mt-1
                "
              >
                Workspace académique
              </p>

            </div>

          </div>

          {/* HEADER */}

          <div
            className="
              mt-8
              lg:mt-0
            "
          >

            <div
              className="
                inline-flex
                items-center
                gap-3
                px-5
                py-3
                rounded-full
                bg-blue-50
                text-blue-700
                font-semibold
              "
            >

              <ShieldCheck size={18} />

              Création sécurisée

            </div>

            <h2
              className="
                mt-8
                text-5xl
                font-black
                text-slate-900
              "
            >
              Créer un compte 🚀
            </h2>

            <p
              className="
                mt-4
                text-lg
                text-slate-500
                leading-relaxed
              "
            >
              Lancez votre workspace intelligent
              et commencez votre projet PFE.
            </p>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleRegister}
            className="
              mt-12
              space-y-5
            "
          >

            <input
              type="text"
              placeholder="Nom complet"
              required
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="
                input-premium
              "
            />

            <input
              type="email"
              placeholder="Adresse email"
              required
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                input-premium
              "
            />

            <input
              type="password"
              placeholder="Mot de passe"
              required
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
                input-premium
              "
            />

            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              required
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              className="
                input-premium
              "
            />

            {
              errorMessage && (

                <div
                  className="
                    rounded-2xl
                    border
                    border-red-200
                    bg-red-50
                    p-4
                    text-red-600
                    text-sm
                  "
                >

                  {errorMessage}

                </div>

              )
            }

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                h-16
                rounded-3xl
                bg-gradient-to-r
                from-blue-600
                to-fuchsia-600
                text-white
                font-bold
                text-lg
                flex
                items-center
                justify-center
                gap-3
                shadow-2xl
                hover:scale-[1.02]
                transition-all
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

                      Création...
                    </>
                  )
                  : (
                    <>
                      Start Your Workspace

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

              Déjà un compte ?

              <Link
                href="/auth/login"
                className="
                  ml-2
                  font-bold
                  text-blue-600
                "
              >
                Se connecter
              </Link>

            </p>

          </div>

        </div>

      </div>

    </main>

  )
}