'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function Hero() {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist')
    waitlistSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-mint-500/10 to-orange-600/30 animate-gradient-x"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold text-charcoal mb-6"
        >
          Turn words into{' '}
          <span className="text-orange-500 relative">
            action
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute bottom-0 left-0 right-0 h-2 bg-mint-500 origin-left"
            />
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-xl md:text-2xl text-charcoal/80 mb-8 max-w-2xl mx-auto"
        >
          Your Turn challenges you to achieve goals with friends or like-minded people.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <Button
            onClick={scrollToWaitlist}
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Join the Waitlist
          </Button>
        </motion.div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-500/30 rounded-full"
            initial={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1200,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800,
            }}
            animate={{
              y: [null, -100, null],
              x: [null, Math.random() * 100 - 50, null],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </section>
  )
}

