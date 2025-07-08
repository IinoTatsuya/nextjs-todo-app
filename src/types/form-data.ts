import { TaskStatus } from '@/types/task'

export type FormData = {
  title: string
  description?: string
  dueDate?: string
  status: TaskStatus
}
