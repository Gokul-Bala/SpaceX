import CosmicViewer from '@/components/cosmic-viewer/CosmicViewer';

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-background">
      <h1 className="sr-only">AuraX - An interactive 3D model of the solar system</h1>
      <CosmicViewer />
    </div>
  );
}
