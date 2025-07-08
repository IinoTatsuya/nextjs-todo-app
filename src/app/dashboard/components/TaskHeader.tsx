import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function TaskHeader() {
  return (
    <Button asChild variant="ghost" className="hover:bg-white/80">
      <Link href="/dashboard">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>
    </Button>
  )
}
