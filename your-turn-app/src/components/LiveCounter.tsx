'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

export default function LiveCounter() {
  const [count, setCount] = useState(0)
  const [displayCount, setDisplayCount] = useState(0)

  useEffect(() => {
    // Fetch initial count
    const fetchCount = async () => {
      try {
        const response = await fetch('/api/subscribers')
        const data = await response.json()
        
        if (response.ok) {
          setCount(data.count || 0)
        } else {
          throw new Error('Failed to fetch count')
        }
      } catch (error) {
        console.error('Error fetching count:', error)
        // Fallback to a demo count
        setCount(127)
      }
    }

    fetchCount()

    // Subscribe to real-time changes
    const channel = supabase
      .channel('subscribers-count')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'subscribers' },
        () => {
          setCount(prev => prev + 1)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // Animate count up
  useEffect(() => {
    if (count > displayCount) {
      const timer = setTimeout(() => {
        setDisplayCount(prev => Math.min(prev + 1, count))
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [count, displayCount])

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <motion.div
            key={displayCount}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-5xl md:text-6xl font-bold text-orange-500 mb-4"
          >
            {displayCount.toLocaleString()}
          </motion.div>
          <p className="text-xl text-charcoal/70">
            Join <span className="font-semibold text-charcoal">{displayCount.toLocaleString()}</span> others already taking action
          </p>
        </motion.div>
      </div>
    </section>
  )
}

