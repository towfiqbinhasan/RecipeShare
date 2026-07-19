export default function PrivacyPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-white px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-8">Last updated: July 2026</p>

        <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Information We Collect</h2>
            <p>We collect your name, email address, and any recipes you create so you can use all the features of our platform.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">2. How We Use Your Information</h2>
            <p>Collected information is used only to manage your account, publish recipes, and improve platform functionality. We never sell your data to third parties.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">3. Password Security</h2>
            <p>Your password is stored in encrypted (hashed) form and is never stored as plain text.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">4. Cookies</h2>
            <p>We use a secure, httpOnly cookie to keep you logged in, which expires after 7 days.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">5. Contact</h2>
            <p>If you have any privacy-related questions, contact us at support@recipeshare.com.</p>
          </section>
        </div>
      </div>
    </main>
  );
}