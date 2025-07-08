'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface TaskFilterProps {
  currentFilter: string
  onFilterChange: (filter: string) => void
  taskCounts: {
    all: number
    todo: number
    inProgress: number
    completed: number
  }
}

export function TaskFilter({
  currentFilter,
  onFilterChange,
  taskCounts,
}: TaskFilterProps) {
  const filters = [
    { key: 'all', label: 'All Tasks', count: taskCounts.all },
    { key: 'todo', label: 'Todo', count: taskCounts.todo },
    {
      key: 'inProgress',
      label: 'In Progress',
      count: taskCounts.inProgress,
    },
    { key: 'completed', label: 'Completed', count: taskCounts.completed },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.key}
          variant={currentFilter === filter.key ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange(filter.key)}
          className={cn(
            'transition-all duration-200',
            currentFilter === filter.key
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'hover:bg-gray-50',
          )}
        >
          {filter.label}
          <span
            className={cn(
              'ml-1 px-1.5 py-0.5 rounded-full text-xs',
              currentFilter === filter.key
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700',
            )}
          >
            {filter.count}
          </span>
        </Button>
      ))}
    </div>
  )
}
