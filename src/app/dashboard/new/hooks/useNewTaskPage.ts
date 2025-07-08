'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createTask } from '@/lib/task-data'
import { TaskStatus } from '@/types/task'
import { FormData } from '@/types/form-data'

export const useNewTaskPage = () => {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    dueDate: '',
    status: 'todo' as TaskStatus,
  })

  const handleCreate = async () => {
    if (!formData.title.trim()) return

    setIsCreating(true)
    try {
      const newTask = await createTask({
        title: formData.title,
        description: formData.description || undefined,
        dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
        status: formData.status,
      })

      if (newTask) {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Error creating task:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const handleQuickCreate = (template: {
    title: string
    description: string
  }) => {
    setFormData({
      ...formData,
      title: template.title,
      description: template.description,
    })
  }

  return {
    formData,
    setFormData,
    handleCreate,
    isCreating,
    handleQuickCreate,
  }
}
