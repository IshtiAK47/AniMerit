import Image from 'next/image';
import type { Anime } from '@/lib/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SummaryButton } from './summary-button';

interface AnimeCardProps {
  anime: Anime;
}

export function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1 bg-card">
      <CardHeader className="p-0 relative">
        <Image
          src={anime.images.webp.large_image_url}
          alt={`Poster for ${anime.title}`}
          width={400}
          height={600}
          className="w-full h-auto object-cover aspect-[2/3]"
          data-ai-hint="anime art"
        />
         <Badge variant="destructive" className="absolute top-2 right-2 text-lg font-bold shadow-md">
           #{anime.rank}
         </Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex items-center">
        <CardTitle className="text-base font-bold leading-tight line-clamp-2" title={anime.title}>
          {anime.title}
        </CardTitle>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <SummaryButton title={anime.title} description={anime.synopsis} />
      </CardFooter>
    </Card>
  );
}
