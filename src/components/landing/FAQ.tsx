import React from "react";
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
    <div className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about the SaaS Idea Generator
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
