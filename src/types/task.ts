export interface Task {
  id: string
  title: string
  description?: string
  dueDate?: Date
  status: 'todo' | 'in-progress' | 'completed'
  createdAt: Date
  updatedAt: Date
}

export type TaskStatus = Task['status']

export interface TaskFormData {
  title: string
  description?: string
  dueDate?: Date
  status: TaskStatus
}
