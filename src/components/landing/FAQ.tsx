import React from "react";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How does the SaaS Idea Generator work?",
      answer:
        "Our generator uses multiple AI models to create innovative SaaS business ideas based on your selected industry, target market, and preferred technologies. Simply fill out the form, select which AI services you want to use, and click generate.",
    },
    {
      question: "Do I need to provide my own API keys?",
      answer:
        "Yes, you'll need to provide your own API keys for the AI services you want to use. This ensures your data remains private and gives you full control over which services you use and how much you spend.",
    },
    {
      question: "Where are my API keys stored?",
      answer:
        "Your API keys are stored securely in your browser's local storage. They never leave your device and are not sent to our servers. You can clear them at any time by clearing your browser data.",
    },
    {
      question: "Can I export or save the generated ideas?",
      answer:
        "Currently, you can copy the generated ideas manually. We're working on adding export functionality to save ideas as PDF or CSV files in a future update.",
    },
    {
      question: "Which AI services are supported?",
      answer:
        "We currently support OpenAI (GPT models), Google Gemini, Anthropic Claude, Perplexity, DeepSeek, and Grok. We plan to add more services as they become available.",
    },
    {
      question: "Is there a limit to how many ideas I can generate?",
      answer:
        "The only limits are those imposed by the AI services you're using. Each service has its own rate limits and usage quotas based on your subscription plan with them.",
    },
  ];

  return (
    <div className="py-16 md:py-24 lg:py-32 bg-background relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <HelpCircle className="h-4 w-4 mr-2" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about the SaaS Idea Generator
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto bg-card rounded-xl p-6 border shadow-sm"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
