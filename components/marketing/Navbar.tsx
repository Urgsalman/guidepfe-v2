'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function Navbar() {

  return (

    <header
      className="
        sticky
        top-0
        z-50
        w-full
        border-b
        border-slate-200/60
        bg-white/70
        backdrop-blur-2xl
      "
    >

      <div
        className="
          mx-auto
          flex
          h-20
          max-w-7xl
          items-center
          justify-between
          px-6
          lg:px-8
        "
      >

        {/* LEFT */}

        <Link
          href="/"
          className="
            group
            flex
            items-center
            gap-4
          "
        >


          {/* BRAND */}

          <div className="flex flex-col">

            <span
              className="
                text-4xl
                font-black
                tracking-tight
                leading-none
                bg-gradient-to-r
                from-blue-600
                via-violet-600
                to-fuchsia-500
                bg-clip-text
                text-transparent
              "
            >
              GuidePFE
            </span>

            <span
              className="
                mt-1
                text-sm
                font-medium
                text-slate-500
              "
            >
              Workspace académique intelligent
            </span>

          </div>

        </Link>

        {/* CENTER */}

        <nav
          className="
            hidden
            items-center
            gap-10
            lg:flex
          "
        >

          <Link
            href="#features"
            className="
              text-[15px]
              font-semibold
              text-slate-700
              transition-all
              duration-300
              hover:text-blue-600
            "
          >
            Fonctionnalités
          </Link>

          <Link
            href="#timeline"
            className="
              text-[15px]
              font-semibold
              text-slate-700
              transition-all
              duration-300
              hover:text-blue-600
            "
          >
            Timeline
          </Link>

          <Link
            href="#assistant"
            className="
              text-[15px]
              font-semibold
              text-slate-700
              transition-all
              duration-300
              hover:text-blue-600
            "
          >
            Assistant IA
          </Link>

          <Link
            href="#cvats"
            className="
              text-[15px]
              font-semibold
              text-slate-700
              transition-all
              duration-300
              hover:text-blue-600
            "
          >
            CV ATS
          </Link>

          <Link
            href="#faq"
            className="
              text-[15px]
              font-semibold
              text-slate-700
              transition-all
              duration-300
              hover:text-blue-600
            "
          >
            FAQ
          </Link>

        </nav>

        {/* RIGHT */}

        <div
          className="
            flex
            items-center
            gap-4
          "
        >

          {/* LOGIN */}

          <Link
            href="/auth/login"
            className="
              hidden
              text-[15px]
              font-semibold
              text-slate-700
              transition-all
              duration-300
              hover:text-black
              md:block
            "
          >
            Connexion
          </Link>

          {/* CTA */}

          <Link
            href="/dashboard"
            className="
              group
              relative
              inline-flex
              items-center
              gap-3
              overflow-hidden
              rounded-2xl
              bg-gradient-to-r
              from-[#2563eb]
              via-[#7c3aed]
              to-[#d946ef]
              px-7
              py-4
              text-sm
              font-bold
              text-white
              shadow-[0_15px_50px_rgba(124,58,237,0.30)]
              transition-all
              duration-300
              hover:scale-[1.03]
              hover:shadow-[0_25px_70px_rgba(124,58,237,0.40)]
            "
          >

            {/* GLOW */}

            <div
              className="
                absolute
                inset-0
                opacity-0
                transition-opacity
                duration-300
                group-hover:opacity-100
                bg-white/10
              "
            />

            <span className="relative z-10">
              Start Your Dashboard
            </span>

            <ArrowRight
              size={18}
              className="
                relative
                z-10
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />

          </Link>

        </div>

      </div>

    </header>

  )

}