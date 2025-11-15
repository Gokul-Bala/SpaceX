import CosmicViewer from '@/components/cosmic-viewer/CosmicViewer';

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-background">
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <h1 className="text-2xl font-bold text-white tracking-wider">AuraX</h1>
      </div>
      <CosmicViewer />
    </div>
  );
}
