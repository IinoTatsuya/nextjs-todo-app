import TaskHeader from '@/app/dashboard/components/TaskHeader'

export default function TaskIdLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main>
      <div className="max-w-4xl mx-auto mt-8 mb-4">
        <TaskHeader />
      </div>
      {children}
    </main>
  )
}
