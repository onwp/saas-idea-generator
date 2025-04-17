import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Settings } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface IdeaGeneratorFormProps {
  onGenerateIdeas: (formData: FormData, selectedServices: string[]) => void;
  isLoading?: boolean;
  onOpenSettings?: () => void;
}

interface FormData {
  industry: string;
  targetMarket: string;
  technologies: string;
  additionalNotes: string;
}

const IdeaGeneratorForm = ({
  onGenerateIdeas = () => {},
  isLoading = false,
  onOpenSettings = () => {},
}: IdeaGeneratorFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    industry: "",
    targetMarket: "",
    technologies: "",
    additionalNotes: "",
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([
    "openai",
  ]);

  const industries = [
    { value: "healthcare", label: "Healthcare" },
    { value: "finance", label: "Finance" },
    { value: "education", label: "Education" },
    { value: "ecommerce", label: "E-Commerce" },
    { value: "productivity", label: "Productivity" },
    { value: "entertainment", label: "Entertainment" },
    { value: "social", label: "Social Media" },
    { value: "travel", label: "Travel & Hospitality" },
    { value: "realestate", label: "Real Estate" },
    { value: "other", label: "Other" },
  ];

  const targetMarkets = [
    { value: "b2b", label: "Business to Business (B2B)" },
    { value: "b2c", label: "Business to Consumer (B2C)" },
    { value: "b2g", label: "Business to Government (B2G)" },
    { value: "enterprise", label: "Enterprise" },
    { value: "smb", label: "Small & Medium Business" },
    { value: "startups", label: "Startups" },
    { value: "freelancers", label: "Freelancers & Solopreneurs" },
    { value: "consumers", label: "General Consumers" },
  ];

  const technologies = [
    { value: "ai", label: "Artificial Intelligence" },
    { value: "ml", label: "Machine Learning" },
    { value: "blockchain", label: "Blockchain" },
    { value: "ar", label: "Augmented Reality" },
    { value: "vr", label: "Virtual Reality" },
    { value: "iot", label: "Internet of Things" },
    { value: "mobile", label: "Mobile Apps" },
    { value: "web", label: "Web Applications" },
    { value: "cloud", label: "Cloud Computing" },
    { value: "data", label: "Big Data & Analytics" },
  ];

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateIdeas(formData, selectedServices);
  };

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
  };

  const aiServices = [
    { id: "openai", label: "OpenAI" },
    { id: "gemini", label: "Google Gemini" },
    { id: "anthropic", label: "Anthropic Claude" },
    { id: "perplexity", label: "Perplexity" },
    { id: "deepseek", label: "DeepSeek" },
    { id: "grok", label: "Grok" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-card rounded-xl border shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-center">
          Generate Your SaaS Idea
        </h2>
        <Button variant="outline" size="sm" onClick={onOpenSettings}>
          <Settings className="h-4 w-4 mr-2" />
          API Settings
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="industry">Industry</Label>
            <Select
              value={formData.industry}
              onValueChange={(value) => handleChange("industry", value)}
            >
              <SelectTrigger id="industry" className="w-full">
                <SelectValue placeholder="Select an industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry.value} value={industry.value}>
                    {industry.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="targetMarket">Target Market</Label>
            <Select
              value={formData.targetMarket}
              onValueChange={(value) => handleChange("targetMarket", value)}
            >
              <SelectTrigger id="targetMarket" className="w-full">
                <SelectValue placeholder="Select a target market" />
              </SelectTrigger>
              <SelectContent>
                {targetMarkets.map((market) => (
                  <SelectItem key={market.value} value={market.value}>
                    {market.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="technologies">Preferred Technologies</Label>
            <Select
              value={formData.technologies}
              onValueChange={(value) => handleChange("technologies", value)}
            >
              <SelectTrigger id="technologies" className="w-full">
                <SelectValue placeholder="Select preferred technologies" />
              </SelectTrigger>
              <SelectContent>
                {technologies.map((tech) => (
                  <SelectItem key={tech.value} value={tech.value}>
                    {tech.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
            <Textarea
              id="additionalNotes"
              placeholder="Any specific requirements or preferences?"
              value={formData.additionalNotes}
              onChange={(e) => handleChange("additionalNotes", e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>

          <div>
            <Label className="mb-2 block">Select AI Services</Label>
            <div className="grid grid-cols-2 gap-2">
              {aiServices.map((service) => (
                <div key={service.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`service-${service.id}`}
                    checked={selectedServices.includes(service.id)}
                    onCheckedChange={() => toggleService(service.id)}
                  />
                  <Label
                    htmlFor={`service-${service.id}`}
                    className="cursor-pointer"
                  >
                    {service.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full py-6 text-lg font-medium"
          disabled={
            isLoading ||
            !formData.industry ||
            !formData.targetMarket ||
            !formData.technologies ||
            selectedServices.length === 0
          }
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating Ideas...
            </>
          ) : (
            "Generate SaaS Ideas"
          )}
        </Button>
      </form>
    </div>
  );
};

export default IdeaGeneratorForm;
