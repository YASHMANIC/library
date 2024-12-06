"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface TextContainerProps {
  text: string;
  maxLength?: number;
  className?: string;
}

export function TextContainer({
  text,
  maxLength = 400,
  className,
}: TextContainerProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const chunks = React.useMemo(() => {
    if (text.length <= maxLength) return [text];
    
    const words = text.split(" ");
    const result = [];
    let currentChunk = "";
    
    for (const word of words) {
      if ((currentChunk + " " + word).length <= maxLength) {
        currentChunk += (currentChunk ? " " : "") + word;
      } else {
        if (currentChunk) result.push(currentChunk);
        currentChunk = word;
      }
    }
    if (currentChunk) result.push(currentChunk);
    
    return result;
  }, [text, maxLength]);

  const hasMultipleSlides = chunks.length > 1;

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + chunks.length) % chunks.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % chunks.length);
  };

  return (
    <div className={cn("relative w-full max-w-2xl mx-auto", className)}>
      <div className="overflow-hidden rounded-lg bg-card p-6 shadow-md">
        <div className="min-h-[100px] text-card-foreground">
          {chunks[currentSlide]}
        </div>
        
        {hasMultipleSlides && (
          <div className="mt-4 flex items-center justify-between gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              className="h-8 w-8"
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <span className="text-sm text-muted-foreground">
              {currentSlide + 1} / {chunks.length}
            </span>
            
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="h-8 w-8"
              disabled={currentSlide === chunks.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}