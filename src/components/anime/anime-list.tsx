import type { Anime } from '@/lib/types';
import { AnimeCard } from './anime-card';

interface AnimeListProps {
  animeList: Anime[];
}

export function AnimeList({ animeList }: AnimeListProps) {
  if (!animeList || animeList.length === 0) {
    return <p className="text-center text-muted-foreground py-10">Could not fetch anime data. Please try again later.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
      {animeList.map((anime) => (
        <AnimeCard key={anime.mal_id} anime={anime} />
      ))}
    </div>
  );
}
