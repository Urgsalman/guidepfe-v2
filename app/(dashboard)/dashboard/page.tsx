'use client'

import {
  useEffect,
  useMemo,
  useState,
} from 'react'

import Link from 'next/link'

import { useRouter } from 'next/navigation'

import {
  ArrowRight,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FolderKanban,
  GraduationCap,
  Plus,
  Sparkles,
  Target,
  Trash2,
  X,
} from 'lucide-react'

import { supabase } from '@/lib/supabase'

import {
  useProject,
} from '@/components/context/ProjectContext'

type Task = {
  id: string
  title: string
  completed: boolean
  due_date?: string
}

type Notification = {
  id: string
  title: string
  description: string
}

export default function DashboardPage() {

  const router = useRouter()

  const {
    currentProject,
    projects,
    setCurrentProject,
    refreshProjects,
  } = useProject()

  const [tasks, setTasks] =
    useState<Task[]>([])

  const [
    notifications,
    setNotifications,
  ] =
    useState<Notification[]>([])

  const [
    showCreateModal,
    setShowCreateModal,
  ] =
    useState(false)

  const [
    showDeleteModal,
    setShowDeleteModal,
  ] =
    useState(false)

  const [projectName, setProjectName] =
    useState('')

  const [
    creatingProject,
    setCreatingProject,
  ] =
    useState(false)

  const [
    deletingProject,
    setDeletingProject,
  ] =
    useState(false)

  /* =========================================================
     FETCH DASHBOARD
  ========================================================= */

  useEffect(() => {

    if (!currentProject) return

    fetchDashboardData()

  }, [currentProject])

  async function fetchDashboardData() {

    try {

      if (!currentProject) return

      const {
        data: tasksData,
      } =
        await supabase
          .from('planning_tasks')
          .select('*')
          .eq(
            'project_id',
            currentProject.id
          )
          .order('created_at', {
            ascending: false,
          })

      const {
        data: { user },
      } =
        await supabase.auth.getUser()

      if (!user) return

      const {
        data: notificationsData,
      } =
        await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', {
            ascending: false,
          })
          .limit(5)

      setTasks(tasksData || [])

      setNotifications(
        notificationsData || []
      )

    } catch (error) {

      console.error(error)

    }

  }

  /* =========================================================
     CREATE PROJECT
  ========================================================= */

  async function createProject() {

    try {

      if (!projectName) return

      setCreatingProject(true)

      const {
        data: { user },
      } =
        await supabase.auth.getUser()

      if (!user) return

      /*
        DESACTIVE TOUS
      */

      await supabase
        .from('projects')
        .update({
          is_active: false,
        })
        .eq('user_id', user.id)

      /*
        CREATE
      */

      const {
        data: newProject,
      } =
        await supabase
          .from('projects')
          .insert([
            {
              user_id: user.id,

              title: projectName,

              description:
                'Nouveau projet académique',

              status: 'En cours',

              is_active: true,
            },
          ])
          .select()
          .single()

      setProjectName('')

      setShowCreateModal(false)

      await refreshProjects()

      if (newProject) {

        await setCurrentProject(
          newProject
        )

      }

      router.refresh()

    } catch (error) {

      console.error(error)

    } finally {

      setCreatingProject(false)

    }

  }

  /* =========================================================
     DELETE PROJECT
  ========================================================= */

  async function deleteProject() {

    try {

      if (!currentProject) return

      setDeletingProject(true)

      const deletingId =
        currentProject.id

      /*
        DELETE TASKS
      */

      await supabase
        .from('planning_tasks')
        .delete()
        .eq(
          'project_id',
          deletingId
        )

      /*
        DELETE NOTIFICATIONS
      */

      await supabase
        .from('notifications')
        .delete()
        .eq(
          'project_id',
          deletingId
        )

      /*
        DELETE PROJECT
      */

      await supabase
        .from('projects')
        .delete()
        .eq('id', deletingId)

      /*
        REFRESH
      */

      await refreshProjects()

      setShowDeleteModal(false)

      router.refresh()

    } catch (error) {

      console.error(error)

    } finally {

      setDeletingProject(false)

    }

  }

  /* =========================================================
     STATS
  ========================================================= */

  const completedTasks =
    useMemo(() => {

      return tasks.filter(
        (task) =>
          task.completed
      ).length

    }, [tasks])

  const totalTasks =
    tasks.length

  const progress =
    totalTasks > 0
      ? Math.round(
          (
            completedTasks /
            totalTasks
          ) * 100
        )
      : 0

  const daysRemaining =
    useMemo(() => {

      const tasksWithDate =
        tasks.filter(
          (task) =>
            task.due_date
        )

      if (
        tasksWithDate.length === 0
      ) {
        return '--'
      }

      const sorted =
        [...tasksWithDate].sort(
          (a, b) =>
            new Date(
              a.due_date!
            ).getTime() -
            new Date(
              b.due_date!
            ).getTime()
        )

      const nearest =
        sorted[0]

      const diff =
        Math.ceil(
          (
            new Date(
              nearest.due_date!
            ).getTime() -
            Date.now()
          ) /
            (
              1000 *
              60 *
              60 *
              24
            )
        )

      return diff > 0
        ? diff
        : 0

    }, [tasks])

  /* =========================================================
     RENDER
  ========================================================= */

  return (

    <>

      {/* =========================================================
         CREATE MODAL
      ========================================================= */}

      {
        showCreateModal && (

          <div
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/40
              backdrop-blur-sm
            "
          >

            <div
              className="
                w-full
                max-w-lg
                rounded-[32px]
                bg-white
                p-8
                shadow-2xl
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <h2
                  className="
                    text-3xl
                    font-black
                    text-slate-900
                  "
                >
                  Nouveau projet
                </h2>

                <button
                  onClick={() =>
                    setShowCreateModal(
                      false
                    )
                  }
                >

                  <X />

                </button>

              </div>

              <input
                value={projectName}
                onChange={(e) =>
                  setProjectName(
                    e.target.value
                  )
                }
                placeholder="Nom du projet"
                className="
                  mt-8
                  h-14
                  w-full
                  rounded-2xl
                  border
                  border-slate-200
                  px-5
                  outline-none
                "
              />

              <button
                onClick={createProject}
                disabled={
                  creatingProject
                }
                className="
                  mt-6
                  h-14
                  w-full
                  rounded-2xl
                  bg-gradient-to-r
                  from-blue-600
                  to-purple-600
                  font-bold
                  text-white
                "
              >

                {
                  creatingProject
                    ? 'Création...'
                    : 'Créer le projet'
                }

              </button>

            </div>

          </div>

        )
      }

      {/* =========================================================
         DELETE MODAL
      ========================================================= */}

      {
        showDeleteModal && (

          <div
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/40
              backdrop-blur-sm
            "
          >

            <div
              className="
                w-full
                max-w-md
                rounded-[32px]
                bg-white
                p-8
                shadow-2xl
              "
            >

              <h2
                className="
                  text-3xl
                  font-black
                  text-slate-900
                "
              >
                Supprimer le projet ?
              </h2>

              <p
                className="
                  mt-4
                  text-slate-500
                "
              >
                Cette action est irréversible.
              </p>

              <div
                className="
                  mt-8
                  flex
                  gap-4
                "
              >

                <button
                  onClick={() =>
                    setShowDeleteModal(
                      false
                    )
                  }
                  className="
                    h-14
                    flex-1
                    rounded-2xl
                    border
                    border-slate-200
                    font-semibold
                  "
                >

                  Annuler

                </button>

                <button
                  onClick={deleteProject}
                  disabled={
                    deletingProject
                  }
                  className="
                    h-14
                    flex-1
                    rounded-2xl
                    bg-red-500
                    font-bold
                    text-white
                  "
                >

                  {
                    deletingProject
                      ? 'Suppression...'
                      : 'Supprimer'
                  }

                </button>

              </div>

            </div>

          </div>

        )
      }

      {/* =========================================================
         EMPTY STATE
      ========================================================= */}

      {
        !currentProject ? (

          <div
            className="
              min-h-[70vh]
              flex
              items-center
              justify-center
            "
          >

            <div className="text-center">

              <FolderKanban
                size={60}
                className="
                  mx-auto
                  text-slate-300
                "
              />

              <h2
                className="
                  mt-6
                  text-3xl
                  font-black
                  text-slate-900
                "
              >
                Aucun projet actif
              </h2>

              <p
                className="
                  mt-3
                  text-slate-500
                "
              >
                Créez votre premier projet.
              </p>

              <button
                onClick={() =>
                  setShowCreateModal(
                    true
                  )
                }
                className="
                  mt-8
                  inline-flex
                  items-center
                  gap-3
                  rounded-2xl
                  bg-gradient-to-r
                  from-blue-600
                  to-purple-600
                  px-8
                  py-4
                  font-bold
                  text-white
                "
              >

                <Plus size={20} />

                Nouveau projet

              </button>

            </div>

          </div>

        ) : (

          <section className="space-y-8">

            {/* HERO */}

            <div
              className="
                rounded-[40px]
                border
                border-slate-200
                bg-gradient-to-r
                from-white
                to-purple-50
                px-10
                py-8
              "
            >

              <div
                className="
                  flex
                  flex-wrap
                  items-start
                  justify-between
                  gap-8
                "
              >

                <div>

                  <div
                    className="
                      inline-flex
                      items-center
                      gap-3
                      rounded-full
                      bg-blue-100
                      px-5
                      py-3
                      text-blue-700
                    "
                  >

                    <Sparkles
                      size={18}
                    />

                    Workspace académique intelligent

                  </div>

                  <h1
                    className="
                      mt-6
                      text-5xl
                      font-black
                      text-slate-900
                    "
                  >
                    {
                      currentProject.title
                    }
                  </h1>

                  <p
                    className="
                      mt-3
                      text-slate-600
                    "
                  >
                    {
                      currentProject.description
                    }
                  </p>

                </div>

                <div
                  className="
                    flex
                    flex-col
                    gap-4
                  "
                >

                  <select
                    value={
                      currentProject.id
                    }
                    onChange={async (
                      e
                    ) => {

                      const selected =
                        projects.find(
                          (
                            project
                          ) =>
                            project.id ===
                            e.target.value
                        )

                      if (
                        selected
                      ) {

                        await setCurrentProject(
                          selected
                        )

                      }

                    }}
                    className="
                      h-14
                      min-w-[260px]
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      px-5
                      font-semibold
                      text-slate-700
                      outline-none
                    "
                  >

                    {
                      projects.map(
                        (
                          project
                        ) => (

                          <option
                            key={
                              project.id
                            }
                            value={
                              project.id
                            }
                          >

                            {
                              project.title
                            }

                          </option>

                        )
                      )
                    }

                  </select>

                  <div
                    className="
                      flex
                      gap-3
                    "
                  >

                    <button
                      onClick={() =>
                        setShowCreateModal(
                          true
                        )
                      }
                      className="
                        flex
                        h-14
                        items-center
                        gap-3
                        rounded-2xl
                        bg-gradient-to-r
                        from-blue-600
                        to-purple-600
                        px-6
                        font-bold
                        text-white
                      "
                    >

                      <Plus
                        size={20}
                      />

                      Nouveau projet

                    </button>

                    <button
                      onClick={() =>
                        setShowDeleteModal(
                          true
                        )
                      }
                      className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-red-100
                        text-red-600
                      "
                    >

                      <Trash2
                        size={20}
                      />

                    </button>

                  </div>

                </div>

              </div>

            </div>

            {/* STATS */}

            <div
              className="
                grid
                gap-6
                md:grid-cols-2
                xl:grid-cols-4
              "
            >

              <StatCard
                icon={
                  <Target
                    size={28}
                  />
                }
                value={`${progress}%`}
                label="Progression réelle du PFE"
                gradient="
                  from-blue-600
                  to-cyan-500
                "
              />

              <StatCard
                icon={
                  <CheckCircle2
                    size={28}
                  />
                }
                value={completedTasks}
                label="Tâches complétées"
                gradient="
                  from-green-500
                  to-emerald-500
                "
              />

              <StatCard
                icon={
                  <CalendarDays
                    size={28}
                  />
                }
                value={totalTasks}
                label="Tâches totales"
                gradient="
                  from-orange-500
                  to-red-500
                "
              />

              <StatCard
                icon={
                  <Clock3
                    size={28}
                  />
                }
                value={daysRemaining}
                label="Jours restants"
                gradient="
                  from-purple-600
                  to-fuchsia-500
                "
              />

            </div>

            {/* QUICK ACCESS */}

            <div
              className="
                grid
                gap-6
                lg:grid-cols-2
              "
            >

              <Link
                href="/assistant"
                className="
                  rounded-[32px]
                  bg-gradient-to-r
                  from-blue-600
                  to-fuchsia-600
                  p-8
                  text-white
                "
              >

                <BrainCircuit
                  size={42}
                />

                <h3
                  className="
                    mt-8
                    text-3xl
                    font-black
                  "
                >
                  Assistant IA
                </h3>

                <p
                  className="
                    mt-3
                    text-blue-100
                  "
                >
                  Génération académique intelligente.
                </p>

                <div
                  className="
                    mt-8
                    flex
                    items-center
                    gap-2
                    font-semibold
                  "
                >

                  Ouvrir

                  <ArrowRight
                    size={18}
                  />

                </div>

              </Link>

              <Link
                href="/planning"
                className="
                  rounded-[32px]
                  border
                  border-slate-200
                  bg-white
                  p-8
                "
              >

                <CalendarDays
                  size={42}
                  className="
                    text-slate-700
                  "
                />

                <h3
                  className="
                    mt-8
                    text-3xl
                    font-black
                    text-slate-900
                  "
                >
                  Planning
                </h3>

                <p
                  className="
                    mt-3
                    text-slate-500
                  "
                >
                  Organisez votre mémoire intelligemment.
                </p>

              </Link>

            </div>

            {/* PROJECT + ACTIVITY */}

            <div
              className="
                grid
                gap-6
                xl:grid-cols-2
              "
            >

              <div
                className="
                  rounded-[32px]
                  border
                  border-slate-200
                  bg-white
                  p-8
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
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gradient-to-r
                      from-blue-600
                      to-fuchsia-600
                      text-white
                    "
                  >

                    <GraduationCap
                      size={28}
                    />

                  </div>

                  <div>

                    <h3
                      className="
                        text-2xl
                        font-black
                        text-slate-900
                      "
                    >
                      Projet actif
                    </h3>

                    <p
                      className="
                        text-slate-500
                      "
                    >
                      Workspace académique
                    </p>

                  </div>

                </div>

                <div className="mt-8">

                  <h2
                    className="
                      text-4xl
                      font-black
                      text-slate-900
                    "
                  >
                    {
                      currentProject.title
                    }
                  </h2>

                  <span
                    className="
                      mt-5
                      inline-flex
                      rounded-full
                      bg-blue-100
                      px-4
                      py-2
                      text-sm
                      font-semibold
                      text-blue-700
                    "
                  >

                    {
                      currentProject.status
                    }

                  </span>

                </div>

              </div>

              <div
                className="
                  rounded-[32px]
                  border
                  border-slate-200
                  bg-white
                  p-8
                "
              >

                <h2
                  className="
                    text-3xl
                    font-black
                    text-slate-900
                  "
                >
                  Activités récentes
                </h2>

                <p
                  className="
                    mt-2
                    text-slate-500
                  "
                >
                  Historique du projet
                </p>

                <div
                  className="
                    mt-8
                    space-y-4
                  "
                >

                  {
                    notifications.length >
                    0 ? (

                      notifications.map(
                        (
                          notification
                        ) => (

                          <div
                            key={
                              notification.id
                            }
                            className="
                              rounded-2xl
                              bg-slate-50
                              p-5
                            "
                          >

                            <h3
                              className="
                                font-bold
                                text-slate-900
                              "
                            >
                              {
                                notification.title
                              }
                            </h3>

                            <p
                              className="
                                mt-2
                                text-sm
                                text-slate-500
                              "
                            >
                              {
                                notification.description
                              }
                            </p>

                          </div>

                        )
                      )

                    ) : (

                      <div
                        className="
                          rounded-2xl
                          bg-slate-50
                          p-6
                          text-center
                        "
                      >

                        <p
                          className="
                            text-slate-500
                          "
                        >
                          Aucune activité récente.
                        </p>

                      </div>

                    )
                  }

                </div>

              </div>

            </div>

          </section>

        )
      }

    </>

  )

}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  value,
  label,
  gradient,
}: {
  icon: React.ReactNode
  value: string | number
  label: string
  gradient: string
}) {

  return (

    <div
      className="
        rounded-[32px]
        border
        border-slate-200
        bg-white
        p-8
      "
    >

      <div
        className={`
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-r
          ${gradient}
          text-white
        `}
      >

        {icon}

      </div>

      <h2
        className="
          mt-6
          text-5xl
          font-black
          text-slate-900
        "
      >
        {value}
      </h2>

      <p
        className="
          mt-3
          text-slate-500
        "
      >
        {label}
      </p>

    </div>

  )

}