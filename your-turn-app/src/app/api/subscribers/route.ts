import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, firstName, interests, consent, referralCode } = body

    // Validate required fields
    if (!email || !consent) {
      return NextResponse.json(
        { error: 'Email and consent are required' },
        { status: 400 }
      )
    }

    // Insert subscriber
    const { data, error } = await supabase
      .from('subscribers')
      .insert([
        {
          email,
          firstName: firstName || null,
          interests: interests || [],
          consent,
          referralCode: referralCode || null,
          createdAt: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: "You're already on the list!" },
          { status: 409 }
        )
      }
      throw error
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error creating subscriber:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { count, error } = await supabase
      .from('subscribers')
      .select('*', { count: 'exact', head: true })

    if (error) {
      throw error
    }

    return NextResponse.json({ count: count || 0 })
  } catch (error) {
    console.error('Error fetching subscriber count:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

