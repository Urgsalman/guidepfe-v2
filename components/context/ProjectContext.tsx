'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'

import { supabase } from '@/lib/supabase'

/* =========================================================
   TYPES
========================================================= */

export type Project = {
  id: string
  user_id?: string
  title: string
  description: string
  status: string
  is_active: boolean
  created_at?: string
}

export type Notification = {
  id: string
  title: string
  description: string
  created_at?: string
}

export type DashboardStats = {
  totalCVs: number
  totalTasks: number
  completedTasks: number
  methodologies: number
  progress: number
}

type ProjectContextType = {
  projects: Project[]
  currentProject: Project | null
  notifications: Notification[]
  dashboardStats: DashboardStats
  loading: boolean

  setCurrentProject: (
    project: Project
  ) => Promise<void>

  refreshProjects: () => Promise<void>

  refreshNotifications: () => Promise<void>

  refreshDashboardStats: () => Promise<void>

  refreshAllData: () => Promise<void>
}

const ProjectContext =
  createContext<ProjectContextType | null>(
    null
  )

export function ProjectProvider({
  children,
}: {
  children: ReactNode
}) {

  const [loading, setLoading] =
    useState(true)

  const [projects, setProjects] =
    useState<Project[]>([])

  const [
    currentProject,
    setCurrentProjectState,
  ] =
    useState<Project | null>(null)

  const [
    notifications,
    setNotifications,
  ] =
    useState<Notification[]>([])

  const [
    dashboardStats,
    setDashboardStats,
  ] =
    useState<DashboardStats>({
      totalCVs: 0,
      totalTasks: 0,
      completedTasks: 0,
      methodologies: 0,
      progress: 0,
    })

  /* =========================================================
     PROJECTS
  ========================================================= */

  async function refreshProjects() {

    try {

      const {
        data: { user },
      } =
        await supabase.auth.getUser()

      if (!user) {

        setProjects([])

        setCurrentProjectState(null)

        return
      }

      const {
        data,
        error,
      } =
        await supabase
          .from('projects')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', {
            ascending: false,
          })

      if (error) {

        console.error(error)

        return
      }

      const allProjects =
        data || []

      setProjects(allProjects)

      let activeProject =
        allProjects.find(
          (project) =>
            project.is_active
        )

      /*
        SI AUCUN PROJET ACTIF
      */

      if (
        !activeProject &&
        allProjects.length > 0
      ) {

        activeProject =
          allProjects[0]

        await supabase
          .from('projects')
          .update({
            is_active: true,
          })
          .eq(
            'id',
            activeProject.id
          )

      }

      setCurrentProjectState(
        activeProject || null
      )

    } catch (error) {

      console.error(error)

    }

  }

  /* =========================================================
     SET CURRENT PROJECT
  ========================================================= */

  async function setCurrentProject(
    project: Project
  ) {

    try {

      const {
        data: { user },
      } =
        await supabase.auth.getUser()

      if (!user) return

      /*
        RESET TOUS
      */

      await supabase
        .from('projects')
        .update({
          is_active: false,
        })
        .eq('user_id', user.id)

      /*
        ACTIVE LE BON
      */

      await supabase
        .from('projects')
        .update({
          is_active: true,
        })
        .eq('id', project.id)

      /*
        UPDATE LOCAL DIRECT
      */

      const updatedProject = {
        ...project,
        is_active: true,
      }

      setCurrentProjectState(
        updatedProject
      )

      setProjects((prev) =>
        prev.map((p) => ({
          ...p,
          is_active:
            p.id === project.id,
        }))
      )

      /*
        REFRESH GLOBAL
      */

      await refreshDashboardStats()

      window.dispatchEvent(
        new Event(
          'guidepfe-refresh'
        )
      )

    } catch (error) {

      console.error(error)

    }

  }

  /* =========================================================
     NOTIFICATIONS
  ========================================================= */

  async function refreshNotifications() {

    try {

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

    } catch (error) {

      console.error(error)

    }

  }

  /* =========================================================
     DASHBOARD STATS
  ========================================================= */

  async function refreshDashboardStats() {

    try {

      if (!currentProject) return

      const {
        data: tasks,
      } =
        await supabase
          .from('planning_tasks')
          .select('*')
          .eq(
            'project_id',
            currentProject.id
          )

      const totalTasks =
        tasks?.length || 0

      const completedTasks =
        tasks?.filter(
          (task) =>
            task.completed
        ).length || 0

      const progress =
        totalTasks > 0
          ? Math.round(
              (
                completedTasks /
                totalTasks
              ) * 100
            )
          : 0

      setDashboardStats({
        totalCVs: 0,
        methodologies: 0,
        totalTasks,
        completedTasks,
        progress,
      })

    } catch (error) {

      console.error(error)

    }

  }

  /* =========================================================
     REFRESH ALL
  ========================================================= */

  async function refreshAllData() {

    setLoading(true)

    await refreshProjects()

    await refreshNotifications()

    setLoading(false)

  }

  /* =========================================================
     INIT
  ========================================================= */

  useEffect(() => {

    refreshAllData()

  }, [])

  /* =========================================================
     AUTO REFRESH PROJECT
  ========================================================= */

  useEffect(() => {

    if (!currentProject) return

    refreshDashboardStats()

  }, [currentProject])

  return (

    <ProjectContext.Provider
      value={{
        projects,
        currentProject,
        notifications,
        dashboardStats,
        loading,
        setCurrentProject,
        refreshProjects,
        refreshNotifications,
        refreshDashboardStats,
        refreshAllData,
      }}
    >

      {children}

    </ProjectContext.Provider>

  )

}

export function useProject() {

  const context =
    useContext(ProjectContext)

  if (!context) {

    throw new Error(
      'useProject must be used inside ProjectProvider'
    )

  }

  return context

}