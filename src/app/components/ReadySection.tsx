import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ReadySection() {
  return (
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
  )
}
