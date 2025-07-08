type TaskCountsProps = {
  taskCounts: {
    all: number
    todo: number
    inProgress: number
    completed: number
  }
}

export default function TaskStats({ taskCounts }: TaskCountsProps) {
  return (
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
  )
}
