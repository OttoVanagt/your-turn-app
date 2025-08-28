export default function Privacy() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-charcoal mb-8">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-charcoal/70 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal mb-4">Information We Collect</h2>
            <p className="text-charcoal/70 mb-4">
              We collect information you provide directly to us, such as when you create an account, 
              subscribe to our newsletter, or contact us for support.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal mb-4">How We Use Your Information</h2>
            <p className="text-charcoal/70 mb-4">
              We use the information we collect to provide, maintain, and improve our services, 
              communicate with you, and comply with legal obligations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal mb-4">Information Sharing</h2>
            <p className="text-charcoal/70 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as described in this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal mb-4">Contact Us</h2>
            <p className="text-charcoal/70">
              If you have any questions about this Privacy Policy, please contact us at privacy@yourturn.app
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

