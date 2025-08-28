'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function CallToAction() {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist')
    waitlistSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-orange-500 to-orange-600">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            It&apos;s{' '}
            <span className="relative">
              Your Turn
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
                className="absolute bottom-0 left-0 right-0 h-2 bg-mint-500 origin-left"
              />
            </span>
          </h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Button
              onClick={scrollToWaitlist}
              size="lg"
              className="bg-white text-orange-500 hover:bg-gray-100 px-12 py-6 text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Join Now
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

