"use client";

import { useState } from "react";
import type { CelestialData } from "@/lib/solar-system-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Sparkles, Loader2 } from "lucide-react";
import { askExpert } from "@/ai/flows/ask-expert-flow";

type PlanetInfoCardProps = {
  planet: CelestialData | null;
  onClose: () => void;
};

export function PlanetInfoCard({ planet, onClose }: PlanetInfoCardProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!planet) return null;

  const formatNumber = (num: number | undefined) => num?.toLocaleString() || "N/A";

  const handleAskExpert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !planet) return;
    
    setIsLoading(true);
    setAnswer("");
    
    try {
      const expertAnswer = await askExpert({
        planetName: planet.name,
        planetDescription: planet.description,
        question: question,
      });
      setAnswer(expertAnswer);
    } catch (error) {
      console.error("Error asking expert:", error);
      setAnswer("Sorry, I couldn't find an answer to that question right now.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="absolute top-4 left-4 w-80 max-w-[calc(100vw-2rem)] bg-card/80 backdrop-blur-sm animate-in fade-in zoom-in-95 pointer-events-auto">
      <CardHeader className="relative">
        <CardTitle className="text-primary">{planet.name}</CardTitle>
        <CardDescription>Astronomical Data</CardDescription>
        <Button variant="ghost" size="icon" className="absolute top-3 right-3 h-6 w-6" onClick={onClose}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      <CardContent className="text-sm space-y-2">
        <p>{planet.description}</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-2 text-foreground/80">
          <p className="font-semibold">Diameter:</p>
          <p className="text-right">{formatNumber(planet.radius * 2)} km</p>
          
          {planet.distance && <>
            <p className="font-semibold">Distance from Sun:</p>
            <p className="text-right">{formatNumber(planet.distance)} million km</p>
          </>}
          
          {planet.orbitalPeriod && <>
            <p className="font-semibold">Orbital Period:</p>
            <p className="text-right">{formatNumber(planet.orbitalPeriod)} days</p>
          </>}

          {planet.rotationPeriod && <>
            <p className="font-semibold">Rotation Period:</p>
            <p className="text-right">{formatNumber(Math.abs(planet.rotationPeriod))} hours</p>
          </>}
        </div>

        <div className="pt-4 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-primary">Ask an Expert</h3>
          </div>
          <form onSubmit={handleAskExpert} className="space-y-2">
            <Label htmlFor="expert-question" className="sr-only">Ask a question about {planet.name}</Label>
            <Input 
              id="expert-question"
              placeholder={`e.g., "Does ${planet.name} have moons?"`}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={isLoading}
            />
            <Button type="submit" size="sm" className="w-full" disabled={isLoading || !question}>
              {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
              {isLoading ? "Thinking..." : "Ask"}
            </Button>
          </form>
          {isLoading && (
            <div className="text-xs text-muted-foreground flex items-center justify-center">
              <p>Our AI astronomer is pondering your question...</p>
            </div>
          )}
          {answer && (
            <div className="p-3 bg-muted/50 rounded-md text-foreground/90 text-xs">
              <p className="whitespace-pre-wrap">{answer}</p>
            </div>
          )}
        </div>

      </CardContent>
    </Card>
  );
}
