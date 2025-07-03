import { Clapperboard } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-card/80 border-b shadow-sm sticky top-0 z-50 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg">
              <Clapperboard className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">
              AniPulse
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
