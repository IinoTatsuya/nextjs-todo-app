'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Calendar, Clock } from 'lucide-react'
import { formatDate } from '@/lib/task-utils'
import { Task } from '@/types/task'
import { FormData } from '@/types/form-data'

type SidebarProps = {
  task: Task
  formData: FormData
  setFormData: (data: FormData) => void
}

export default function Sidebar({ task, formData, setFormData }: SidebarProps) {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg">タスク情報</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>作成日: {formatDate(task.createdAt)}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>更新日: {formatDate(task.updatedAt)}</span>
          </div>
          <Separator />
          <div className="text-sm text-gray-600">
            <p className="font-medium mb-1">Task ID</p>
            <p className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
              {task.id}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => setFormData({ ...formData, status: 'inProgress' })}
            disabled={formData.status === 'inProgress'}
          >
            🔄 In Progressにする
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => setFormData({ ...formData, status: 'completed' })}
            disabled={formData.status === 'completed'}
          >
            ✅ 完了にする
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() =>
              setFormData({
                ...formData,
                dueDate: new Date().toISOString().split('T')[0],
              })
            }
          >
            📅 対応期限を今日にする
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
