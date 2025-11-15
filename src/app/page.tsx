import CosmicViewer from '@/components/cosmic-viewer/CosmicViewer';
import { AuraXLogo } from '@/components/AuraXLogo';

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-background">
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <h1>
          <AuraXLogo />
        </h1>
      </div>
      <CosmicViewer />
    </div>
  );
}
