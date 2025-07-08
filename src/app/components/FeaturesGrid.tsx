import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, Plus, BarChart3, Clock } from 'lucide-react'

type Feature = {
  icon: React.ReactNode
  title: string
  description: string
}

type FeaturesCardProps = {
  feature: Feature
}

const FeaturesCard = ({ feature }: FeaturesCardProps) => (
  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow duration-200">
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
)

export default function FeaturesGrid() {
  const features: Feature[] = [
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      <h2 className="col-span-full text-center text-3xl font-bold text-gray-900 mb-6">
        一つのアプリで全てのタスクを管理
      </h2>
      {features.map((feature, index) => (
        <FeaturesCard key={index} feature={feature} />
      ))}
    </div>
  )
}
