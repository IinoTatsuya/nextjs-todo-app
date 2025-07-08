'use client'

import { signOut } from 'aws-amplify/auth'
import { Plus, Search, LayoutGrid, List } from 'lucide-react'
import { TaskCard } from '@/app/dashboard/components/TaskCard'
import { TaskFilter } from '@/app/dashboard/components/TaskFilter'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDashboard } from '@/app/dashboard/hooks/useDashboard'

export default function Dashboard() {
  const {
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
  } = useDashboard()

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Task Dashboard
              </h1>
              <p className="text-gray-600">
                あなたのタスクを管理し、生産性を向上させるためのダッシュボードです。
              </p>
            </div>
            <div>
              <Button
                onClick={handleCreateTask}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Task
              </Button>
              <Button
                variant="ghost"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => {
                  signOut()
                    .then(() => {
                      router.push('/')
                    })
                    .catch((error) => {
                      console.error('Sign out error:', error)
                    })
                }}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <TaskFilter
            currentFilter={currentFilter}
            onFilterChange={setCurrentFilter}
            taskCounts={taskCounts}
          />
        </div>

        {/* Task List */}
        <div className="mb-6">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                まだタスクはありません
              </h3>
              <p className="text-gray-600 mb-4">
                {searchQuery
                  ? 'その条件に一致するタスクは見つかりませんでした'
                  : '最初のタスクを追加しましょう！'}
              </p>
              {!searchQuery && (
                <Button
                  onClick={handleCreateTask}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  タスクを追加する
                </Button>
              )}
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredTasks.map((task) => (
                <div key={task.id} onClick={() => handleEditTask(task.id)}>
                  <TaskCard task={task} onEdit={handleEditTask} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        {filteredTasks.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {taskCounts.all}
                </div>
                <div className="text-sm text-gray-600">Total Tasks</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {taskCounts.todo}
                </div>
                <div className="text-sm text-gray-600">Todo</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {taskCounts.inProgress}
                </div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {taskCounts.completed}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
