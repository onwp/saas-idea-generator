import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Save, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import IdeaCard from "./IdeaCard";

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
  onSaveIdea = () => {},
  onExport = () => {},
  errors = [],
}: IdeaResultsDisplayProps) => {
  const [activeTab, setActiveTab] = useState("all");

  const favoriteIdeas = ideas.filter((idea) => idea.isFavorite);
  const displayIdeas = activeTab === "all" ? ideas : favoriteIdeas;

  return (
    <div className="w-full max-w-7xl mx-auto bg-background p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Generated Ideas</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExport("pdf")}
            disabled={displayIdeas.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExport("csv")}
            disabled={displayIdeas.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

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
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : ideas.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center h-64">
                <p className="text-muted-foreground text-center">
                  No ideas generated yet. Fill out the form and click Generate
                  to get started!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <CardContent className="flex flex-col items-center justify-center h-64">
                <p className="text-muted-foreground text-center">
                  No favorite ideas yet. Save ideas you like to see them here!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
