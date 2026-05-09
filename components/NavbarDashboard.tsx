'use client'

import {
  useEffect,
  useRef,
  useState,
} from 'react'

import Link from 'next/link'
import Image from 'next/image'

import {
  usePathname,
} from 'next/navigation'

import {
  Bell,
  Search,
  UserCircle2,
  ChevronDown,
  LogOut,
  FolderKanban,
  FileText,
  BrainCircuit,
  Sparkles,
  CalendarDays,
  GraduationCap,
  BookOpen,
  Settings,
  CheckCircle2,
  Clock3,
  Menu,
  X,
} from 'lucide-react'

import { supabase } from '@/lib/supabase'

import {
  useProject,
} from '@/components/context/ProjectContext'

type Notification = {
  id: string
  title: string
  description: string
}

export default function NavbarDashboard() {

  const pathname =
    usePathname()

  const {
    currentProject,
    projects,
    setCurrentProject,
    refreshNotifications,
  } = useProject()

  const dropdownRef =
    useRef<HTMLDivElement | null>(null)

  const notifRef =
    useRef<HTMLDivElement | null>(null)

  const searchRef =
    useRef<HTMLDivElement | null>(null)

  const [userEmail, setUserEmail] =
    useState('Étudiant')

  const [openUser, setOpenUser] =
    useState(false)

  const [openNotif, setOpenNotif] =
    useState(false)

  const [openSearch, setOpenSearch] =
    useState(false)

  const [mobileMenu, setMobileMenu] =
    useState(false)

  const [search, setSearch] =
    useState('')

  const [notifications, setNotifications] =
    useState<Notification[]>([])

  const titles: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/assistant': 'Assistant IA',
    '/planning': 'Planning Intelligent',
    '/cv-builder': 'CV ATS Builder',
    '/problematique': 'Problématique IA',
    '/methodologie': 'Méthodologie',
    '/ressources': 'Ressources',
  }

  useEffect(() => {

    loadUser()

    loadNotifications()

    function handleOutsideClick(
      event: MouseEvent
    ) {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
      ) {

        setOpenUser(false)
      }

      if (
        notifRef.current &&
        !notifRef.current.contains(
          event.target as Node
        )
      ) {

        setOpenNotif(false)
      }

      if (
        searchRef.current &&
        !searchRef.current.contains(
          event.target as Node
        )
      ) {

        setOpenSearch(false)
      }
    }

    document.addEventListener(
      'mousedown',
      handleOutsideClick
    )

    return () => {

      document.removeEventListener(
        'mousedown',
        handleOutsideClick
      )
    }

  }, [])

  async function loadUser() {

    const {
      data: { user },
    } =
      await supabase.auth.getUser()

    if (user?.email) {

      setUserEmail(
        user.email
      )
    }
  }

  async function loadNotifications() {

    const {
      data: { user },
    } =
      await supabase.auth.getUser()

    if (!user) return

    const { data } =
      await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', {
          ascending: false,
        })
        .limit(10)

    setNotifications(data || [])
  }

  async function handleLogout() {

    await supabase.auth.signOut()

    window.location.href = '/'
  }

  function handleSearch() {

    const value =
      search.toLowerCase()

    if (
      value.includes('dashboard')
    ) {

      window.location.href =
        '/dashboard'
    }

    else if (
      value.includes('cv')
    ) {

      window.location.href =
        '/cv-builder'
    }

    else if (
      value.includes('planning')
    ) {

      window.location.href =
        '/planning'
    }

    else if (
      value.includes('assistant')
    ) {

      window.location.href =
        '/assistant'
    }

    else if (
      value.includes('méthodo') ||
      value.includes('methodo')
    ) {

      window.location.href =
        '/methodologie'
    }

    else if (
      value.includes('ressource')
    ) {

      window.location.href =
        '/ressources'
    }

    else {

      alert(
        'Aucun résultat trouvé.'
      )
    }
  }

  return (

    <header
      className="
        sticky
        top-0
        z-40
        bg-white/85
        backdrop-blur-2xl
        border-b
        border-slate-200
      "
    >

      <div
        className="
          px-6
          lg:px-10
          py-5
          flex
          items-center
          justify-between
          gap-6
        "
      >

        {/* LEFT */}

        <div
          className="
            flex
            items-center
            gap-5
          "
        >

          {/* MOBILE MENU */}

          <button
            onClick={() =>
              setMobileMenu(
                !mobileMenu
              )
            }
            className="
              xl:hidden
              w-12
              h-12
              rounded-2xl
              border
              border-slate-200
              flex
              items-center
              justify-center
            "
          >

            {
              mobileMenu
                ? <X size={22} />
                : <Menu size={22} />
            }

          </button>

          {/* LOGO */}

          <Link
            href="/dashboard"
            className="
              flex
              items-center
              gap-4
            "
          >

            <div
              className="
                hidden
                lg:block
              "
            >

            </div>

          </Link>

        </div>

        {/* CENTER */}

        <div
          className="
            hidden
            xl:flex
            flex-col
            flex-1
            px-6
          "
        >

          <h2
            className="
              text-4xl
              font-black
              text-slate-900
            "
          >
            {
              titles[pathname]
              || 'GuidePFE'
            }
          </h2>

          <p
            className="
              mt-2
              text-slate-500
            "
          >
            {
              currentProject
                ?.title
              || 'Aucun projet actif'
            }
          </p>

        </div>

        {/* RIGHT */}

        <div
          className="
            flex
            items-center
            gap-4
          "
        >

          {/* SEARCH */}

          <div
            ref={searchRef}
            className="
              hidden
              md:flex
              items-center
              gap-3
              bg-white
              px-5
              py-4
              rounded-2xl
              border
              border-slate-200
              shadow-sm
              w-80
            "
          >

            <Search
              size={18}
              className="
                text-slate-400
              "
            />

            <input
              type="text"
              placeholder="Rechercher..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              onKeyDown={(e) => {

                if (
                  e.key === 'Enter'
                ) {

                  handleSearch()
                }
              }}
              className="
                bg-transparent
                outline-none
                text-sm
                w-full
              "
            />

          </div>

          {/* NOTIFICATIONS */}

          <div
            className="relative"
            ref={notifRef}
          >

            <button
              onClick={() => {

                setOpenNotif(
                  !openNotif
                )

                refreshNotifications()
              }}
              className="
                relative
                w-14
                h-14
                rounded-2xl
                bg-white
                border
                border-slate-200
                shadow-sm
                flex
                items-center
                justify-center
                hover:scale-105
                transition
              "
            >

              <Bell size={20} />

              {
                notifications.length > 0 && (

                  <span
                    className="
                      absolute
                      top-3
                      right-3
                      w-2.5
                      h-2.5
                      bg-red-500
                      rounded-full
                    "
                  />

                )
              }

            </button>

            {
              openNotif && (

                <div
                  className="
                    absolute
                    right-0
                    mt-4
                    w-96
                    bg-white
                    border
                    border-slate-200
                    rounded-3xl
                    shadow-2xl
                    overflow-hidden
                  "
                >

                  {/* HEADER */}

                  <div
                    className="
                      p-6
                      border-b
                      border-slate-100
                    "
                  >

                    <h3
                      className="
                        text-2xl
                        font-black
                      "
                    >
                      Notifications
                    </h3>

                  </div>

                  {/* CONTENT */}

                  <div
                    className="
                      max-h-[500px]
                      overflow-y-auto
                    "
                  >

                    {
                      notifications.length === 0 && (

                        <div
                          className="
                            p-10
                            text-center
                          "
                        >

                          <Bell
                            size={50}
                            className="
                              mx-auto
                              text-slate-300
                            "
                          />

                          <p
                            className="
                              mt-5
                              text-slate-500
                            "
                          >
                            Aucune notification.
                          </p>

                        </div>

                      )
                    }

                    {
                      notifications.map(
                        (notif) => (

                          <div
                            key={notif.id}
                            className="
                              p-5
                              border-b
                              border-slate-100
                              hover:bg-slate-50
                              transition
                            "
                          >

                            <h4
                              className="
                                font-bold
                                text-slate-900
                              "
                            >
                              {notif.title}
                            </h4>

                            <p
                              className="
                                mt-2
                                text-sm
                                text-slate-500
                              "
                            >
                              {
                                notif.description
                              }
                            </p>

                          </div>

                        )
                      )
                    }

                  </div>

                </div>

              )
            }

          </div>

          {/* USER */}

          <div
            className="relative"
            ref={dropdownRef}
          >

            <button
              onClick={() =>
                setOpenUser(
                  !openUser
                )
              }
              className="
                bg-gradient-to-r
                from-blue-600
                to-fuchsia-600
                text-white
                px-6
                py-4
                rounded-2xl
                shadow-2xl
                flex
                items-center
                gap-3
                hover:scale-105
                transition
              "
            >

              <UserCircle2
                size={22}
              />

              <span
                className="
                  hidden
                  md:block
                  max-w-[180px]
                  truncate
                  font-semibold
                "
              >
                {
                  currentProject
                    ?.title
                  || 'Workspace'
                }
              </span>

              <ChevronDown
                size={18}
              />

            </button>

            {
              openUser && (

                <div
                  className="
                    absolute
                    right-0
                    mt-4
                    w-[360px]
                    bg-white
                    border
                    border-slate-200
                    rounded-[32px]
                    shadow-2xl
                    overflow-hidden
                  "
                >

                  {/* TOP */}

                  <div
                    className="
                      p-6
                      border-b
                      border-slate-100
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
                          w-16
                          h-16
                          rounded-2xl
                          bg-gradient-to-r
                          from-blue-600
                          to-fuchsia-600
                          text-white
                          flex
                          items-center
                          justify-center
                          shadow-xl
                        "
                      >

                        <UserCircle2
                          size={32}
                        />

                      </div>

                      <div>

                        <p
                          className="
                            text-xs
                            uppercase
                            text-slate-400
                            font-bold
                          "
                        >
                          Connecté en tant que
                        </p>

                        <h3
                          className="
                            mt-1
                            font-bold
                            text-lg
                            truncate
                            max-w-[220px]
                          "
                        >
                          {userEmail}
                        </h3>

                      </div>

                    </div>

                  </div>

                  {/* NAV */}

                  <div
                    className="
                      p-3
                    "
                  >

                    <Link
                      href="/dashboard"
                      className="
                        flex
                        items-center
                        gap-4
                        px-4
                        py-4
                        rounded-2xl
                        hover:bg-slate-100
                        transition
                      "
                    >

                      <FolderKanban
                        size={20}
                      />

                      Dashboard

                    </Link>

                    <Link
                      href="/planning"
                      className="
                        flex
                        items-center
                        gap-4
                        px-4
                        py-4
                        rounded-2xl
                        hover:bg-slate-100
                        transition
                      "
                    >

                      <CalendarDays
                        size={20}
                      />

                      Planning

                    </Link>

                    <Link
                      href="/cv-builder"
                      className="
                        flex
                        items-center
                        gap-4
                        px-4
                        py-4
                        rounded-2xl
                        hover:bg-slate-100
                        transition
                      "
                    >

                      <FileText
                        size={20}
                      />

                      CV ATS

                    </Link>

                    <Link
                      href="/assistant"
                      className="
                        flex
                        items-center
                        gap-4
                        px-4
                        py-4
                        rounded-2xl
                        hover:bg-slate-100
                        transition
                      "
                    >

                      <BrainCircuit
                        size={20}
                      />

                      Assistant IA

                    </Link>

                    <Link
                      href="/methodologie"
                      className="
                        flex
                        items-center
                        gap-4
                        px-4
                        py-4
                        rounded-2xl
                        hover:bg-slate-100
                        transition
                      "
                    >

                      <GraduationCap
                        size={20}
                      />

                      Méthodologie

                    </Link>

                    <Link
                      href="/ressources"
                      className="
                        flex
                        items-center
                        gap-4
                        px-4
                        py-4
                        rounded-2xl
                        hover:bg-slate-100
                        transition
                      "
                    >

                      <BookOpen
                        size={20}
                      />

                      Ressources

                    </Link>

                    <button
                      className="
                        w-full
                        flex
                        items-center
                        gap-4
                        px-4
                        py-4
                        rounded-2xl
                        hover:bg-slate-100
                        transition
                      "
                    >

                      <Settings
                        size={20}
                      />

                      Paramètres

                    </button>

                  </div>

                  {/* PROJECTS */}

                  <div
                    className="
                      border-t
                      border-slate-100
                      p-4
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        mb-4
                      "
                    >

                      <h4
                        className="
                          font-black
                        "
                      >
                        Mes projets
                      </h4>

                      <Sparkles
                        size={18}
                        className="
                          text-fuchsia-500
                        "
                      />

                    </div>

                    <div
                      className="
                        space-y-2
                        max-h-48
                        overflow-y-auto
                      "
                    >

                      {
                        projects.map(
                          (project) => (

                            <button
                              key={project.id}
                              onClick={() => {

                                setCurrentProject(
                                  project
                                )

                                setOpenUser(
                                  false
                                )
                              }}
                              className={`
                                w-full
                                text-left
                                px-4
                                py-3
                                rounded-2xl
                                transition
                                font-medium

                                ${
                                  currentProject?.id === project.id
                                    ? `
                                      bg-gradient-to-r
                                      from-blue-600
                                      to-fuchsia-600
                                      text-white
                                      shadow-xl
                                    `
                                    : `
                                      hover:bg-slate-100
                                    `
                                }
                              `}
                            >

                              {project.title}

                            </button>

                          )
                        )
                      }

                    </div>

                  </div>

                  {/* FOOTER */}

                  <div
                    className="
                      border-t
                      border-slate-100
                      p-4
                    "
                  >

                    <button
                      onClick={
                        handleLogout
                      }
                      className="
                        w-full
                        h-14
                        rounded-2xl
                        bg-red-50
                        hover:bg-red-100
                        transition
                        text-red-600
                        font-bold
                        flex
                        items-center
                        justify-center
                        gap-3
                      "
                    >

                      <LogOut
                        size={20}
                      />

                      Déconnexion

                    </button>

                  </div>

                </div>

              )
            }

          </div>

        </div>

      </div>

      {/* MOBILE PANEL */}

      {
        mobileMenu && (

          <div
            className="
              xl:hidden
              border-t
              border-slate-200
              bg-white
              p-6
            "
          >

            <div
              className="
                space-y-3
              "
            >

              <Link
                href="/dashboard"
                className="
                  flex
                  items-center
                  gap-4
                  p-4
                  rounded-2xl
                  hover:bg-slate-100
                "
              >

                <FolderKanban
                  size={20}
                />

                Dashboard

              </Link>

              <Link
                href="/assistant"
                className="
                  flex
                  items-center
                  gap-4
                  p-4
                  rounded-2xl
                  hover:bg-slate-100
                "
              >

                <BrainCircuit
                  size={20}
                />

                Assistant IA

              </Link>

              <Link
                href="/planning"
                className="
                  flex
                  items-center
                  gap-4
                  p-4
                  rounded-2xl
                  hover:bg-slate-100
                "
              >

                <Clock3
                  size={20}
                />

                Planning

              </Link>

            </div>

          </div>

        )
      }

    </header>
  )
}