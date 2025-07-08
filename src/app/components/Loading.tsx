export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full animate-spin">
          <span className="text-4xl">⏳</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          読み込み中...
        </h2>
        <p className="text-gray-600">しばらくお待ちください。</p>
      </div>
    </div>
  )
}
