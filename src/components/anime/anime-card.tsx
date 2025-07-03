'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Anime } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SummaryButton } from './summary-button';
import { ChevronDown, ChevronUp, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimeCardProps {
  anime: Anime;
  index: number;
}

export function AnimeCard({ anime, index }: AnimeCardProps) {
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);

  // A heuristic to check if synopsis is long enough to be truncated
  const canTruncate = anime.synopsis && anime.synopsis.length > 250;

  const getOrdinal = (n: number) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };
  
  const rankString = getOrdinal(index + 1);

  return (
    <Card className="w-full max-w-4xl overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg bg-card border-border flex flex-col sm:flex-row">
      <div className="sm:w-48 flex-shrink-0 relative">
        <Image
          src={anime.images.webp.large_image_url}
          alt={`Poster for ${anime.title}`}
          width={225}
          height={320}
          className="w-full h-auto object-cover aspect-[2/3]"
          data-ai-hint="anime art"
        />
      </div>

      <CardContent className="p-4 sm:p-6 flex flex-col flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <h2 className="text-xl sm:text-2xl font-bold" title={anime.title}>
            {anime.title}
          </h2>
          <div className="flex gap-2 items-center flex-shrink-0 self-start sm:self-center">
            {anime.score && (
              <Badge variant="secondary" className="text-base font-bold shadow-md flex items-center gap-1 px-2 py-1">
                <Star className="h-4 w-4 text-yellow-400" fill="currentColor" /> {anime.score.toFixed(2)}
              </Badge>
            )}
            <Badge variant="destructive" className="text-base font-bold shadow-md px-2 py-1">
              {rankString}
            </Badge>
          </div>
        </div>

        <div className="text-muted-foreground mt-4 flex-grow">
          {anime.synopsis ? (
            <>
              <p className={cn("text-sm", !showFullSynopsis && canTruncate && "line-clamp-4")}>
                {anime.synopsis}
              </p>
              {canTruncate && (
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm mt-2 text-primary/80 hover:text-primary"
                  onClick={() => setShowFullSynopsis(!showFullSynopsis)}
                >
                  {showFullSynopsis ? 'Read Less' : 'Read More'}
                  {showFullSynopsis ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                </Button>
              )}
            </>
          ) : (
             <p className="text-sm italic">No synopsis available.</p>
          )}
        </div>

        <div className="mt-auto pt-4 flex gap-4">
          <SummaryButton title={anime.title} description={anime.synopsis} />
        </div>
      </CardContent>
    </Card>
  );
}
