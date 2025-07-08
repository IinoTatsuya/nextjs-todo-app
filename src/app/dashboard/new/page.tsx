'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createTask } from '@/lib/task-data'
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
// import { ArrowLeft, Plus, Sparkles } from 'lucide-react'
import { ArrowLeft, Plus } from 'lucide-react'

export default function NewTaskPage() {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'todo' as TaskStatus,
  })

  const handleCreate = async () => {
    if (!formData.title.trim()) return

    setIsCreating(true)
    try {
      const newTask = await createTask({
        title: formData.title,
        description: formData.description || undefined,
        dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
        status: formData.status,
      })

      if (newTask) {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Error creating task:', error)
    } finally {
      setIsCreating(false)
    }
  }

  // const handleQuickCreate = (template: {
  //   title: string
  //   description: string
  // }) => {
  //   setFormData({
  //     ...formData,
  //     title: template.title,
  //     description: template.description,
  //   })
  // }

  // const quickTemplates = [
  //   {
  //     title: 'チームミーティングのアジェンダ作成',
  //     description: '次のチームミーティングのアジェンダを作成し、参加者に通知',
  //   },
  //   {
  //     title: 'コードレビューの実施',
  //     description: 'プルリクエストのコードレビューを行い、フィードバックを提供',
  //   },
  //   {
  //     title: 'ドキュメント更新',
  //     description: 'プロジェクトのドキュメントを最新の状態に更新',
  //   },
  //   {
  //     title: 'バグ修正',
  //     description: '報告されたバグを修正し、テストを実施',
  //   },
  // ]

  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push('/dashboard')}
            className="mb-4 hover:bg-white/80"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              新しいタスクを追加する
            </h1>
            <p className="text-gray-600">
              タスクの詳細を入力して、プロジェクトを管理しましょう。
              <br />
              必須項目には「*」が付いています。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main Form */}
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
                  <Button
                    variant="outline"
                    onClick={() => router.push('/dashboard')}
                  >
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

          {/* Quick Templates */}
          {/* <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>クイックテンプレート</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickTemplates.map((template, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto p-3 hover:bg-blue-50"
                    onClick={() => handleQuickCreate(template)}
                  >
                    <div>
                      <div className="font-medium">{template.title}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {template.description}
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div> */}
        </div>
      </div>
    </div>
  )
}
