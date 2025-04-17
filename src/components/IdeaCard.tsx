import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarIcon, Download } from "lucide-react";

interface IdeaCardProps {
  title?: string;
  description?: string;
  marketSize?: "Small" | "Medium" | "Large";
  difficulty?: "Easy" | "Medium" | "Hard";
  isFavorite?: boolean;
  source?: string;
  onToggleFavorite?: () => void;
  onExport?: () => void;
}

const IdeaCard = ({
  title = "AI-Powered Content Calendar",
  description = "A SaaS tool that uses AI to suggest optimal posting times and content ideas based on audience engagement patterns.",
  marketSize = "Medium",
  difficulty = "Medium",
  isFavorite = false,
  source,
  onToggleFavorite = () => {},
  onExport = () => {},
}: IdeaCardProps) => {
  // Map market size to colors
  const marketSizeColor = {
    Small: "bg-blue-100 text-blue-800",
    Medium: "bg-purple-100 text-purple-800",
    Large: "bg-green-100 text-green-800",
  };

  // Map difficulty to colors
  const difficultyColor = {
    Easy: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Hard: "bg-red-100 text-red-800",
  };

  return (
    <Card className="w-full max-w-sm h-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          {source && (
            <Badge variant="outline" className="ml-2">
              {source}
            </Badge>
          )}
        </div>
        <div className="flex gap-2 mt-2">
          <Badge className={marketSizeColor[marketSize]}>
            Market: {marketSize}
          </Badge>
          <Badge className={difficultyColor[difficulty]}>
            Difficulty: {difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-gray-600 min-h-[80px]">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 border-t">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleFavorite}
          className={isFavorite ? "text-yellow-500" : "text-gray-400"}
        >
          <StarIcon className="h-5 w-5 mr-1" />
          {isFavorite ? "Saved" : "Save"}
        </Button>
        <Button variant="outline" size="sm" onClick={onExport}>
          <Download className="h-4 w-4 mr-1" />
          Export
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IdeaCard;
