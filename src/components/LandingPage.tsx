import React from "react";
import { Link } from "react-router-dom";
import Features from "./landing/Features";
import FAQ from "./landing/FAQ";
import Footer from "./landing/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="w-full py-4 px-6 border-b bg-card">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">SaaS Idea Generator</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#features"
              className="text-sm font-medium hover:text-primary"
            >
              Features
            </a>
            <a href="#faq" className="text-sm font-medium hover:text-primary">
              FAQ
            </a>
            <Link to="/app" className="text-sm font-medium hover:text-primary">
              App
            </Link>
          </nav>
          <div>
            <Link
              to="/app"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section with App */}
      <section className="py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Generate Your Next SaaS Idea
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Use AI to brainstorm innovative SaaS business ideas tailored to
                your interests and market needs.
              </p>
            </div>
            <div className="w-full max-w-4xl mx-auto mt-8">
              {/* App will be integrated here */}
              <div className="p-4 border rounded-lg shadow-sm bg-card">
                <p className="text-center text-muted-foreground">
                  App will be loaded here
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features">
        <Features />
      </section>

      {/* FAQ Section */}
      <section id="faq">
        <FAQ />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
