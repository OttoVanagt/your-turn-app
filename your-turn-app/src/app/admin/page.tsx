'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Subscriber } from '@/lib/supabase'

export default function Admin() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const authenticate = () => {
    // Simple password check - in production, use proper authentication
    if (password === process.env.NEXT_PUBLIC_ADMIN_TOKEN || password === 'admin123') {
      setAuthenticated(true)
      fetchSubscribers()
    } else {
      alert('Invalid password')
    }
  }

  const fetchSubscribers = async () => {
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .select('*')
        .order('createdAt', { ascending: false })

      if (error) throw error
      setSubscribers(data || [])
    } catch (error) {
      console.error('Error fetching subscribers:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = () => {
    const headers = ['Email', 'First Name', 'Interests', 'Created At']
    const csvContent = [
      headers.join(','),
      ...subscribers.map(sub => [
        sub.email,
        sub.firstName || '',
        sub.interests.join(';'),
        new Date(sub.createdAt).toLocaleDateString()
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'subscribers.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const filteredSubscribers = subscribers.filter(sub =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (sub.firstName && sub.firstName.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-charcoal mb-6 text-center">Admin Access</h1>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && authenticate()}
            />
            <Button
              onClick={authenticate}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-charcoal">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-charcoal">Admin Dashboard</h1>
            <Button
              onClick={exportToCSV}
              className="bg-mint-500 hover:bg-mint-600 text-white"
            >
              Export CSV
            </Button>
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search subscribers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-2xl font-bold text-charcoal">
              Total Subscribers: {subscribers.length}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left text-charcoal font-semibold">Email</th>
                  <th className="px-4 py-3 text-left text-charcoal font-semibold">Name</th>
                  <th className="px-4 py-3 text-left text-charcoal font-semibold">Interests</th>
                  <th className="px-4 py-3 text-left text-charcoal font-semibold">Created</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscribers.map((subscriber, index) => (
                  <tr
                    key={subscriber.id}
                    className={`border-b hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                  >
                    <td className="px-4 py-3 text-charcoal">{subscriber.email}</td>
                    <td className="px-4 py-3 text-charcoal">{subscriber.firstName || '-'}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {subscriber.interests.map((interest) => (
                          <span
                            key={interest}
                            className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-charcoal text-sm">
                      {new Date(subscriber.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSubscribers.length === 0 && (
            <div className="text-center py-8 text-charcoal/70">
              No subscribers found.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

