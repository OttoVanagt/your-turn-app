'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import confetti from 'canvas-confetti'
import { Check, X } from 'lucide-react'

const interests = [
  'Fitness',
  'Tech',
  'Healthy Eating',
  'Learning',
  'Creativity'
]

export default function WaitlistForm() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    interests: [] as string[],
    consent: false
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const generateReferralCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.consent) {
      setStatus('error')
      setErrorMessage('Please fill in required fields and accept terms')
      return
    }

    setStatus('loading')

    try {
      const referralCode = generateReferralCode()
      
      const response = await fetch('/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName || null,
          interests: formData.interests,
          consent: formData.consent,
          referralCode: referralCode
        })
      })

      const result = await response.json()

      if (!response.ok) {
        if (response.status === 409) {
          setStatus('error')
          setErrorMessage("You're already on the list!")
        } else {
          throw new Error(result.error || 'Something went wrong')
        }
      } else {
        setStatus('success')
        // Trigger confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
      }
    } catch (error) {
      console.error('Error:', error)
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 bg-mint-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-3xl font-bold text-charcoal mb-4">Welcome aboard!</h3>
        <p className="text-xl text-charcoal/70 mb-8">
          You&apos;re now on the waitlist. We&apos;ll notify you when Your Turn launches!
        </p>
        <div className="bg-gray-100 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-sm text-charcoal/70 mb-2">Share your referral link:</p>
          <p className="font-mono text-sm bg-white p-2 rounded border">
            {typeof window !== 'undefined' ? window.location.origin : ''}?ref={formData.email.split('@')[0]}
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <section id="waitlist" className="py-20 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
            Join the Waitlist
          </h2>
          <p className="text-xl text-charcoal/70">
            Be the first to know when Your Turn launches
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-charcoal mb-2">
                First Name (Optional)
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                placeholder="Your first name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-3">
                Interests (Select all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      formData.interests.includes(interest)
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="consent"
                checked={formData.consent}
                onChange={(e) => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
                className="mt-1 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              />
              <label htmlFor="consent" className="text-sm text-charcoal/70">
                I agree to receive updates about Your Turn and accept the{' '}
                <a href="/terms" className="text-orange-500 hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="/privacy" className="text-orange-500 hover:underline">Privacy Policy</a>
              </label>
            </div>

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg"
              >
                <X className="w-5 h-5" />
                <span className="text-sm">{errorMessage}</span>
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 text-lg font-semibold rounded-lg transition-all duration-300 disabled:opacity-50"
            >
              {status === 'loading' ? 'Joining...' : 'Join the Waitlist'}
            </Button>
          </div>
        </motion.form>
      </div>
    </section>
  )
}

