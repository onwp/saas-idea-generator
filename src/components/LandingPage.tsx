import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Sparkles } from "lucide-react";
import Features from "./landing/Features";
import FAQ from "./landing/FAQ";
import Footer from "./landing/Footer";
import Home from "./home";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="w-full py-4 px-6 border-b bg-card shadow-sm">
        <div className="container mx-auto flex justify-center items-center">
          <div className="flex items-center space-x-2">
            <Lightbulb className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Evreka
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section with App */}
      <section className="pt-16 md:pt-24 lg:pt-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 md:px-6 relative z-10"
        >
          <div className="flex flex-col items-center space-y-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4 mr-2" />
                <span>AI-Powered Idea Generation</span>
              </div>

              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                Generate Your Next
                <span className="block text-primary">AI-based SaaS Idea</span>
              </h1>

              <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl">
                Use AI to brainstorm innovative SaaS business ideas tailored to
                your interests and market needs. Connect multiple AI services
                for diverse perspectives.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="w-full max-w-full mx-auto mt-12"
            >
              {/* Integrated App */}
              <div className="w-full">
                <Home hideHeader={true} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="scroll-mt-20">
        <Features />
      </section>

      {/* FAQ Section */}
      <section id="faq" className="scroll-mt-20">
        <FAQ />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
