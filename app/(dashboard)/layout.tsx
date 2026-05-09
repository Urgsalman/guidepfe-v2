'use client'

import {
  useEffect,
  useState,
} from 'react'

import {
  useRouter,
} from 'next/navigation'

import SidebarDashboard from '@/components/SidebarDashboard'

import NavbarDashboard from '@/components/NavbarDashboard'

import {
  ProjectProvider,
} from '@/components/context/ProjectContext'

import { supabase } from '@/lib/supabase'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const router =
    useRouter()

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    checkSession()

  }, [])

  async function checkSession() {

    const {
      data: { session },
    } =
      await supabase.auth.getSession()

    if (!session) {

      router.push('/auth/login')

      return
    }

    setLoading(false)
  }

  if (loading) {

    return (

      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          dashboard-bg
        "
      >

        <div
          className="
            flex
            flex-col
            items-center
          "
        >

          {/* SPINNER */}

          <div
            className="
              w-20
              h-20
              rounded-full
              border-4
              border-slate-200
              border-t-blue-600
              animate-spin
            "
          />

          <h2
            className="
              mt-8
              text-3xl
              font-black
              gradient-text
            "
          >
            GuidePFE
          </h2>

          <p
            className="
              mt-3
              text-slate-500
            "
          >
            Chargement du workspace...
          </p>

        </div>

      </div>

    )
  }

  return (

    <ProjectProvider>

      <div
        className="
          min-h-screen
          dashboard-bg
          flex
        "
      >

        {/* SIDEBAR */}

        <div
          className="
            hidden
            xl:block
          "
        >

          <SidebarDashboard />

        </div>

        {/* MAIN */}

        <div
          className="
            flex-1
            xl:ml-80
            min-h-screen
            flex
            flex-col
          "
        >

          {/* NAVBAR */}

          <NavbarDashboard />

          {/* CONTENT */}

          <main
            className="
              flex-1
              p-5
              md:p-8
              xl:p-10
            "
          >

            <div
              className="
                max-w-[1700px]
                mx-auto
              "
            >

              {children}

            </div>

          </main>

        </div>

      </div>

    </ProjectProvider>

  )
}