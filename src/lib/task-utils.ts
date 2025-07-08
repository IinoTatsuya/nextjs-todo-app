import { Task, TaskStatus } from '@/types/task'

export const getStatusColor = (status: TaskStatus): string => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'in-progress':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

export const getStatusIcon = (status: TaskStatus): string => {
  switch (status) {
    case 'pending':
      return '⏳'
    case 'in-progress':
      return '🔄'
    case 'completed':
      return '✅'
    default:
      return '📝'
  }
}

export const getStatusLabel = (status: TaskStatus): string => {
  switch (status) {
    case 'pending':
      return 'Pending'
    case 'in-progress':
      return 'In Progress'
    case 'completed':
      return 'Completed'
    default:
      return 'Unknown'
  }
}

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const isOverdue = (dueDate?: Date): boolean => {
  if (!dueDate) return false
  return dueDate < new Date()
}

export const filterTasks = (tasks: Task[], filter: string): Task[] => {
  switch (filter) {
    case 'pending':
      return tasks.filter((task) => task.status === 'pending')
    case 'in-progress':
      return tasks.filter((task) => task.status === 'in-progress')
    case 'completed':
      return tasks.filter((task) => task.status === 'completed')
    default:
      return tasks
  }
}

export const sortTasksByDueDate = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => {
    // Tasks without due dates go to the end
    if (!a.dueDate && !b.dueDate) return 0
    if (!a.dueDate) return 1
    if (!b.dueDate) return -1

    return a.dueDate.getTime() - b.dueDate.getTime()
  })
}
