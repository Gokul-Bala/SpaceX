"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Orbit, Tags, Play, Pause, Camera, Settings } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";

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
  setAutoRotate,
}: ControlsPanelProps) {
  return (
    <div className="absolute top-4 right-4 pointer-events-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Open Settings</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-64 bg-card/80 backdrop-blur-sm"
          onClick={(e) => e.stopPropagation()} // Prevent menu from closing on interaction
        >
          <DropdownMenuLabel>Display Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="focus:bg-accent/50">
            <div className="flex items-center justify-between w-full">
              <Label htmlFor="orbits-switch" className="flex items-center gap-2 cursor-pointer">
                <Orbit className="w-4 h-4" /> Orbit Paths
              </Label>
              <Switch id="orbits-switch" checked={showOrbits} onCheckedChange={setShowOrbits} />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-accent/50">
            <div className="flex items-center justify-between w-full">
              <Label htmlFor="labels-switch" className="flex items-center gap-2 cursor-pointer">
                <Tags className="w-4 h-4" /> Planet Labels
              </Label>
              <Switch id="labels-switch" checked={showLabels} onCheckedChange={setShowLabels} />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-accent/50">
            <div className="flex items-center justify-between w-full">
              <Label htmlFor="autorotate-switch" className="flex items-center gap-2 cursor-pointer">
                <Camera className="w-4 h-4" /> Auto-Rotate
              </Label>
              <Switch id="autorotate-switch" checked={autoRotate} onCheckedChange={setAutoRotate} />
            </div>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuLabel>Simulation</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="px-2 py-1.5">
            <div className="flex justify-between items-center mb-2">
                <Label htmlFor="speed-slider" className="flex items-center gap-2">
                    Time Scale
                </Label>
                <Button variant="ghost" size="icon" onClick={() => setIsPaused(!isPaused)}>
                    {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                    <span className="sr-only">{isPaused ? "Play" : "Pause"}</span>
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
            <div className="text-center text-xs text-muted-foreground mt-3">
              Made with WebAura
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
