import Hero from '@/app/components/Hero'
import FeaturesGrid from './components/FeaturesGrid'
import ReadySection from './components/ReadySection'

export default function Home() {
  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <Hero />
        <FeaturesGrid />
        <ReadySection />
      </div>
    </div>
  )
}
