"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Orbit, Tags, ToyBrick, Play, Pause, Camera, ChevronsUpDown } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { useState } from "react";

type ControlsPanelProps = {
  showOrbits: boolean;
  setShowOrbits: Dispatch<SetStateAction<boolean>>;
  showLabels: boolean;
  setShowLabels: Dispatch<SetStateAction<boolean>>;
  timeScale: number;
  setTimeScale: Dispatch<SetStateAction<number>>;
  isPaused: boolean;
  setIsPaused: Dispatch<SetStateAction<boolean>>;
  autoRotate: boolean;
  setAutoRotate: Dispatch<SetStateAction<boolean>>;
};

export function ControlsPanel({
  showOrbits,
  setShowOrbits,
  showLabels,
  setShowLabels,
  timeScale,
  setTimeScale,
  isPaused,
  setIsPaused,
  autoRotate,
  setAutoRotate
}: ControlsPanelProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <Card className="absolute top-4 right-4 w-80 max-w-[calc(100vw-2rem)] bg-card/80 backdrop-blur-sm animate-in fade-in zoom-in-95 pointer-events-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-primary flex items-center gap-2"><ToyBrick /> Controls</CardTitle>
        <Button variant="ghost" size="icon" onClick={() => setIsMinimized(!isMinimized)}>
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">{isMinimized ? 'Expand' : 'Collapse'}</span>
        </Button>
      </CardHeader>
      {!isMinimized && (
        <CardContent className="space-y-4 animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between">
            <Label htmlFor="orbits-switch" className="flex items-center gap-2 cursor-pointer">
              <Orbit className="w-4 h-4" /> Orbit Paths
            </Label>
            <Switch id="orbits-switch" checked={showOrbits} onCheckedChange={setShowOrbits} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="labels-switch" className="flex items-center gap-2 cursor-pointer">
              <Tags className="w-4 h-4" /> Planet Labels
            </Label>
            <Switch id="labels-switch" checked={showLabels} onCheckedChange={setShowLabels} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="autorotate-switch" className="flex items-center gap-2 cursor-pointer">
              <Camera className="w-4 h-4" /> Auto-Rotate
            </Label>
            <Switch id="autorotate-switch" checked={autoRotate} onCheckedChange={setAutoRotate} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="speed-slider" className="flex items-center gap-2">
                  Time Scale
              </Label>
              <Button variant="ghost" size="icon" onClick={() => setIsPaused(!isPaused)}>
                  {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                  <span className="sr-only">{isPaused ? 'Play' : 'Pause'}</span>
              </Button>
            </div>
            <Slider
              id="speed-slider"
              min={0}
              max={10}
              step={0.1}
              value={[timeScale]}
              onValueChange={(value) => setTimeScale(value[0])}
              disabled={isPaused}
            />
          </div>
        </CardContent>
      )}
    </Card>
  );
}
