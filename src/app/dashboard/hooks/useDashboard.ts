import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getTasks } from '@/lib/task-data'
import { filterTasks, sortTasksByDueDate } from '@/lib/task-utils'
import { Task } from '@/types/task'

export const useDashboard = () => {
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [currentFilter, setCurrentFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks()
      setTasks(fetchedTasks)
    }
    fetchTasks()
  }, [])

  const filteredTasks = useMemo(() => {
    let filtered = filterTasks(tasks, currentFilter)

    if (searchQuery) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    return sortTasksByDueDate(filtered)
  }, [tasks, currentFilter, searchQuery])

  const taskCounts = useMemo(
    () => ({
      all: tasks.length,
      todo: tasks.filter((t) => t.status === 'todo').length,
      inProgress: tasks.filter((t) => t.status === 'inProgress').length,
      completed: tasks.filter((t) => t.status === 'completed').length,
    }),
    [tasks],
  )

  const handleEditTask = (taskId: string) => {
    router.push(`/dashboard/${taskId}`)
  }

  const handleCreateTask = () => {
    router.push('/dashboard/new')
  }

  return {
    router,
    filteredTasks,
    currentFilter,
    setCurrentFilter,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    taskCounts,
    handleEditTask,
    handleCreateTask,
  }
}
