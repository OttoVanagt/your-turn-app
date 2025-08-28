'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const challenges = [
  {
    title: 'Run 7km under 35min',
    category: 'Fitness',
    difficulty: 'Medium',
    color: 'from-red-500 to-pink-500'
  },
  {
    title: 'Eat 100g protein today',
    category: 'Healthy Eating',
    difficulty: 'Easy',
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Build an AI website in 24h',
    category: 'Tech',
    difficulty: 'Hard',
    color: 'from-blue-500 to-purple-500'
  },
  {
    title: 'Read 10 pages a day',
    category: 'Learning',
    difficulty: 'Easy',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    title: 'Sketch for 10 minutes',
    category: 'Creativity',
    difficulty: 'Easy',
    color: 'from-purple-500 to-pink-500'
  }
]

export default function ChallengeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % challenges.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % challenges.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + challenges.length) % challenges.length)
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
            Example Challenges
          </h2>
          <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
            Get inspired by these sample challenges across different categories
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`bg-gradient-to-r ${challenges[currentIndex].color} p-8 md:p-12 text-white relative`}
              >
                <div className="text-center">
                  <div className="inline-block bg-white/20 rounded-full px-4 py-2 mb-4">
                    <span className="text-sm font-medium">{challenges[currentIndex].category}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">
                    {challenges[currentIndex].title}
                  </h3>
                  <div className="inline-block bg-white/20 rounded-full px-4 py-2">
                    <span className="text-sm font-medium">
                      Difficulty: {challenges[currentIndex].difficulty}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-charcoal" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-charcoal" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {challenges.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-orange-500 scale-125' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

