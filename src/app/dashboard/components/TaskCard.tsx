'use client'

import { Task } from '@/types/task'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  getStatusColor,
  getStatusIcon,
  getStatusLabel,
  formatDate,
  isOverdue,
} from '@/lib/task-utils'
import { Calendar, Clock, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  const statusColor = getStatusColor(task.status)
  const statusIcon = getStatusIcon(task.status)
  const statusLabel = getStatusLabel(task.status)
  const overdue = isOverdue(task.dueDate)

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-blue-500 hover:border-l-blue-600">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{statusIcon}</span>
            <Badge className={cn('text-xs font-medium', statusColor)}>
              {statusLabel}
            </Badge>
          </div>
          {task.dueDate && (
            <div
              className={cn(
                'flex items-center space-x-1 text-sm',
                overdue ? 'text-red-600' : 'text-gray-500',
              )}
            >
              <Calendar className="w-3 h-3" />
              <span>{formatDate(task.dueDate)}</span>
              {overdue && (
                <span className="text-red-600 font-medium">期限切れ</span>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {task.description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>Updated {formatDate(task.updatedAt)}</span>
              </div>
              {task.description && (
                <div className="flex items-center space-x-1">
                  <FileText className="w-3 h-3" />
                  <span>Has description</span>
                </div>
              )}
            </div>

            <Button
              size="sm"
              variant="ghost"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Edit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
