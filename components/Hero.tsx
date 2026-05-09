'use client'

import Link from 'next/link'

import { motion } from 'framer-motion'

import {
  ArrowRight,
  BrainCircuit,
  FileText,
  GraduationCap,
  Sparkles,
} from 'lucide-react'

export default function Hero() {

  return (

    <section className="
      relative
      overflow-hidden
      min-h-screen
      flex
      items-center
      justify-center
      px-6
      pt-40
      pb-32
    ">

      {/* GRID */}

      <div className="
        absolute
        inset-0
        grid-bg
      " />

      {/* GLOW */}

      <div className="
        absolute
        top-[-200px]
        left-[-200px]
        hero-glow
      " />

      <div className="
        absolute
        bottom-[-200px]
        right-[-200px]
        hero-glow
      " />

      {/* CONTENT */}

      <div className="
        relative
        z-10
        max-w-7xl
        mx-auto
        text-center
      ">

        {/* BADGE */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >

          <div className="
            inline-flex
            items-center
            gap-3
            glass
            rounded-full
            px-6
            py-3
            border
            border-white/30
            shadow-xl
          ">

            <Sparkles
              size={18}
              className="text-blue-600"
            />

            <span className="
              text-sm
              font-semibold
              text-slate-700
            ">
              Plateforme académique intelligente nouvelle génération
            </span>

          </div>

        </motion.div>

        {/* TITLE */}

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="
            mt-10
            text-6xl
            md:text-8xl
            xl:text-9xl
            font-black
            tracking-[-0.05em]
            leading-[0.9]
          "
        >

          Réinventez

          <br />

          <span className="gradient-text">
            votre PFE
          </span>

        </motion.h1>

        {/* DESCRIPTION */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
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

          Une plateforme moderne combinant intelligence artificielle,
          méthodologie scientifique et outils académiques
          pour accompagner les étudiants du sujet jusqu’à la soutenance.

        </motion.p>

        {/* BUTTONS */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="
            mt-14
            flex
            flex-col
            sm:flex-row
            gap-5
            justify-center
          "
        >

          <Link
            href="/dashboard"
            className="
              btn-premium
              px-10
              py-5
              text-lg
              flex
              items-center
              justify-center
              gap-3
            "
          >

            Commencer maintenant

            <ArrowRight size={22} />

          </Link>

          <a
            href="#features"
            className="
              glass
              border
              border-white/30
              px-10
              py-5
              rounded-2xl
              text-lg
              font-semibold
              text-slate-700
              hover:shadow-xl
              transition-all
            "
          >

            Explorer la plateforme

          </a>

        </motion.div>

        {/* TAGS */}

        <div className="
          mt-16
          flex
          flex-wrap
          justify-center
          gap-4
        ">

          {[
            'Assistant IA',
            'CV ATS',
            'Planning intelligent',
            'Méthodologie',
            'Recherche scientifique',
          ].map((item) => (

            <div
              key={item}
              className="
                glass
                border
                border-white/30
                px-5
                py-3
                rounded-full
                text-sm
                font-medium
                text-slate-700
              "
            >

              {item}

            </div>

          ))}

        </div>

        {/* FLOATING CARDS */}

        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{
            repeat: Infinity,
            duration: 5,
          }}
          className="
            hidden
            xl:block
            absolute
            left-0
            top-40
          "
        >

          <FloatingCard
            icon={<BrainCircuit className="text-blue-600" />}
            title="Assistant IA"
            description="Génération académique intelligente"
            bg="bg-blue-100"
          />

        </motion.div>

        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{
            repeat: Infinity,
            duration: 6,
          }}
          className="
            hidden
            xl:block
            absolute
            right-0
            top-64
          "
        >

          <FloatingCard
            icon={<FileText className="text-purple-600" />}
            title="CV ATS"
            description="Optimisation intelligente du CV"
            bg="bg-purple-100"
          />

        </motion.div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 4,
          }}
          className="
            hidden
            xl:block
            absolute
            left-24
            bottom-0
          "
        >

          <FloatingCard
            icon={<GraduationCap className="text-green-600" />}
            title="Soutenance"
            description="Préparation et méthodologie avancée"
            bg="bg-green-100"
          />

        </motion.div>

      </div>

    </section>

  )
}

function FloatingCard({
  icon,
  title,
  description,
  bg,
}: {
  icon: React.ReactNode
  title: string
  description: string
  bg: string
}) {

  return (

    <div className="
      card-premium
      p-6
      w-72
    ">

      <div className="
        flex
        items-center
        gap-4
      ">

        <div className={`
          w-14
          h-14
          rounded-2xl
          flex
          items-center
          justify-center
          ${bg}
        `}>

          {icon}

        </div>

        <div>

          <h3 className="
            font-black
            text-slate-900
          ">
            {title}
          </h3>

          <p className="
            text-sm
            text-slate-500
          ">
            {description}
          </p>

        </div>

      </div>

    </div>

  )
}