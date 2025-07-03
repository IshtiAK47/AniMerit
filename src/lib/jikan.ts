import type { JikanResponse, Anime } from './types';

const JIKAN_API_URL = 'https://api.jikan.moe/v4';

export async function getTopAnime(type: 'tv' | 'movie', limit: number = 10): Promise<Anime[]> {
  try {
    // Adding a random query param to try and avoid aggressive caching on the API side
    const randomQuery = `&r=${Math.random()}`;
    const response = await fetch(`${JIKAN_API_URL}/top/anime?type=${type}&filter=bypopularity&limit=${limit}${randomQuery}`, {
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
