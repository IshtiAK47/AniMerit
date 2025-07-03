import { Suspense } from 'react';
import { Header } from '@/components/common/header';
import { getTopAnime } from '@/lib/jikan';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimeList } from '@/components/anime/anime-list';
import { Skeleton } from '@/components/ui/skeleton';

function AnimeListSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-auto aspect-[2/3] w-full rounded-xl" />
          <div className="space-y-2 pt-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  );
}

async function WeeklySeriesList() {
  const topSeries = await getTopAnime('tv', 12, 'airing');
  return <AnimeList animeList={topSeries} />;
}

async function MonthlySeriesList() {
  const topSeries = await getTopAnime('tv', 12, 'bypopularity');
  return <AnimeList animeList={topSeries} />;
}

async function WeeklyMovieList() {
  const topMovies = await getTopAnime('movie', 12, 'airing');
  return <AnimeList animeList={topMovies} />;
}

async function MonthlyMovieList() {
  const topMovies = await getTopAnime('movie', 12, 'bypopularity');
  return <AnimeList animeList={topMovies} />;
}

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12">
        <section id="series">
          <Tabs defaultValue="weekly" className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Top Anime Series</h2>
              <TabsList className="self-start sm:self-center">
                <TabsTrigger value="weekly">This Week</TabsTrigger>
                <TabsTrigger value="monthly">This Month</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="weekly">
              <Suspense fallback={<AnimeListSkeleton />}>
                <WeeklySeriesList />
              </Suspense>
            </TabsContent>
            <TabsContent value="monthly">
              <Suspense fallback={<AnimeListSkeleton />}>
                <MonthlySeriesList />
              </Suspense>
            </TabsContent>
          </Tabs>
        </section>

        <section id="movies">
          <Tabs defaultValue="weekly" className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Top Anime Movies</h2>
              <TabsList className="self-start sm:self-center">
                <TabsTrigger value="weekly">This Week</TabsTrigger>
                <TabsTrigger value="monthly">This Month</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="weekly">
              <Suspense fallback={<AnimeListSkeleton />}>
                <WeeklyMovieList />
              </Suspense>
            </TabsContent>
            <TabsContent value="monthly">
              <Suspense fallback={<AnimeListSkeleton />}>
                <MonthlyMovieList />
              </Suspense>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <footer className="py-6 text-center text-muted-foreground text-sm">
        <p>Powered by <a href="https://jikan.moe" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Jikan API</a>. All data from <a href="https://myanimelist.net" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">MyAnimeList</a>.</p>
      </footer>
    </div>
  );
}
