import { Problems } from '@/components/sections/Problems'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Pricing } from '@/components/sections/Pricing'
import { Footer } from '@/components/sections/Footer'
import LandingHero from '@/components/sections/LandingHero'

export default function Home() {
  return (
      <main>
      <LandingHero />
        <Problems />
        <HowItWorks />
        <Pricing />
        <Footer />
      </main>
  )
}
