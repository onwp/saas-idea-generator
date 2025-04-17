import React from "react";
import { motion } from "framer-motion";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="py-16 md:py-24 lg:py-32 bg-muted/30 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4 mr-2" />
            <span>What We Offer</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Powerful Features
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to generate your next big SaaS idea
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center text-center p-8 bg-card rounded-xl shadow-sm border hover:shadow-md hover:border-primary/20 transition-all duration-300"
            >
              <div className="mb-6 p-3 rounded-full bg-primary/10">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
