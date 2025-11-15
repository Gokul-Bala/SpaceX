"use client";

import Image from "next/image";
import type { CelestialData } from "@/lib/solar-system-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

type PlanetInfoCardProps = {
  planet: CelestialData | null;
  onClose: () => void;
};

export function PlanetInfoCard({ planet, onClose }: PlanetInfoCardProps) {
  if (!planet) return null;

  const formatNumber = (num: number | undefined) => num?.toLocaleString() || "N/A";
  const planetImage = PlaceHolderImages.find(p => p.id === planet.textureId);

  return (
    <Card className="absolute top-4 left-4 w-80 max-w-[calc(100vw-2rem)] bg-card/80 backdrop-blur-sm animate-in fade-in zoom-in-95 pointer-events-auto">
      <CardHeader className="relative items-center text-center">
        {planetImage && (
            <div className="relative w-24 h-24 mb-4">
                <Image
                    src={planetImage.imageUrl}
                    alt={`Image of ${planet.name}`}
                    fill
                    className="rounded-full object-cover"
                    sizes="96px"
                />
            </div>
        )}
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
      </CardContent>
    </Card>
  );
}
