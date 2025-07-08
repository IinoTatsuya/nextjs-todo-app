'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signOut } from 'aws-amplify/auth'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DashboardHeader() {
  const router = useRouter()

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Task Dashboard
          </h1>
          <p className="text-gray-600">
            あなたのタスクを管理し、生産性を向上させるためのダッシュボードです。
          </p>
        </div>
        <div>
          <Button
            asChild
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Link href="/dashboard/new">
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="text-gray-500 hover:text-gray-700"
            onClick={() => {
              signOut()
                .then(() => {
                  router.push('/')
                })
                .catch((error) => {
                  console.error('Sign out error:', error)
                })
            }}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}
