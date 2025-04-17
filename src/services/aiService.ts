import { ApiKeys } from "@/components/ApiKeySettings";
import axios from "axios";

export interface IdeaGenerationParams {
  industry: string;
  targetMarket: string;
  technologies: string;
  additionalNotes?: string;
}

export interface GeneratedIdea {
  id: string;
  title: string;
  description: string;
  marketSize: "Small" | "Medium" | "Large";
  difficulty: "Easy" | "Medium" | "Hard";
  isFavorite: boolean;
  source: string; // The AI service that generated this idea
}

export interface GenerationResult {
  ideas: GeneratedIdea[];
  error?: string;
  source: string;
}

// Helper function to generate a unique ID
const generateId = () => {
  return Math.random().toString(36).substring(2, 11);
};

// Rate limiting helper - keeps track of API calls
const rateLimits: Record<string, { lastCall: number; count: number }> = {
  openai: { lastCall: 0, count: 0 },
  gemini: { lastCall: 0, count: 0 },
  anthropic: { lastCall: 0, count: 0 },
  perplexity: { lastCall: 0, count: 0 },
  deepseek: { lastCall: 0, count: 0 },
  grok: { lastCall: 0, count: 0 },
};

// Check rate limit before making API call
const checkRateLimit = (service: string): boolean => {
  const now = Date.now();
  const limit = rateLimits[service];

  // Reset count if it's been more than a minute
  if (now - limit.lastCall > 60000) {
    limit.count = 0;
  }

  // Allow up to 10 calls per minute
  if (limit.count >= 10) {
    return false;
  }

  limit.lastCall = now;
  limit.count += 1;
  return true;
};

// Parse API response to extract ideas
const parseIdeasFromText = (text: string, source: string): GeneratedIdea[] => {
  try {
    // Try to find JSON in the response
    const jsonMatch = text.match(/\[\s*{.*}\s*\]/s) || text.match(/{.*}/s);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        if (Array.isArray(parsed)) {
          return parsed.map((idea: any) => ({
            id: generateId(),
            title: idea.title || idea.name || `${source} SaaS Idea`,
            description: idea.description || idea.summary || "",
            marketSize: idea.marketSize || idea.market_size || "Medium",
            difficulty: idea.difficulty || "Medium",
            isFavorite: false,
            source,
          }));
        } else if (typeof parsed === "object") {
          return [
            {
              id: generateId(),
              title: parsed.title || parsed.name || `${source} SaaS Idea`,
              description: parsed.description || parsed.summary || "",
              marketSize: parsed.marketSize || parsed.market_size || "Medium",
              difficulty: parsed.difficulty || "Medium",
              isFavorite: false,
              source,
            },
          ];
        }
      } catch (e) {
        // JSON parsing failed, continue with text parsing
      }
    }

    // Fallback to text parsing
    const ideas: GeneratedIdea[] = [];
    // Split by numbered items or double newlines
    const sections = text
      .split(/(?:\n\s*\d+\.\s*|\n\s*-\s*|\n\n+)/)
      .filter(Boolean);

    for (let i = 0; i < Math.min(sections.length, 4); i++) {
      const section = sections[i].trim();
      if (section.length < 10) continue;

      // Clean up the text by removing markdown-style markers
      const cleanedSection = section.replace(/\*\*([^*]+)\*\*/g, "$1");

      // Try to extract title and description
      let title = "";
      let description = "";

      // More comprehensive title extraction
      // Check for various title patterns in order of specificity
      const titlePatterns = [
        // Explicit "Title:" pattern
        /Title:\s*([^\n.]+)/i,
        // "Name:" pattern
        /Name:\s*([^\n.]+)/i,
        // Numbered title without "Title:" prefix (e.g., "1. AI-Powered...")
        /^(?:\d+\.)?\s*([^\n.]+?)(?=\s*\n|\s*\.\s*\n)/i,
        // First line that's not too long and doesn't contain metadata keywords
        /^([^\n.]{3,80})(?=\s*\n|\s*\.)/i,
      ];

      // Try each pattern until we find a match
      let titleMatch = null;
      for (const pattern of titlePatterns) {
        titleMatch = cleanedSection.match(pattern);
        if (
          titleMatch &&
          titleMatch[1] &&
          !titleMatch[1].match(
            /market|difficulty|description|small|medium|large|easy|hard/i,
          )
        ) {
          title = titleMatch[1].trim();
          break;
        }
      }

      // If no title found through patterns, use a reasonable default
      if (!title) {
        // Try to extract the first sentence if it's not too long
        const firstSentence = cleanedSection.split(/\.\s+/)[0];
        if (
          firstSentence &&
          firstSentence.length < 80 &&
          !firstSentence.match(
            /market|difficulty|description|small|medium|large|easy|hard/i,
          )
        ) {
          title = firstSentence.trim();
        } else {
          // Last resort fallback
          title = `${source} SaaS Idea ${i + 1}`;
        }
      }

      // Clean up the title
      title = title
        .replace(/^\d+\.?\s*/, "") // Remove leading numbers
        .replace(/^\.\s*/, "") // Remove leading dots
        .replace(/^title:\s*/i, "") // Remove "Title:" prefix if it wasn't caught by the regex
        .replace(/^name:\s*/i, "") // Remove "Name:" prefix
        .replace(/^idea\s*\d*:?\s*/i, "") // Remove "Idea 1:" type prefixes
        .trim();

      // If title is too long, truncate it
      if (title.length > 100) title = title.substring(0, 97) + "...";

      // Extract description - try multiple approaches
      // First look for explicit description section
      const descPatterns = [
        // Explicit "Description:" pattern
        /Description:\s*([\s\S]*?)(?=\s*(?:Market\s*Size:|Difficulty:|$))/i,
      ];

      // Try each description pattern
      let descMatch = null;
      for (const pattern of descPatterns) {
        descMatch = cleanedSection.match(pattern);
        if (descMatch && descMatch[1] && descMatch[1].trim().length > 10) {
          description = descMatch[1].trim();
          break;
        }
      }

      // If no description found through patterns, use the content minus metadata
      if (!description) {
        // Try to extract content between title and metadata
        const titleIndex = cleanedSection.indexOf(title);
        if (titleIndex >= 0) {
          const afterTitle = cleanedSection
            .substring(titleIndex + title.length)
            .trim();
          // Remove market size and difficulty info
          let contentWithoutMetadata = afterTitle
            .replace(/Market\s*Size:\s*(?:Small|Medium|Large)[.\s]*/gi, "")
            .replace(/Difficulty:\s*(?:Easy|Medium|Hard)[.\s]*/gi, "")
            .replace(/Description:\s*/gi, "")
            .trim();

          if (contentWithoutMetadata && contentWithoutMetadata.length > 10) {
            description = contentWithoutMetadata;
          }
        }

        // If still no description, try using the whole section minus the first line
        if (!description) {
          const lines = cleanedSection.split("\n").filter(Boolean);
          if (lines.length > 1) {
            description = lines.slice(1).join("\n").trim();
          } else {
            // Last resort fallback
            description = `A SaaS idea for the ${title} concept.`;
          }
        }
      }

      // Extract market size
      let marketSize: "Small" | "Medium" | "Large" = "Medium";
      const marketMatch = cleanedSection.match(
        /Market\s*Size:\s*(Small|Medium|Large)/i,
      );
      if (marketMatch && marketMatch[1]) {
        marketSize = marketMatch[1] as "Small" | "Medium" | "Large";
      }

      // Extract difficulty
      let difficulty: "Easy" | "Medium" | "Hard" = "Medium";
      const difficultyMatch = cleanedSection.match(
        /Difficulty:\s*(Easy|Medium|Hard)/i,
      );
      if (difficultyMatch && difficultyMatch[1]) {
        difficulty = difficultyMatch[1] as "Easy" | "Medium" | "Hard";
      }

      ideas.push({
        id: generateId(),
        title,
        description,
        marketSize,
        difficulty,
        isFavorite: false,
        source,
      });
    }

    return ideas;
  } catch (error) {
    console.error("Error parsing ideas:", error);
    return [];
  }
};

// Generate ideas using OpenAI
export const generateIdeasOpenAI = async (
  params: IdeaGenerationParams,
): Promise<GenerationResult> => {
  const apiKey = localStorage.getItem("apiKey_openai");

  if (!apiKey) {
    return {
      ideas: [],
      error: "OpenAI API key not found",
      source: "OpenAI",
    };
  }

  if (!checkRateLimit("openai")) {
    return {
      ideas: [],
      error: "Rate limit exceeded. Please try again later.",
      source: "OpenAI",
    };
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a business idea generator specialized in SaaS products. Generate 3 innovative SaaS ideas based on the provided parameters. Format your response as a list of ideas with clear titles and descriptions. For each idea, include a title, description, market size (Small/Medium/Large), and difficulty (Easy/Medium/Hard).",
          },
          {
            role: "user",
            content: `Generate 3 SaaS business ideas for the ${params.industry} industry, targeting ${params.targetMarket} market, using ${params.technologies} technology. ${params.additionalNotes ? "Additional requirements: " + params.additionalNotes : ""}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    const ideas = parseIdeasFromText(
      response.data.choices[0].message.content,
      "OpenAI",
    );

    return {
      ideas,
      source: "OpenAI",
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    return {
      ideas: [],
      error: `OpenAI API error: ${error instanceof Error ? error.message : String(error)}`,
      source: "OpenAI",
    };
  }
};

// Generate ideas using Gemini
export const generateIdeasGemini = async (
  params: IdeaGenerationParams,
): Promise<GenerationResult> => {
  const apiKey = localStorage.getItem("apiKey_gemini");

  if (!apiKey) {
    return {
      ideas: [],
      error: "Gemini API key not found",
      source: "Gemini",
    };
  }

  if (!checkRateLimit("gemini")) {
    return {
      ideas: [],
      error: "Rate limit exceeded. Please try again later.",
      source: "Gemini",
    };
  }

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
      {
        contents: [
          {
            parts: [
              {
                text: `Generate 3 SaaS business ideas for the ${params.industry} industry, targeting ${params.targetMarket} market, using ${params.technologies} technology. ${params.additionalNotes ? "Additional requirements: " + params.additionalNotes : ""}

Format your response as a list of 3 ideas. For each idea, include a title, description, market size (Small/Medium/Large), and difficulty (Easy/Medium/Hard).`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          key: apiKey,
        },
      },
    );

    const content = response.data.candidates[0].content.parts[0].text;
    const ideas = parseIdeasFromText(content, "Gemini");

    return {
      ideas,
      source: "Gemini",
    };
  } catch (error) {
    console.error("Gemini API error:", error);
    return {
      ideas: [],
      error: `Gemini API error: ${error instanceof Error ? error.message : String(error)}`,
      source: "Gemini",
    };
  }
};

// Generate ideas using Anthropic
export const generateIdeasAnthropic = async (
  params: IdeaGenerationParams,
): Promise<GenerationResult> => {
  const apiKey = localStorage.getItem("apiKey_anthropic");

  if (!apiKey) {
    return {
      ideas: [],
      error: "Anthropic API key not found",
      source: "Anthropic",
    };
  }

  if (!checkRateLimit("anthropic")) {
    return {
      ideas: [],
      error: "Rate limit exceeded. Please try again later.",
      source: "Anthropic",
    };
  }

  try {
    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      {
        model: "claude-3-sonnet-20240229",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: `Generate 3 SaaS business ideas for the ${params.industry} industry, targeting ${params.targetMarket} market, using ${params.technologies} technology. ${params.additionalNotes ? "Additional requirements: " + params.additionalNotes : ""}

Format your response as a list of 3 ideas. For each idea, include a title, description, market size (Small/Medium/Large), and difficulty (Easy/Medium/Hard).`,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
      },
    );

    const content = response.data.content[0].text;
    const ideas = parseIdeasFromText(content, "Anthropic");

    return {
      ideas,
      source: "Anthropic",
    };
  } catch (error) {
    console.error("Anthropic API error:", error);
    return {
      ideas: [],
      error: `Anthropic API error: ${error instanceof Error ? error.message : String(error)}`,
      source: "Anthropic",
    };
  }
};

// Generate ideas using Perplexity
export const generateIdeasPerplexity = async (
  params: IdeaGenerationParams,
): Promise<GenerationResult> => {
  const apiKey = localStorage.getItem("apiKey_perplexity");

  if (!apiKey) {
    return {
      ideas: [],
      error: "Perplexity API key not found",
      source: "Perplexity",
    };
  }

  if (!checkRateLimit("perplexity")) {
    return {
      ideas: [],
      error: "Rate limit exceeded. Please try again later.",
      source: "Perplexity",
    };
  }

  try {
    const response = await axios.post(
      "https://api.perplexity.ai/chat/completions",
      {
        model: "sonar-medium-online",
        messages: [
          {
            role: "system",
            content:
              "You are a business idea generator specialized in SaaS products. Generate 3 innovative SaaS ideas based on the provided parameters.",
          },
          {
            role: "user",
            content: `Generate 3 SaaS business ideas for the ${params.industry} industry, targeting ${params.targetMarket} market, using ${params.technologies} technology. ${params.additionalNotes ? "Additional requirements: " + params.additionalNotes : ""}

Format your response as a list of 3 ideas. For each idea, include a title, description, market size (Small/Medium/Large), and difficulty (Easy/Medium/Hard).`,
          },
        ],
        max_tokens: 1000,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    const content = response.data.choices[0].message.content;
    const ideas = parseIdeasFromText(content, "Perplexity");

    return {
      ideas,
      source: "Perplexity",
    };
  } catch (error) {
    console.error("Perplexity API error:", error);
    return {
      ideas: [],
      error: `Perplexity API error: ${error instanceof Error ? error.message : String(error)}`,
      source: "Perplexity",
    };
  }
};

// Generate ideas using DeepSeek
export const generateIdeasDeepSeek = async (
  params: IdeaGenerationParams,
): Promise<GenerationResult> => {
  const apiKey = localStorage.getItem("apiKey_deepseek");

  if (!apiKey) {
    return {
      ideas: [],
      error: "DeepSeek API key not found",
      source: "DeepSeek",
    };
  }

  if (!checkRateLimit("deepseek")) {
    return {
      ideas: [],
      error: "Rate limit exceeded. Please try again later.",
      source: "DeepSeek",
    };
  }

  try {
    const response = await axios.post(
      "https://api.deepseek.com/v1/chat/completions",
      {
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content:
              "You are a business idea generator specialized in SaaS products. Generate 3 innovative SaaS ideas based on the provided parameters.",
          },
          {
            role: "user",
            content: `Generate 3 SaaS business ideas for the ${params.industry} industry, targeting ${params.targetMarket} market, using ${params.technologies} technology. ${params.additionalNotes ? "Additional requirements: " + params.additionalNotes : ""}

Format your response as a list of 3 ideas. For each idea, include a title, description, market size (Small/Medium/Large), and difficulty (Easy/Medium/Hard).`,
          },
        ],
        max_tokens: 1000,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    const content = response.data.choices[0].message.content;
    const ideas = parseIdeasFromText(content, "DeepSeek");

    return {
      ideas,
      source: "DeepSeek",
    };
  } catch (error) {
    console.error("DeepSeek API error:", error);
    return {
      ideas: [],
      error: `DeepSeek API error: ${error instanceof Error ? error.message : String(error)}`,
      source: "DeepSeek",
    };
  }
};

// Generate ideas using Grok
export const generateIdeasGrok = async (
  params: IdeaGenerationParams,
): Promise<GenerationResult> => {
  const apiKey = localStorage.getItem("apiKey_grok");

  if (!apiKey) {
    return {
      ideas: [],
      error: "Grok API key not found",
      source: "Grok",
    };
  }

  if (!checkRateLimit("grok")) {
    return {
      ideas: [],
      error: "Rate limit exceeded. Please try again later.",
      source: "Grok",
    };
  }

  try {
    const response = await axios.post(
      "https://api.grok.ai/v1/chat/completions", // Note: This is a placeholder URL as Grok's API might not be publicly available yet
      {
        model: "grok-1",
        messages: [
          {
            role: "system",
            content:
              "You are a business idea generator specialized in SaaS products. Generate 3 innovative SaaS ideas based on the provided parameters.",
          },
          {
            role: "user",
            content: `Generate 3 SaaS business ideas for the ${params.industry} industry, targeting ${params.targetMarket} market, using ${params.technologies} technology. ${params.additionalNotes ? "Additional requirements: " + params.additionalNotes : ""}

Format your response as a list of 3 ideas. For each idea, include a title, description, market size (Small/Medium/Large), and difficulty (Easy/Medium/Hard).`,
          },
        ],
        max_tokens: 1000,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    const content = response.data.choices[0].message.content;
    const ideas = parseIdeasFromText(content, "Grok");

    return {
      ideas,
      source: "Grok",
    };
  } catch (error) {
    console.error("Grok API error:", error);
    return {
      ideas: [],
      error: `Grok API error: ${error instanceof Error ? error.message : String(error)}`,
      source: "Grok",
    };
  }
};

// Map of service names to their respective generation functions
export const serviceGenerators = {
  openai: generateIdeasOpenAI,
  gemini: generateIdeasGemini,
  anthropic: generateIdeasAnthropic,
  perplexity: generateIdeasPerplexity,
  deepseek: generateIdeasDeepSeek,
  grok: generateIdeasGrok,
};

// Generate ideas from multiple services in parallel
export const generateIdeasFromMultipleServices = async (
  params: IdeaGenerationParams,
  selectedServices: string[],
): Promise<GenerationResult[]> => {
  const generationPromises = selectedServices.map((service) => {
    const generator =
      serviceGenerators[service as keyof typeof serviceGenerators];
    return generator
      ? generator(params)
      : Promise.resolve({
          ideas: [],
          error: `Unknown service: ${service}`,
          source: service,
        });
  });

  return await Promise.all(generationPromises);
};
