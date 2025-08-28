import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import ChallengeCarousel from '@/components/ChallengeCarousel'
import WaitlistForm from '@/components/WaitlistForm'
import LiveCounter from '@/components/LiveCounter'
import CallToAction from '@/components/CallToAction'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <HowItWorks />
      <ChallengeCarousel />
      <LiveCounter />
      <WaitlistForm />
      <CallToAction />
    </main>
  )
}
