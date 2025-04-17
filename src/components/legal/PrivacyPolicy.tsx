import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Data Collection</h2>
              <p className="text-muted-foreground">
                The SaaS Idea Generator is designed with privacy as a core
                principle. We do not collect, store, or process any personal
                data on our servers. All processing occurs locally in your
                browser.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. API Keys</h2>
              <p className="text-muted-foreground">
                Any API keys you provide for third-party AI services are stored
                exclusively in your browser's local storage. These keys never
                leave your device and are not transmitted to our servers. You
                can clear this data at any time by clearing your browser's local
                storage or using the clear button in the API settings panel.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                3. Generated Content
              </h2>
              <p className="text-muted-foreground">
                The ideas and content generated through our service are not
                stored on our servers. Any data you input (such as industry
                preferences or target markets) is processed locally and sent
                directly to the third-party AI services you've configured. We do
                not have access to this data or the results generated.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                4. Third-Party Services
              </h2>
              <p className="text-muted-foreground">
                When you use our application with your API keys, you are
                directly interacting with third-party AI services (such as
                OpenAI, Google Gemini, Anthropic Claude, etc.). Please refer to
                the privacy policies of these services to understand how they
                handle your data. We have no control over and assume no
                responsibility for the content, privacy policies, or practices
                of any third-party services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                5. Analytics and Cookies
              </h2>
              <p className="text-muted-foreground">
                Our website does not use cookies or any analytics services that
                track user behavior. We prioritize your privacy and do not
                implement any tracking mechanisms.
              </p>
            </section>
          </div>

          <div className="mt-12">
            <Link to="/" className="text-primary hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
