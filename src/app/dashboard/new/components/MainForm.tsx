'use client'

import { useRouter } from 'next/navigation'
import { TaskStatus } from '@/types/task'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Plus } from 'lucide-react'
import { FormData } from '@/types/form-data'

type MainFormProps = {
  formData: FormData
  setFormData: (data: FormData) => void
  handleCreate: () => void
  isCreating: boolean
}

export default function MainForm({
  formData,
  setFormData,
  handleCreate,
  isCreating,
}: MainFormProps) {
  const router = useRouter()

  return (
    <div className="lg:col-span-2">
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>タスク内容</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">タイトル *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter task title"
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">説明</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter task description"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate">対応期限</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">初期ステータス</Label>
              <Select
                value={formData.status}
                onValueChange={(value: TaskStatus) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">
                    <div className="flex items-center space-x-2">
                      <span>⏳</span>
                      <span>Todo</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="inProgress">
                    <div className="flex items-center space-x-2">
                      <span>🔄</span>
                      <span>In Progress</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="completed">
                    <div className="flex items-center space-x-2">
                      <span>✅</span>
                      <span>Completed</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => router.push('/dashboard')}>
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!formData.title.trim() || isCreating}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isCreating ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Creating...</span>
                </div>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Task
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
