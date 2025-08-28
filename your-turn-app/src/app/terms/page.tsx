export default function Terms() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-charcoal mb-8">Terms of Service</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-charcoal/70 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal mb-4">Acceptance of Terms</h2>
            <p className="text-charcoal/70 mb-4">
              By accessing and using Your Turn, you accept and agree to be bound by the terms 
              and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal mb-4">Use License</h2>
            <p className="text-charcoal/70 mb-4">
              Permission is granted to temporarily use Your Turn for personal, non-commercial 
              transitory viewing only.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal mb-4">Disclaimer</h2>
            <p className="text-charcoal/70 mb-4">
              The materials on Your Turn are provided on an &apos;as is&apos; basis. Your Turn makes no 
              warranties, expressed or implied, and hereby disclaims and negates all other warranties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal mb-4">Contact Information</h2>
            <p className="text-charcoal/70">
              If you have any questions about these Terms of Service, please contact us at legal@yourturn.app
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

