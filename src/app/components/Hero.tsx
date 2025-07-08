import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
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
  )
}
