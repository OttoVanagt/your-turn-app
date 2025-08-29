Your Turn - Challenge-Based Goal App
A motivational platform that helps people achieve their goals by turning them into competitive challenges. Users are matched with friends or like-minded people, then receive personalized challenges across fitness, learning, healthy eating, creativity, and more.

Features
Dynamic Landing Page: Animated hero section with gradient backgrounds
Interactive Components: Challenge carousel, waitlist form with animations
Real-time Updates: Live subscriber counter with Supabase integration
Admin Dashboard: Password-protected admin panel for managing subscribers
Responsive Design: Mobile-first design with Tailwind CSS
Modern Stack: Next.js 15, TypeScript, Framer Motion, Supabase
Tech Stack
Framework: Next.js 15 (App Router, TypeScript)
Styling: Tailwind CSS + custom animations
Animations: Framer Motion + Canvas Confetti
Database: Supabase
Icons: Lucide React
Deployment: Vercel-ready
Setup Instructions
1. Environment Variables
Create a .env.local file in the root directory:

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Admin Configuration
ADMIN_TOKEN=your_admin_token_here
2. Supabase Database Setup
Create a subscribers table in your Supabase database:

CREATE TABLE subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  firstName VARCHAR(255),
  interests TEXT[] DEFAULT '{}',
  consent BOOLEAN NOT NULL DEFAULT false,
  referralCode VARCHAR(10),
  referredBy VARCHAR(255),
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous inserts
CREATE POLICY "Allow anonymous inserts" ON subscribers
  FOR INSERT TO anon
  WITH CHECK (email IS NOT NULL AND consent = true);

-- Create policy for anonymous reads (for counting)
CREATE POLICY "Allow anonymous reads" ON subscribers
  FOR SELECT TO anon
  USING (true);
3. Install Dependencies
npm install
4. Run Development Server
npm run dev
Open http://localhost:3000 to view the application.

Project Structure
src/
├── app/
│   ├── admin/          # Admin dashboard
│   ├── api/            # API routes
│   ├── privacy/        # Privacy policy page
│   ├── terms/          # Terms of service page
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/
│   ├── ui/             # UI components
│   ├── Hero.tsx        # Hero section
│   ├── HowItWorks.tsx  # How it works section
│   ├── ChallengeCarousel.tsx  # Challenge examples
│   ├── WaitlistForm.tsx       # Waitlist signup form
│   ├── LiveCounter.tsx        # Live subscriber counter
│   └── CallToAction.tsx       # Final CTA section
└── lib/
    ├── supabase.ts     # Supabase client
    └── utils.ts        # Utility functions
Key Features
Animations
Framer Motion entrance animations
Gradient background animations
Confetti celebration on signup
Smooth scroll and reveal effects
Database Integration
Supabase for real-time data
Subscriber management
Real-time counter updates
Admin dashboard with export functionality
Design System
Custom color palette (Orange #FF5A1F, Mint #00C896, Charcoal #111111)
Consistent typography and spacing
Mobile-first responsive design
Hover effects and micro-interactions
Deployment
This project is optimized for Vercel deployment:

Push to GitHub
Connect to Vercel
Add environment variables in Vercel dashboard
Deploy
Admin Access
Access the admin dashboard at /admin with the password set in your ADMIN_TOKEN environment variable.

License
MIT License - see LICENSE file for details.
