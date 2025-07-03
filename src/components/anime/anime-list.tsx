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
    <div className="flex flex-col items-center gap-8 w-full">
      {animeList.map((anime) => (
        <AnimeCard key={anime.mal_id} anime={anime} />
      ))}
    </div>
  );
}
