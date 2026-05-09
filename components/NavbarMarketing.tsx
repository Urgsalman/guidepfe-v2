'use client'

import Link from 'next/link'

import Image from 'next/image'

import {
  ArrowRight,
} from 'lucide-react'

export default function NavbarMarketing() {

  return (

    <header
      className="
        fixed
        top-0
        left-0
        z-50
        w-full
        border-b
        border-white/20
        bg-white/70
        backdrop-blur-2xl
      "
    >

      <div
        className="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          px-6
          py-5
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

          <Image
            src="/logo-guidepfe.png"
            alt="GuidePFE"
            width={70}
            height={70}
            priority
            className="
              h-auto
              w-[70px]
              object-contain
            "
          />

          <div>

            <h1
              className="
                text-4xl
                font-black
                tracking-tight
                bg-gradient-to-r
                from-blue-600
                via-violet-600
                to-fuchsia-500
                bg-clip-text
                text-transparent
              "
            >
              GuidePFE
            </h1>

            <p
              className="
                mt-1
                text-sm
                font-medium
                text-slate-500
              "
            >
              Workspace académique intelligent
            </p>

          </div>

        </Link>

        {/* NAVIGATION */}

        <nav
          className="
            hidden
            items-center
            gap-10
            text-sm
            font-semibold
            text-slate-700
            lg:flex
          "
        >

          <a
            href="#features"
            className="
              transition
              hover:text-blue-600
            "
          >
            Fonctionnalités
          </a>

          <a
            href="#timeline"
            className="
              transition
              hover:text-blue-600
            "
          >
            Timeline
          </a>

          <a
            href="#vision"
            className="
              transition
              hover:text-blue-600
            "
          >
            Vision
          </a>

        </nav>

        {/* CTA */}

        <div
          className="
            flex
            items-center
            gap-4
          "
        >

          <Link
            href="/dashboard"
            className="
              hidden
              text-sm
              font-semibold
              text-slate-700
              transition
              hover:text-blue-600
              md:flex
            "
          >

            Dashboard

          </Link>

          <Link
            href="/dashboard"
            className="
              flex
              items-center
              gap-2
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              via-violet-600
              to-fuchsia-500
              px-7
              py-4
              text-sm
              font-bold
              text-white
              shadow-[0_20px_50px_rgba(124,58,237,0.25)]
              transition-all
              duration-300
              hover:scale-[1.03]
            "
          >

            Commencer

            <ArrowRight size={18} />

          </Link>

        </div>

      </div>

    </header>

  )

}