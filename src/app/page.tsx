import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, Plus, BarChart3, Clock, ArrowRight } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: <Plus className="w-8 h-8" />,
      title: 'Create Tasks',
      description: '素早く新しいタスクを追加しましょう。',
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Track Progress',
      description: 'タスクの進捗を簡単に追跡できます。',
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Analytics',
      description: 'タスクのパフォーマンスを分析し、改善点を見つけましょう。',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Due Dates',
      description: 'タスクに締切を設定して、期限を守りましょう。',
    },
  ]

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Task Management
            <span className="block text-blue-600">CTL Training</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Next.js + TypeScript + TailwindCSS + shadcn/UI + AWS Amplify
            <br />
            上記の技術スタックを使用したタスク管理アプリケーションです。
          </p>
          <Button
            asChild
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Link href="/dashboard">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow duration-200"
            >
              <CardContent className="p-6 text-center">
                <div className="text-blue-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Demo Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            さぁ、準備はいいですか？
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            このアプリケーションは、タスク管理を簡単にし、あなたの生産性を向上させるために設計されています。
            <br />
            さあ、ダッシュボードにアクセスして、タスクを管理しましょう！
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="hover:bg-blue-50"
            >
              <Link href="/dashboard/new">Create Your First Task</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
