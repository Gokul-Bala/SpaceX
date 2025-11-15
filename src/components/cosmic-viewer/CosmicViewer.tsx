"use client";

import { useState, useCallback } from "react";
import type { CelestialData } from "@/lib/solar-system-data";
import { SceneComponent } from "./SceneComponent";
import { Loader } from "./Loader";
import { PlanetInfoCard } from "./PlanetInfoCard";
import { ControlsPanel } from "./ControlsPanel";

export default function CosmicViewer() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState<CelestialData | null>(null);

  // Scene settings
  const [showOrbits, setShowOrbits] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [timeScale, setTimeScale] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);

  const handlePlanetClick = useCallback((planet: CelestialData | null) => {
    setSelectedPlanet(planet);
  }, []);

  const handleCloseInfoCard = useCallback(() => {
    setSelectedPlanet(null);
  }, []);

  const handleLoaded = useCallback(() => {
    setTimeout(() => setIsLoaded(true), 500); // Short delay for smoother transition
  }, []);

  return (
    <div className="relative w-full h-full">
      <SceneComponent
        onLoadProgress={setLoadingProgress}
        onLoaded={handleLoaded}
        onPlanetClick={handlePlanetClick}
        showOrbits={showOrbits}
        showLabels={showLabels}
        timeScale={timeScale}
        isPaused={isPaused}
        autoRotate={autoRotate}
      />

      {!isLoaded && <Loader progress={loadingProgress} />}

      <div className="absolute inset-0 pointer-events-none">
        <h1 className="absolute top-4 left-4 text-2xl font-bold text-white pointer-events-auto">
          AuraX
        </h1>
        <PlanetInfoCard planet={selectedPlanet} onClose={handleCloseInfoCard} />
        {!selectedPlanet && (
          <ControlsPanel
            showOrbits={showOrbits}
            setShowOrbits={setShowOrbits}
            showLabels={showLabels}
            setShowLabels={setShowLabels}
            timeScale={timeScale}
            setTimeScale={setTimeScale}
            isPaused={isPaused}
            setIsPaused={setIsPaused}
            autoRotate={autoRotate}
            setAutoRotate={setAutoRotate}
          />
        )}
      </div>
    </div>
  );
}
