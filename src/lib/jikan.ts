import type { JikanResponse, Anime } from './types';

const JIKAN_API_URL = 'https://api.jikan.moe/v4';

export async function getTopAnime(type: 'tv' | 'movie', limit: number = 10, filter?: 'bypopularity' | 'airing'): Promise<Anime[]> {
  try {
    const url = new URL(`${JIKAN_API_URL}/top/anime`);
    url.searchParams.append('type', type);
    url.searchParams.append('limit', String(limit));
    if (filter) {
      url.searchParams.append('filter', filter);
    }
    
    const response = await fetch(url.toString(), {
        next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) {
      console.error(`Jikan API error: ${response.status} ${response.statusText}`);
      const errorBody = await response.text();
      console.error('Error body:', errorBody);
      return [];
    }
    
    const data: JikanResponse<Anime[]> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Failed to fetch top anime:', error);
    return [];
  }
}
