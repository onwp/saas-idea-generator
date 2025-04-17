import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Save, Eye, EyeOff } from "lucide-react";

export interface ApiKeys {
  openai: string;
  gemini: string;
  anthropic: string;
  perplexity: string;
  deepseek: string;
  grok: string;
}

interface ApiKeySettingsProps {
  onSave?: (keys: ApiKeys) => void;
}

const ApiKeySettings = ({ onSave = () => {} }: ApiKeySettingsProps) => {
  const [apiKeys, setApiKeys] = useState<ApiKeys>({
    openai: "",
    gemini: "",
    anthropic: "",
    perplexity: "",
    deepseek: "",
    grok: "",
  });

  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({
    openai: false,
    gemini: false,
    anthropic: false,
    perplexity: false,
    deepseek: false,
    grok: false,
  });

  // Load API keys from localStorage on component mount
  useEffect(() => {
    const savedKeys: Partial<ApiKeys> = {};
    Object.keys(apiKeys).forEach((key) => {
      const savedKey = localStorage.getItem(`apiKey_${key}`);
      if (savedKey) {
        savedKeys[key as keyof ApiKeys] = savedKey;
      }
    });
    setApiKeys((prev) => ({ ...prev, ...savedKeys }));
  }, []);

  const handleInputChange = (key: keyof ApiKeys, value: string) => {
    setApiKeys((prev) => ({ ...prev, [key]: value }));
  };

  const toggleShowKey = (key: keyof ApiKeys) => {
    setShowKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    // Save API keys to localStorage
    Object.entries(apiKeys).forEach(([key, value]) => {
      if (value) {
        localStorage.setItem(`apiKey_${key}`, value);
      }
    });
    onSave(apiKeys);
  };

  const apiProviders = [
    { key: "openai" as const, label: "OpenAI" },
    { key: "gemini" as const, label: "Google Gemini" },
    { key: "anthropic" as const, label: "Anthropic Claude" },
    { key: "perplexity" as const, label: "Perplexity" },
    { key: "deepseek" as const, label: "DeepSeek" },
    { key: "grok" as const, label: "Grok" },
  ];

  return (
    <Card className="w-full bg-card">
      <CardHeader>
        <CardTitle>AI Service API Keys</CardTitle>
        <CardDescription>
          Enter your API keys for the AI services you want to use. Keys are
          stored securely in your browser's local storage.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {apiProviders.map((provider) => (
          <div key={provider.key} className="space-y-2">
            <Label htmlFor={`apiKey_${provider.key}`}>{provider.label}</Label>
            <div className="flex">
              <Input
                id={`apiKey_${provider.key}`}
                type={showKeys[provider.key] ? "text" : "password"}
                value={apiKeys[provider.key]}
                onChange={(e) =>
                  handleInputChange(provider.key, e.target.value)
                }
                placeholder={`Enter your ${provider.label} API key`}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => toggleShowKey(provider.key)}
                className="ml-2"
              >
                {showKeys[provider.key] ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} className="w-full">
          <Save className="mr-2 h-4 w-4" />
          Save API Keys
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApiKeySettings;
