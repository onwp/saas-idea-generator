import React from "react";
import { cn } from "@/lib/utils";

// Common container styles
export const containerStyles = {
  default: "w-full max-w-3xl mx-auto p-6 bg-card rounded-xl border shadow-sm",
  wide: "w-full max-w-7xl mx-auto bg-background p-6 rounded-lg",
  fullWidth: "w-full bg-background",
};

// Common heading styles
export const headingStyles = {
  main: "text-2xl font-bold",
  centered: "text-2xl font-bold text-center",
  large: "text-4xl font-bold tracking-tight text-foreground mb-2",
};

// Common button container styles
export const buttonContainerStyles = {
  default: "flex gap-2",
  between: "flex justify-between items-center",
};

// Common section styles
export const sectionStyles = {
  default: "space-y-6",
  form: "space-y-4",
};

// Common card grid styles
export const cardGridStyles = {
  default: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
};

// Common header section component
interface HeaderSectionProps {
  title: string;
  description?: string;
  className?: string;
}

export const HeaderSection = ({
  title,
  description,
  className,
}: HeaderSectionProps) => (
  <header className={cn("text-center mb-12", className)}>
    <h1 className={headingStyles.large}>{title}</h1>
    {description && (
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
        {description}
      </p>
    )}
  </header>
);

// Common section header component
interface SectionHeaderProps {
  title: string;
  rightContent?: React.ReactNode;
  className?: string;
}

export const SectionHeader = ({
  title,
  rightContent,
  className,
}: SectionHeaderProps) => (
  <div className={cn("flex justify-between items-center mb-6", className)}>
    <h2 className={headingStyles.main}>{title}</h2>
    {rightContent}
  </div>
);

// Common empty state component
interface EmptyStateProps {
  message: string;
  className?: string;
}

export const EmptyState = ({ message, className }: EmptyStateProps) => (
  <div
    className={cn("flex flex-col items-center justify-center h-64", className)}
  >
    <p className="text-muted-foreground text-center">{message}</p>
  </div>
);

// Common loading state component
export const LoadingState = ({ className }: { className?: string }) => (
  <div className={cn("flex justify-center items-center h-64", className)}>
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);
