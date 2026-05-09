'use client'

import Link from 'next/link'

import Image from 'next/image'

import {
  usePathname,
} from 'next/navigation'

import {
  LayoutDashboard,
  BrainCircuit,
  CalendarDays,
  FileText,
  Sparkles,
  GraduationCap,
  BookOpen,
  ChevronRight,
  Plus,
} from 'lucide-react'

const links = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },

  {
    title: 'Assistant IA',
    href: '/assistant',
    icon: BrainCircuit,
  },

  {
    title: 'Planning',
    href: '/planning',
    icon: CalendarDays,
  },

  {
    title: 'CV ATS',
    href: '/cv-builder',
    icon: FileText,
  },

  {
    title: 'Problématique',
    href: '/problematique',
    icon: Sparkles,
  },

  {
    title: 'Méthodologie',
    href: '/methodologie',
    icon: GraduationCap,
  },

  {
    title: 'Ressources',
    href: '/ressources',
    icon: BookOpen,
  },
]

export default function SidebarDashboard() {

  const pathname =
    usePathname()

  return (

    <aside
      className="
        fixed
        top-0
        left-0
        z-50
        flex
        h-screen
        w-[290px]
        flex-col
        border-r
        border-slate-200/70
        bg-white/75
        backdrop-blur-2xl
        sidebar-shadow
      "
    >

      {/* TOP */}

      <div
        className="
          border-b
          border-slate-200/60
          px-7
          py-7
        "
      >

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

          <div>

            <h1
              className="
                text-[34px]
                font-black
                leading-none
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
              Academic Workspace
            </p>

          </div>

        </Link>

      </div>

      {/* NAVIGATION */}

      <div
        className="
          flex-1
          overflow-y-auto
          px-5
          py-8
        "
      >

        {/* LABEL */}

        <div
          className="
            mb-5
            px-4
            text-xs
            font-bold
            uppercase
            tracking-[0.25em]
            text-slate-400
          "
        >
          Workspace
        </div>

        {/* LINKS */}

        <nav
          className="
            space-y-2
          "
        >

          {links.map((link, index) => {

            const Icon =
              link.icon

            const active =
              pathname === link.href

            return (

              <Link
                key={index}
                href={link.href}
                className={`
                  group
                  relative
                  flex
                  items-center
                  justify-between
                  overflow-hidden
                  rounded-2xl
                  px-4
                  py-4
                  transition-all
                  duration-300

                  ${
                    active
                      ? `
                        bg-gradient-to-r
                        from-blue-600
                        via-violet-600
                        to-fuchsia-500
                        text-white
                        shadow-[0_20px_50px_rgba(124,58,237,0.25)]
                      `
                      : `
                        text-slate-700
                        hover:bg-white
                        hover:shadow-lg
                      `
                  }
                `}
              >

                {/* GLOW */}

                {
                  active && (

                    <div
                      className="
                        absolute
                        inset-0
                        bg-white/10
                      "
                    />

                  )
                }

                {/* LEFT */}

                <div
                  className="
                    relative
                    z-10
                    flex
                    items-center
                    gap-4
                  "
                >

                  <div
                    className={`
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl

                      ${
                        active
                          ? `
                            bg-white/15
                          `
                          : `
                            bg-slate-100
                            group-hover:bg-slate-200
                          `
                      }
                    `}
                  >

                    <Icon size={20} />

                  </div>

                  <span
                    className="
                      text-[15px]
                      font-semibold
                    "
                  >
                    {link.title}
                  </span>

                </div>

                {/* RIGHT */}

                <ChevronRight
                  size={18}
                  className={`
                    relative
                    z-10
                    transition-all
                    duration-300

                    ${
                      active
                        ? `
                          opacity-100
                          translate-x-0
                        `
                        : `
                          opacity-0
                          -translate-x-2
                          group-hover:opacity-100
                          group-hover:translate-x-0
                        `
                    }
                  `}
                />

              </Link>

            )

          })}

        </nav>

      </div>

      {/* BOTTOM */}

      <div
        className="
          border-t
          border-slate-200/60
          p-5
        "
      >

      </div>

    </aside>

  )

}