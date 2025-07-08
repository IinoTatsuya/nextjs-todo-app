'use client'

import { useRouter } from 'next/navigation'
import { updateTask, deleteTask } from '@/lib/task-data'
import { Task, TaskStatus } from '@/types/task'
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Save, Trash2 } from 'lucide-react'
import { FormData } from '@/types/form-data'

type MainContentProps = {
  task: Task | null
  setTask: (task: Task | null) => void
  isLoading: boolean
  isSaving: boolean
  setIsSaving: (isSaving: boolean) => void
  formData: FormData
  setFormData: (data: FormData) => void
}

export default function MainContent(props: MainContentProps) {
  const {
    task,
    setTask,
    isLoading,
    isSaving,
    setIsSaving,
    formData,
    setFormData,
  } = props
  const router = useRouter()

  const handleSave = async () => {
    if (!task) return

    setIsSaving(true)
    try {
      const updatedTask = await updateTask(task.id, {
        title: formData.title,
        description: formData.description || undefined,
        dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
        status: formData.status,
      })

      if (updatedTask) {
        setTask(updatedTask)
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Error updating task:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!task) return

    const success = await deleteTask(task.id)
    if (success) {
      router.push('/dashboard')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">削除中..</p>
        </div>
      </div>
    )
  }

  return (
    <div className="lg:col-span-2">
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>タスクを編集する</span>
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
              <Label htmlFor="status">ステータス</Label>
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

          <div className="flex justify-between pt-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  タスクの削除
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
                  <AlertDialogDescription>
                    このタスクを削除すると、元に戻すことはできません。
                    <br />
                    削除する前に、必要な情報をバックアップしてください。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>キャンセル</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    削除
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button
              onClick={handleSave}
              disabled={!formData.title.trim() || isSaving}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSaving ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>保存中...</span>
                </div>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  変更を保存
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
