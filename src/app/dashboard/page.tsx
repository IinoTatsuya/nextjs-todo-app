'use client'

import { useDashboard } from '@/app/dashboard/hooks/useDashboard'
import DashboardHeader from './components/DashboardHeader'
import TaskList from './components/TaskList'
import Controls from './components/Controls'
import TaskStats from './components/TaskStats'
import Loading from '@/app/components/Loading'

export default function Dashboard() {
  const {
    loading,
    filteredTasks,
    currentFilter,
    setCurrentFilter,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    taskCounts,
  } = useDashboard()

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <DashboardHeader />
        {/* Controls */}
        <Controls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          viewMode={viewMode}
          setViewMode={setViewMode}
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
          taskCounts={taskCounts}
        />

        {/* Task List */}
        {loading ? (
          <Loading />
        ) : (
          <TaskList
            filteredTasks={filteredTasks}
            searchQuery={searchQuery}
            viewMode={viewMode}
          />
        )}

        {/* Stats */}
        {filteredTasks.length > 0 && <TaskStats taskCounts={taskCounts} />}
      </div>
    </div>
  )
}
