'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles } from 'lucide-react'

type QuickTemplateProps = {
  handleQuickCreate: (template: { title: string; description: string }) => void
}

export default function QuickTemplates({
  handleQuickCreate,
}: QuickTemplateProps) {
  const quickTemplates = [
    {
      title: 'チームミーティングのアジェンダ作成',
      description: '次のチームミーティングのアジェンダを作成し、参加者に通知',
    },
    {
      title: 'コードレビューの実施',
      description: 'プルリクエストのコードレビューを行い、フィードバックを提供',
    },
    {
      title: 'ドキュメント更新',
      description: 'プロジェクトのドキュメントを最新の状態に更新',
    },
    {
      title: 'バグ修正',
      description: '報告されたバグを修正し、テストを実施',
    },
  ]

  return (
    <div className="space-y-6">
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
              className="w-full justify-start text-left h-auto p-3 hover:bg-blue-50 whitespace-normal"
              onClick={() => handleQuickCreate(template)}
            >
              <div className="w-full">
                <div className="font-medium break-words whitespace-normal">
                  {template.title}
                </div>
                <div className="text-xs text-gray-500 mt-1 break-words whitespace-normal">
                  {template.description}
                </div>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
