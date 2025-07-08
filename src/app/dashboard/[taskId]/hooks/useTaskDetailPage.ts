import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { getTaskById } from '@/lib/task-data'
import { Task, TaskStatus } from '@/types/task'
import { FormData } from '@/types/form-data'

export const useTaskDetailPage = () => {
  const params = useParams<{ taskId: string }>()
  const [task, setTask] = useState<Task | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    dueDate: '',
    status: 'todo' as TaskStatus,
  })

  useEffect(() => {
    const fetchTask = async () => {
      setIsLoading(true)
      const foundTask = await getTaskById(params.taskId)
      if (foundTask) {
        setTask(foundTask)
        setFormData({
          title: foundTask.title,
          description: foundTask.description || '',
          dueDate: foundTask.dueDate
            ? foundTask.dueDate.toISOString().split('T')[0]
            : '',
          status: foundTask.status,
        })
      }
      setIsLoading(false)
    }

    fetchTask()
  }, [params.taskId])

  return {
    task,
    setTask,
    isLoading,
    isSaving,
    setIsSaving,
    formData,
    setFormData,
  }
}
