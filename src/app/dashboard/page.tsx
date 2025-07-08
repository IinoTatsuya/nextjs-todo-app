'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getTasks } from '@/lib/task-data'
import { filterTasks, sortTasksByDueDate } from '@/lib/task-utils'
import { TaskCard } from '@/app/dashboard/components/TaskCard'
import { TaskFilter } from '@/app/dashboard/components/TaskFilter'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, LayoutGrid, List } from 'lucide-react'
import { Task } from '@/types/task'

export default function Dashboard() {
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [currentFilter, setCurrentFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks()
      setTasks(fetchedTasks)
    }
    fetchTasks()
  }, [])

  const filteredTasks = useMemo(() => {
    let filtered = filterTasks(tasks, currentFilter)

    if (searchQuery) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    return sortTasksByDueDate(filtered)
  }, [tasks, currentFilter, searchQuery])

  const taskCounts = useMemo(
    () => ({
      all: tasks.length,
      todo: tasks.filter((t) => t.status === 'todo').length,
      inProgress: tasks.filter((t) => t.status === 'inProgress').length,
      completed: tasks.filter((t) => t.status === 'completed').length,
    }),
    [tasks],
  )

  const handleEditTask = (taskId: string) => {
    router.push(`/dashboard/${taskId}`)
  }

  const handleCreateTask = () => {
    router.push('/dashboard/new')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
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
            <Button
              onClick={handleCreateTask}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
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
                  {taskCounts['inProgress']}
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
