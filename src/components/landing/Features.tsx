import React from "react";
import { Lightbulb, Zap, Shield, Sparkles } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Lightbulb className="h-10 w-10 text-primary" />,
      title: "AI-Powered Ideas",
      description:
        "Leverage multiple AI models to generate diverse and innovative SaaS business ideas tailored to your preferences.",
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Instant Results",
      description:
        "Get multiple business ideas in seconds, complete with descriptions and market potential analysis.",
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Privacy First",
      description:
        "Your data stays on your device. We don't store any of your information or API keys on our servers.",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary" />,
      title: "Multiple AI Services",
      description:
        "Connect with OpenAI, Google Gemini, Anthropic Claude, and more to get diverse perspectives on your business ideas.",
    },
  ];

  return (
    <div className="py-12 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">
            Powerful Features
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to generate your next big SaaS idea
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm border"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
