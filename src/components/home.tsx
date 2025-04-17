import React, { useState } from "react";
import { motion } from "framer-motion";
import IdeaGeneratorForm from "./IdeaGeneratorForm";
import IdeaResultsDisplay from "./IdeaResultsDisplay";
import ApiKeySettings from "./ApiKeySettings";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  generateIdeasFromMultipleServices,
  IdeaGenerationParams,
  GeneratedIdea,
  GenerationResult,
} from "@/services/aiService";
import {
  HeaderSection,
  containerStyles,
  sectionStyles,
} from "@/components/ui/common";

interface HomeProps {
  hideHeader?: boolean;
}

const Home = ({ hideHeader = false }: HomeProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [ideas, setIdeas] = useState<
    Array<{
      id: string;
      title: string;
      description: string;
      marketSize: "Small" | "Medium" | "Large";
      difficulty: "Easy" | "Medium" | "Hard";
      isFavorite: boolean;
      source?: string;
    }>
  >([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [results, setResults] = useState<GenerationResult[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleGenerateIdeas = async (
    formData: {
      industry: string;
      targetMarket: string;
      technologies: string;
      additionalNotes?: string;
    },
    selectedServices: string[],
  ) => {
    setIsLoading(true);

    // Convert form data to the format expected by the AI service
    const params: IdeaGenerationParams = {
      industry: formData.industry,
      targetMarket: formData.targetMarket,
      technologies: formData.technologies,
      additionalNotes: formData.additionalNotes || "",
    };

    try {
      // Call the AI service to generate ideas from multiple services
      const generationResults = await generateIdeasFromMultipleServices(
        params,
        selectedServices,
      );

      // Store the full results including any errors
      setResults(generationResults);

      // Flatten all ideas from all services into a single array
      const allIdeas: GeneratedIdea[] = [];

      generationResults.forEach((result) => {
        if (result.ideas && result.ideas.length > 0) {
          allIdeas.push(...result.ideas);
        }
      });

      // Update the ideas state with the generated ideas
      setIdeas(allIdeas);
    } catch (error) {
      console.error("Error generating ideas:", error);
      // In case of error, set empty ideas array
      setIdeas([]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = (ideaId: string) => {
    if (favorites.includes(ideaId)) {
      setFavorites(favorites.filter((id) => id !== ideaId));
    } else {
      setFavorites([...favorites, ideaId]);
    }

    setIdeas(
      ideas.map((idea) => {
        if (idea.id === ideaId) {
          return { ...idea, isFavorite: !idea.isFavorite };
        }
        return idea;
      }),
    );
  };

  const exportIdeas = (format: "pdf" | "csv") => {
    // Mock export functionality
    console.log(`Exporting ideas as ${format}`);
    // In a real implementation, this would generate and download the file
  };

  return (
    <div className={`${containerStyles.fullWidth} min-h-screen p-6 md:p-10`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`${containerStyles.wide.replace("p-6", "")} ${sectionStyles.default}`}
      >
        {!hideHeader && (
          <HeaderSection
            title="SaaS Idea Generator"
            description="Generate innovative SaaS business ideas tailored to your interests and market preferences."
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <IdeaGeneratorForm
              onGenerateIdeas={handleGenerateIdeas}
              isLoading={isLoading}
              onOpenSettings={() => setIsSettingsOpen(true)}
            />
          </div>

          <div className="lg:col-span-8">
            <IdeaResultsDisplay
              ideas={ideas}
              isLoading={isLoading}
              onSaveIdea={toggleFavorite}
              onExport={exportIdeas}
              errors={results
                ?.filter((r) => r.error)
                .map((r) => ({ source: r.source, message: r.error || "" }))}
            />
          </div>

          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <ApiKeySettings onSave={() => setIsSettingsOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
