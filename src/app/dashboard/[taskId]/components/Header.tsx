import { Badge } from '@/components/ui/badge'
import { getStatusColor, getStatusIcon, getStatusLabel } from '@/lib/task-utils'
import { cn } from '@/lib/utils'
import { Task } from '@/types/task'

type HeaderProps = {
  task: Task
}

export default function Header({ task }: HeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">タスクの詳細</h1>
        <p className="text-gray-600">
          タスクの詳細を編集して、プロジェクトを管理しましょう。
          <br />
          必須項目には「*」が付いています。
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Badge className={cn('text-sm', getStatusColor(task.status))}>
          {getStatusIcon(task.status)} {getStatusLabel(task.status)}
        </Badge>
      </div>
    </div>
  )
}
