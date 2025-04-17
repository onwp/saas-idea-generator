import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import IdeaCard from "./IdeaCard";
import {
  containerStyles,
  buttonContainerStyles,
  cardGridStyles,
  SectionHeader,
  EmptyState,
  LoadingState,
} from "@/components/ui/common";

interface Idea {
  id: string;
  title: string;
  description: string;
  marketSize: "Small" | "Medium" | "Large";
  difficulty: "Easy" | "Medium" | "Hard";
  isFavorite?: boolean;
  source?: string;
}

interface IdeaResultsDisplayProps {
  ideas?: Idea[];
  isLoading?: boolean;
  isExporting?: boolean;
  onSaveIdea?: (id: string) => void;
  onExport?: (format: "pdf" | "csv") => void;
  errors?: { source: string; message: string }[];
}

const IdeaResultsDisplay = ({
  ideas = [
    {
      id: "1",
      title: "AI-Powered Content Calendar",
      description:
        "A SaaS tool that uses AI to suggest optimal content schedules based on audience engagement patterns and industry trends.",
      marketSize: "Medium",
      difficulty: "Medium",
      isFavorite: false,
      source: "OpenAI",
    },
    {
      id: "2",
      title: "Remote Team Wellness Platform",
      description:
        "A platform that helps remote teams stay healthy with personalized wellness challenges, virtual team building, and mental health resources.",
      marketSize: "Large",
      difficulty: "Medium",
      isFavorite: true,
      source: "Gemini",
    },
    {
      id: "3",
      title: "Small Business Compliance Assistant",
      description:
        "An automated tool that helps small businesses stay compliant with changing regulations and requirements across different jurisdictions.",
      marketSize: "Medium",
      difficulty: "Hard",
      isFavorite: false,
      source: "Anthropic",
    },
    {
      id: "4",
      title: "Sustainable Supply Chain Tracker",
      description:
        "A platform that helps businesses track and optimize their supply chain for sustainability, carbon footprint, and ethical sourcing.",
      marketSize: "Large",
      difficulty: "Hard",
      isFavorite: false,
      source: "Perplexity",
    },
  ],
  isLoading = false,
  isExporting = false,
  onSaveIdea = () => {},
  onExport = () => {},
  errors = [],
}: IdeaResultsDisplayProps) => {
  const [activeTab, setActiveTab] = useState("all");

  const favoriteIdeas = ideas.filter((idea) => idea.isFavorite);
  const displayIdeas = activeTab === "all" ? ideas : favoriteIdeas;

  // Export buttons component
  const ExportButtons = () => (
    <div className={buttonContainerStyles.default}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onExport("pdf")}
        disabled={displayIdeas.length === 0 || isExporting}
      >
        {isExporting ? (
          <>
            <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            Exporting...
          </>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </>
        )}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onExport("csv")}
        disabled={displayIdeas.length === 0 || isExporting}
      >
        {isExporting ? (
          <>
            <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            Exporting...
          </>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </>
        )}
      </Button>
    </div>
  );

  return (
    <div className={containerStyles.wide}>
      <SectionHeader title="Generated Ideas" rightContent={<ExportButtons />} />

      {errors.length > 0 && (
        <div className="mb-6 space-y-3">
          {errors.map((error, index) => (
            <Alert variant="destructive" key={index}>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error from {error.source}</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Ideas ({ideas.length})</TabsTrigger>
          <TabsTrigger value="favorites">
            Favorites ({favoriteIdeas.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          {isLoading ? (
            <LoadingState />
          ) : ideas.length === 0 ? (
            <Card>
              <CardContent>
                <EmptyState message="No ideas generated yet. Fill out the form and click Generate to get started!" />
              </CardContent>
            </Card>
          ) : (
            <div className={cardGridStyles.default}>
              {ideas.map((idea) => (
                <IdeaCard
                  key={idea.id}
                  title={idea.title}
                  description={idea.description}
                  marketSize={idea.marketSize}
                  difficulty={idea.difficulty}
                  isFavorite={idea.isFavorite}
                  source={idea.source}
                  onToggleFavorite={() => onSaveIdea(idea.id)}
                  onExport={() => onExport("pdf")}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="favorites" className="mt-0">
          {favoriteIdeas.length === 0 ? (
            <Card>
              <CardContent>
                <EmptyState message="No favorite ideas yet. Save ideas you like to see them here!" />
              </CardContent>
            </Card>
          ) : (
            <div className={cardGridStyles.default}>
              {favoriteIdeas.map((idea) => (
                <IdeaCard
                  key={idea.id}
                  title={idea.title}
                  description={idea.description}
                  marketSize={idea.marketSize}
                  difficulty={idea.difficulty}
                  isFavorite={idea.isFavorite}
                  source={idea.source}
                  onToggleFavorite={() => onSaveIdea(idea.id)}
                  onExport={() => onExport("pdf")}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IdeaResultsDisplay;
