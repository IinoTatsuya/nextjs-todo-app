import { Task } from '@/types/task'

// Mock data - in a real app, this would come from a database
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design System Implementation',
    description:
      'Create a comprehensive design system for the new product launch including components, tokens, and guidelines.',
    dueDate: new Date('2025-01-15'),
    status: 'in-progress',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-05'),
  },
  {
    id: '2',
    title: 'User Authentication Setup',
    description:
      'Implement secure user authentication with JWT tokens and refresh token rotation.',
    dueDate: new Date('2025-01-20'),
    status: 'pending',
    createdAt: new Date('2025-01-02'),
    updatedAt: new Date('2025-01-02'),
  },
  {
    id: '3',
    title: 'Database Migration',
    description:
      'Migrate legacy database to new schema with proper indexing and optimization.',
    dueDate: new Date('2025-01-10'),
    status: 'completed',
    createdAt: new Date('2024-12-28'),
    updatedAt: new Date('2025-01-08'),
  },
  {
    id: '4',
    title: 'Mobile App Testing',
    description:
      'Comprehensive testing of mobile application across different devices and OS versions.',
    dueDate: new Date('2025-01-25'),
    status: 'pending',
    createdAt: new Date('2025-01-03'),
    updatedAt: new Date('2025-01-03'),
  },
  {
    id: '5',
    title: 'Performance Optimization',
    description:
      'Optimize application performance and reduce load times by 40%.',
    status: 'in-progress',
    createdAt: new Date('2025-01-04'),
    updatedAt: new Date('2025-01-06'),
  },
]

// In a real app, these would be API calls
export const getTasks = (): Task[] => mockTasks

export const getTaskById = (id: string): Task | undefined =>
  mockTasks.find((task) => task.id === id)

export const createTask = (
  taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>,
): Task => {
  const newTask: Task = {
    ...taskData,
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  mockTasks.push(newTask)
  return newTask
}

export const updateTask = (
  id: string,
  updates: Partial<Task>,
): Task | undefined => {
  const taskIndex = mockTasks.findIndex((task) => task.id === id)
  if (taskIndex === -1) return undefined

  mockTasks[taskIndex] = {
    ...mockTasks[taskIndex],
    ...updates,
    updatedAt: new Date(),
  }

  return mockTasks[taskIndex]
}

export const deleteTask = (id: string): boolean => {
  const taskIndex = mockTasks.findIndex((task) => task.id === id)
  if (taskIndex === -1) return false

  mockTasks.splice(taskIndex, 1)
  return true
}
