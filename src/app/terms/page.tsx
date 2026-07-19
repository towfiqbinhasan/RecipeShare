export default function TermsPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-white px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-gray-400 text-sm mb-8">Last updated: July 2026</p>

        <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Account Usage</h2>
            <p>By creating an account, you confirm that the information you provide is accurate, and you are responsible for the security of your account.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">2. Content Policy</h2>
            <p>You are responsible for any recipe or review you post. Posting offensive, false, or copyrighted content is prohibited.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">3. Recipe Ownership</h2>
            <p>You retain ownership of any recipe you post. You may delete your own recipes at any time from the 'Manage Recipes' page.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">4. Changes to the Service</h2>
            <p>We reserve the right to change or discontinue platform features at any time, with prior notice when possible.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">5. Liability</h2>
            <p>RecipeShare does not guarantee the health or nutritional accuracy of user-submitted recipes. Use recipes at your own discretion.</p>
          </section>
        </div>
      </div>
    </main>
  );
}