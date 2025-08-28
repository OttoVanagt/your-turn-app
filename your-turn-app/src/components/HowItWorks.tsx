'use client'

import { motion } from 'framer-motion'
import { Users, Target, Trophy } from 'lucide-react'

const steps = [
  {
    icon: Users,
    title: 'Match',
    description: 'Get matched with friends or like-minded people who share your goals and ambitions.'
  },
  {
    icon: Target,
    title: 'Challenge',
    description: 'Receive personalized challenges tailored to your interests and skill level.'
  },
  {
    icon: Trophy,
    title: 'Win',
    description: 'Complete challenges first to earn recognition, points, and achievements.'
  }
]

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
            How It Works
          </h2>
          <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
            Three simple steps to turn your goals into exciting challenges
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-4 text-center">
                {step.title}
              </h3>
              <p className="text-charcoal/70 text-center leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

