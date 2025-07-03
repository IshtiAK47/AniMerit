export function Header() {
  return (
    <header className="bg-card/80 border-b shadow-sm sticky top-0 z-50 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-primary-foreground">
                <path d="M12 0l-2.2 4.8L4.8 2.6l2.2 4.8L0 12l7 2.2-2.2 4.8 4.8-2.2L12 24l2.2-7 4.8 2.2-2.2-4.8 7-2.2-4.8-2.2-2.2-4.8z"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">
              AniMerit
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
