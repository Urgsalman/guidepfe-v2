'use client'

import Link from 'next/link'

import { motion } from 'framer-motion'

import {
  ArrowRight,
  BrainCircuit,
  Sparkles,
  GraduationCap,
  FileText,
  CalendarDays,
} from 'lucide-react'

const features = [
  {
    icon: BrainCircuit,
    title: 'Assistant IA',
    description:
      'Générez problématique, idées et contenus académiques intelligents.',
  },

  {
    icon: GraduationCap,
    title: 'Méthodologie',
    description:
      'Structurez votre mémoire avec une vraie logique scientifique.',
  },

  {
    icon: FileText,
    title: 'CV ATS',
    description:
      'Optimisez votre CV pour les recruteurs et systèmes ATS.',
  },

  {
    icon: CalendarDays,
    title: 'Planning',
    description:
      'Organisez automatiquement toutes les étapes du PFE.',
  },
]

export default function Hero() {

  return (

    <section
      className="
        relative
        overflow-hidden
        pt-36
        pb-24
        hero-grid
      "
    >

      {/* GLOW */}

      <div className="hero-glow top-[-250px] left-[-250px]" />

      <div className="hero-glow bottom-[-250px] right-[-250px]" />

      {/* CONTENT */}

      <div
        className="
          relative
          z-10
          max-w-6xl
          mx-auto
          px-6
        "
      >

        {/* BADGE */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.7,
          }}

          className="
            flex
            justify-center
          "
        >

          <div
            className="
              inline-flex
              items-center
              gap-3
              px-6
              py-3
              rounded-full
              bg-white/80
              border
              border-slate-200
              shadow-xl
              backdrop-blur-xl
            "
          >

            <Sparkles
              size={18}
              className="text-blue-600"
            />

            <span
              className="
                text-sm
                font-semibold
                text-slate-700
              "
            >
              Plateforme académique nouvelle génération
            </span>

          </div>

        </motion.div>

        {/* TITLE */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            delay: 0.2,
            duration: 0.8,
          }}

          className="
            mt-12
            text-center
          "
        >

          <h1
            className="
              text-6xl
              md:text-8xl
              xl:text-[120px]
              font-black
              tracking-tight
              leading-[0.9]
              text-slate-950
            "
          >

            Réinventez

            <br />

            <span className="gradient-text">
              votre PFE
            </span>

          </h1>

          <p
            className="
              mt-10
              text-xl
              md:text-2xl
              text-slate-600
              max-w-4xl
              mx-auto
              leading-relaxed
            "
          >

            Une plateforme moderne combinant
            intelligence artificielle,
            méthodologie scientifique
            et outils académiques premium
            pour accompagner les étudiants
            du sujet jusqu’à la soutenance.

          </p>

        </motion.div>

        {/* CTA */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            delay: 0.4,
            duration: 0.7,
          }}

          className="
            mt-14
            flex
            flex-col
            sm:flex-row
            items-center
            justify-center
            gap-5
          "
        >

          <Link
            href="/auth/login"
            className="
              h-16
              px-10
              rounded-3xl
              bg-gradient-to-r
              from-blue-600
              to-purple-600
              text-white
              font-bold
              text-lg
              flex
              items-center
              gap-3
              shadow-2xl
              hover:scale-105
              transition-all
            "
          >

            Start Your Dashboard

            <ArrowRight size={22} />

          </Link>

          <a
            href="#features"
            className="
              h-16
              px-10
              rounded-3xl
              bg-white
              border
              border-slate-200
              text-slate-900
              font-bold
              text-lg
              flex
              items-center
              justify-center
              shadow-lg
              hover:scale-105
              transition-all
            "
          >

            Explorer la plateforme

          </a>

        </motion.div>

        {/* FEATURES */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            delay: 0.6,
            duration: 0.8,
          }}

          className="
            mt-28
            grid
            sm:grid-cols-2
            xl:grid-cols-4
            gap-8
          "
        >

          {features.map((feature, index) => {

            const Icon = feature.icon

            return (

              <div
                key={index}
                className="
                  card-premium
                  card-hover
                  p-10
                "
              >

                <div
                  className="
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
                    shadow-xl
                  "
                >

                  <Icon size={30} />

                </div>

                <h3
                  className="
                    mt-8
                    text-3xl
                    font-black
                    text-slate-900
                  "
                >
                  {feature.title}
                </h3>

                <p
                  className="
                    mt-5
                    text-slate-600
                    leading-relaxed
                  "
                >
                  {feature.description}
                </p>

              </div>

            )

          })}

        </motion.div>

      </div>

    </section>

  )
}