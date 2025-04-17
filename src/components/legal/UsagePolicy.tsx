import React from "react";
import { Link } from "react-router-dom";

const UsagePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Usage Policy</h1>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Acceptable Use</h2>
              <p className="text-muted-foreground">
                The SaaS Idea Generator is provided for ideation and inspiration
                purposes only. Users agree to use the service responsibly and in
                compliance with all applicable laws and regulations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. API Key Usage</h2>
              <p className="text-muted-foreground">
                Users are responsible for managing their own API keys for
                third-party AI services. We do not store your API keys on our
                servers. All API calls are made directly from your browser to
                the respective AI service providers. Users are responsible for
                any costs associated with their API usage according to the terms
                of the respective AI service providers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                3. Generated Content
              </h2>
              <p className="text-muted-foreground">
                Ideas generated through our service are provided "as is" without
                any warranties regarding their originality, feasibility, or
                market potential. Users are responsible for evaluating and
                validating any ideas before implementation. We do not claim
                ownership of any ideas generated through our service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                4. Service Limitations
              </h2>
              <p className="text-muted-foreground">
                The SaaS Idea Generator is subject to the limitations of the
                underlying AI models and services. We do not guarantee
                continuous availability of the service or specific AI providers.
                The service may be updated, modified, or discontinued at any
                time without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Disclaimer</h2>
              <p className="text-muted-foreground">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT
                WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE
                FULLEST EXTENT PERMISSIBLE PURSUANT TO APPLICABLE LAW, WE
                DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT
                LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
                FOR A PARTICULAR PURPOSE.
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

export default UsagePolicy;
