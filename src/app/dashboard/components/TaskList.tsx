import Link from 'next/link'
import { Plus, Search } from 'lucide-react'
import { TaskCard } from '@/app/dashboard/components/TaskCard'
import { Button } from '@/components/ui/button'
import { Task } from '@/types/task'

type TaskListProps = {
  filteredTasks: Task[]
  searchQuery: string
  viewMode: 'grid' | 'list'
}

export default function TaskList(props: TaskListProps) {
  const { filteredTasks, searchQuery, viewMode } = props

  return (
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
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/dashboard/new">
                <Plus className="w-4 h-4 mr-2" />
                タスクを追加する
              </Link>
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
            <div key={task.id}>
              <Link href={`/dashboard/${task.id}`}>
                <TaskCard task={task} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
