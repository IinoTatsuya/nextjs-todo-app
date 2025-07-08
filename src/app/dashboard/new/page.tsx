'use client'

import { useNewTaskPage } from './hooks/useNewTaskPage'
import Header from './components/Header'
import QuickTemplates from './components/QuickTemplates'
import MainForm from './components/MainForm'

export default function NewTaskPage() {
  const { formData, setFormData, handleCreate, isCreating, handleQuickCreate } =
    useNewTaskPage()

  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <MainForm
            formData={formData}
            setFormData={setFormData}
            handleCreate={handleCreate}
            isCreating={isCreating}
          />

          {/* Quick Templates */}
          <QuickTemplates handleQuickCreate={handleQuickCreate} />
        </div>
      </div>
    </div>
  )
}
