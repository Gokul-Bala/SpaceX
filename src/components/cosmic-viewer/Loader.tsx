"use client";

import { Progress } from "@/components/ui/progress";

type LoaderProps = {
  progress: number;
};

export function Loader({ progress }: LoaderProps) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-64 text-center">
        <h2 className="text-xl font-semibold text-primary">AuraX</h2>
        <p className="text-sm text-muted-foreground mb-4">Populating the universe...</p>
        <Progress value={progress} className="w-full" />
        <p className="text-xs text-muted-foreground mt-2">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}
