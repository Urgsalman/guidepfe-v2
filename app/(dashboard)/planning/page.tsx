'use client'

import {
  useProject,
} from '@/components/context/ProjectContext'


import {
  useEffect,
  useMemo,
  useState,
} from 'react'

import { supabase } from '@/lib/supabase'

import {
  CalendarDays,
  Sparkles,
  CheckCircle2,
  Clock3,
  Trash2,
  Plus,
  Target,
  BrainCircuit,
} from 'lucide-react'

interface Task {
  id: string
  title: string
  completed: boolean
  due_date: string
}

export default function PlanningPage() {

  const {
  currentProject,
  refreshDashboardStats,
} = useProject()

  const [date, setDate] =
    useState('')

  const [
    taskTitle,
    setTaskTitle,
  ] = useState('')

  const [tasks, setTasks] =
    useState<Task[]>([])

  const [loading, setLoading] =
    useState(false)

  /* LOAD TASKS */

  useEffect(() => {

    fetchTasks()

  }, [])

  async function fetchTasks() {

    if (!currentProject) return

const {
  data,
  error,
} = await supabase
  .from('planning_tasks')
  .select('*')
  .eq(
    'project_id',
    currentProject.id
  )
  .order('created_at', {
    ascending: false,
  })

    if (!error && data) {

      setTasks(data)

    }

  }

  /* ADD TASK */

  async function addTask() {

    if (!taskTitle) return

    setLoading(true)

    const {
      data: { user },
    } =
      await supabase.auth.getUser()

    if (!user) {

      alert(
        'Utilisateur non connecté'
      )

      setLoading(false)

      return
    }

    const { error } =
      await supabase
        .from('planning_tasks')
        .insert([
          {
  user_id: user.id,
  project_id:
    currentProject?.id,
  title: taskTitle,
  completed: false,
  due_date: date,
}
        ])

    setLoading(false)

    if (error) {

      alert(error.message)

      return
    }

    setTaskTitle('')
    setDate('')

    fetchTasks()
  }

  /* TOGGLE */

  async function toggleTask(
    task: Task
  ) {

    await supabase
      .from('planning_tasks')
      .update({
        completed:
          !task.completed,
      })
      .eq('id', task.id)

    fetchTasks()
  }

  /* DELETE */

  async function deleteTask(
    id: string
  ) {

    await supabase
      .from('planning_tasks')
      .delete()
      .eq('id', id)

    fetchTasks()
  }

  /* PROGRESS */

  const progress =
    useMemo(() => {

      if (
        tasks.length === 0
      ) return 0

      const completed =
        tasks.filter(
          (task) =>
            task.completed
        ).length

      return Math.round(
        (
          completed /
          tasks.length
        ) * 100
      )

    }, [tasks])

  /* DAYS */

  const daysRemaining =
    useMemo(() => {

      if (!date) return null

      const today =
        new Date()

      const target =
        new Date(date)

      const diff =
        target.getTime() -
        today.getTime()

      return Math.ceil(
        diff /
        (
          1000 *
          60 *
          60 *
          24
        )
      )

    }, [date])

  return (

    <main className="space-y-10">

      {/* HERO */}

      <section
        className="
          relative
          overflow-hidden
          rounded-[40px]
          border
          border-slate-200
          bg-white
          p-10
          shadow-sm
        "
      >

        {/* BACKGROUND */}

        <div
          className="
            absolute
            top-0
            right-0
            h-[350px]
            w-[350px]
            rounded-full
            bg-blue-500/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-0
            left-0
            h-[250px]
            w-[250px]
            rounded-full
            bg-purple-500/10
            blur-3xl
          "
        />

        <div className="relative z-10">

          {/* BADGE */}

          <div
            className="
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-purple-100
              px-5
              py-3
            "
          >

            <Sparkles
              size={18}
              className="
                text-purple-600
              "
            />

            <span
              className="
                text-sm
                font-semibold
                text-purple-700
              "
            >
              Planning Intelligent
            </span>

          </div>

          {/* TITLE */}

          <h1
            className="
              mt-8
              text-5xl
              md:text-7xl
              font-black
              leading-tight
              tracking-tight
              text-slate-900
            "
          >

            Organisez votre
            <br />

            <span
              className="
                bg-gradient-to-r
                from-blue-600
                via-indigo-600
                to-purple-600
                bg-clip-text
                text-transparent
              "
            >
              projet PFE
            </span>

          </h1>

          {/* DESCRIPTION */}

          <p
            className="
              mt-8
              max-w-3xl
              text-xl
              leading-relaxed
              text-slate-500
            "
          >

            Créez un planning
            intelligent,
            suivez vos tâches
            et pilotez votre
            progression
            académique.

          </p>

        </div>

      </section>

      {/* STATS */}

      <section
        className="
          grid
          grid-cols-1
          gap-6
          md:grid-cols-3
        "
      >

        {/* PROGRESS */}

        <div
          className="
            rounded-[32px]
            border
            border-slate-200
            bg-white
            p-8
            shadow-sm
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-slate-500
                "
              >
                Progression
              </p>

              <h2
                className="
                  mt-3
                  text-5xl
                  font-black
                  text-slate-900
                "
              >
                {progress}%
              </h2>

            </div>

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
                to-purple-600
                text-white
              "
            >

              <Target
                size={30}
              />

            </div>

          </div>

        </div>

        {/* TASKS */}

        <div
          className="
            rounded-[32px]
            border
            border-slate-200
            bg-white
            p-8
            shadow-sm
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-slate-500
                "
              >
                Tâches
              </p>

              <h2
                className="
                  mt-3
                  text-5xl
                  font-black
                  text-slate-900
                "
              >
                {tasks.length}
              </h2>

            </div>

            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-r
                from-green-500
                to-emerald-500
                text-white
              "
            >

              <CheckCircle2
                size={30}
              />

            </div>

          </div>

        </div>

        {/* DAYS */}

        <div
          className="
            rounded-[32px]
            border
            border-slate-200
            bg-white
            p-8
            shadow-sm
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-slate-500
                "
              >
                Jours restants
              </p>

              <h2
                className="
                  mt-3
                  text-5xl
                  font-black
                  text-slate-900
                "
              >

                {
                  daysRemaining
                    ?? '--'
                }

              </h2>

            </div>

            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-r
                from-orange-500
                to-red-500
                text-white
              "
            >

              <Clock3
                size={30}
              />

            </div>

          </div>

        </div>

      </section>

      {/* MAIN GRID */}

      <section
        className="
          grid
          grid-cols-1
          gap-8
          xl:grid-cols-3
        "
      >

        {/* LEFT */}

        <div
          className="
            xl:col-span-2
            rounded-[40px]
            border
            border-slate-200
            bg-white
            p-8
            shadow-sm
          "
        >

          {/* HEADER */}

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <div>

              <h2
                className="
                  text-3xl
                  font-black
                  text-slate-900
                "
              >
                Mes tâches
              </h2>

              <p
                className="
                  mt-2
                  text-slate-500
                "
              >
                Gérez votre
                planning académique.
              </p>

            </div>

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
                to-purple-600
                text-white
              "
            >

              <CalendarDays
                size={30}
              />

            </div>

          </div>

          {/* FORM */}

          <div
            className="
              mt-10
              grid
              grid-cols-1
              gap-5
              xl:grid-cols-12
            "
          >

            <input
              type="text"
              placeholder="Nouvelle tâche"
              value={taskTitle}
              onChange={(e) =>
                setTaskTitle(
                  e.target.value
                )
              }
              className="
                xl:col-span-6
                h-16
                rounded-3xl
                border
                border-slate-200
                bg-slate-50
                px-6
                text-lg
                outline-none
                focus:border-blue-400
              "
            />

            <input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(
                  e.target.value
                )
              }
              className="
                xl:col-span-3
                h-16
                rounded-3xl
                border
                border-slate-200
                bg-slate-50
                px-6
                text-lg
                outline-none
                focus:border-blue-400
              "
            />

            <button
              onClick={addTask}
              disabled={loading}
              className="
                xl:col-span-3
                flex
                h-16
                items-center
                justify-center
                gap-3
                rounded-3xl
                bg-gradient-to-r
                from-blue-600
                to-purple-600
                text-lg
                font-bold
                text-white
                transition-all
                duration-300
                hover:scale-[1.02]
              "
            >

              <Plus size={22} />

              {
                loading
                  ? 'Ajout...'
                  : 'Ajouter'
              }

            </button>

          </div>

          {/* TASKS */}

          <div
            className="
              mt-10
              space-y-5
            "
          >

            {
              tasks.length === 0 && (

                <div
                  className="
                    rounded-3xl
                    border
                    border-dashed
                    border-slate-300
                    bg-slate-50
                    p-10
                    text-center
                  "
                >

                  <h3
                    className="
                      text-2xl
                      font-bold
                      text-slate-800
                    "
                  >
                    Aucune tâche
                  </h3>

                  <p
                    className="
                      mt-3
                      text-slate-500
                    "
                  >
                    Ajoutez votre
                    première tâche.
                  </p>

                </div>

              )
            }

            {
              tasks.map((task) => (

                <div
                  key={task.id}
                  className="
                    flex
                    items-center
                    justify-between
                    gap-5
                    rounded-3xl
                    border
                    border-slate-200
                    bg-slate-50
                    p-6
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-5
                    "
                  >

                    <button
                      onClick={() =>
                        toggleTask(
                          task
                        )
                      }
                      className={`
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        transition

                        ${
                          task.completed
                            ? 'bg-green-100 text-green-600'
                            : 'bg-slate-200 text-slate-500'
                        }
                      `}
                    >

                      <CheckCircle2
                        size={24}
                      />

                    </button>

                    <div>

                      <h3
                        className={`
                          text-xl
                          font-black

                          ${
                            task.completed
                              ? 'line-through text-slate-400'
                              : 'text-slate-900'
                          }
                        `}
                      >
                        {task.title}
                      </h3>

                      <p
                        className="
                          mt-2
                          text-slate-500
                        "
                      >

                        {
                          task.due_date
                            ? `Date limite : ${task.due_date}`
                            : 'Sans date'
                        }

                      </p>

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      deleteTask(
                        task.id
                      )
                    }
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-red-50
                      text-red-500
                      transition
                      hover:bg-red-100
                    "
                  >

                    <Trash2
                      size={22}
                    />

                  </button>

                </div>

              ))
            }

          </div>

        </div>

        {/* RIGHT */}

        <div className="space-y-8">

          {/* IA */}

          <div
            className="
              rounded-[40px]
              border
              border-slate-200
              bg-white
              p-8
              shadow-sm
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
                to-purple-600
                text-white
              "
            >

              <BrainCircuit
                size={30}
              />

            </div>

            <h2
              className="
                mt-8
                text-3xl
                font-black
                text-slate-900
              "
            >
              Assistant IA
            </h2>

            <p
              className="
                mt-4
                leading-relaxed
                text-slate-500
              "
            >
              Utilisez
              l’intelligence
              artificielle pour
              générer un planning
              stratégique optimisé.
            </p>

            <button
              className="
                mt-8
                w-full
                rounded-3xl
                bg-gradient-to-r
                from-blue-600
                to-purple-600
                px-6
                py-5
                text-lg
                font-bold
                text-white
                transition-all
                duration-300
                hover:scale-[1.02]
              "
            >
              Générer un planning IA
            </button>

          </div>

          {/* PROGRESSION */}

          <div
            className="
              rounded-[40px]
              border
              border-slate-200
              bg-white
              p-8
              shadow-sm
            "
          >

            <h2
              className="
                text-3xl
                font-black
                text-slate-900
              "
            >
              Progression
            </h2>

            <div
              className="
                mt-8
                h-5
                overflow-hidden
                rounded-full
                bg-slate-200
              "
            >

              <div
                style={{
                  width: `${progress}%`,
                }}
                className="
                  h-full
                  rounded-full
                  bg-gradient-to-r
                  from-blue-600
                  to-purple-600
                "
              />

            </div>

            <p
              className="
                mt-5
                text-lg
                font-semibold
                text-slate-700
              "
            >
              {progress}% des tâches
              complétées
            </p>

          </div>

        </div>

      </section>

    </main>

  )

}