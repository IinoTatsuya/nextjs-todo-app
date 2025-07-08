'use client'

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import { useTaskDetailPage } from './hooks/useTaskDetailPage'
import Loading from './components/Loading'
import NoTask from './components/NoTask'

export default function TaskDetailPage() {
  const {
    task,
    setTask,
    isLoading,
    isSaving,
    setIsSaving,
    formData,
    setFormData,
  } = useTaskDetailPage()

  if (isLoading) {
    return <Loading />
  }

  if (!task) {
    return <NoTask />
  }

  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <Header task={task} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <MainContent
            task={task}
            setTask={setTask}
            isLoading={isLoading}
            isSaving={isSaving}
            setIsSaving={setIsSaving}
            formData={formData}
            setFormData={setFormData}
          />

          {/* Sidebar */}
          <Sidebar task={task} formData={formData} setFormData={setFormData} />
        </div>
      </div>
    </div>
  )
}
