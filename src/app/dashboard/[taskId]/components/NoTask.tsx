import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function NoTask() {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-4xl">🔍</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          タスクが見つかりませんでした
        </h2>
        <p className="text-gray-600 mb-4">
          指定されたタスクIDに該当するタスクが存在しません。
          <br />
          タスクが削除されたか、IDが間違っている可能性があります。
        </p>
        <Button asChild>
          <Link href="/dashboard">
            <ArrowLeft className="w-4 h-4 mr-2" />
            ダッシュボードに戻る
          </Link>
        </Button>
      </div>
    </div>
  )
}
