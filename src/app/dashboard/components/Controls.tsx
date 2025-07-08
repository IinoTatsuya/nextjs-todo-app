'use client'

import { Search, LayoutGrid, List } from 'lucide-react'
import { TaskFilter } from '@/app/dashboard/components/TaskFilter'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type ControlsProps = {
  searchQuery: string
  setSearchQuery: (query: string) => void
  viewMode: 'grid' | 'list'
  setViewMode: (mode: 'grid' | 'list') => void
  currentFilter: string
  setCurrentFilter: (filter: string) => void
  taskCounts: {
    all: number
    todo: number
    inProgress: number
    completed: number
  }
}

export default function Controls(props: ControlsProps) {
  const {
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    currentFilter,
    setCurrentFilter,
    taskCounts,
  } = props

  return (
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
  )
}
