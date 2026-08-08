import axios from "axios";
import { Anime, JikanResponse, AnimeCharacter } from "@/types/jikan";

const ANILIST_GRAPHQL_URL = "https://graphql.anilist.co";

export async function anilistQuery<T>(query: string, variables: Record<string, any> = {}): Promise<T> {
  const response = await axios.post<{ data: T }>(
    ANILIST_GRAPHQL_URL,
    { query, variables },
    { headers: { "Content-Type": "application/json", Accept: "application/json" } }
  );
  return response.data.data;
}

export function normalizeAniListMediaToAnime(media: any): Anime {
  const score = media.averageScore ? media.averageScore / 10 : null;
  const statusStr =
    media.status === "FINISHED"
      ? "Finished Airing"
      : media.status === "RELEASING"
      ? "Currently Airing"
      : media.status === "NOT_YET_RELEASED"
      ? "Not yet aired"
      : media.status || "Unknown";

  const genresMapped = Array.isArray(media.genres)
    ? media.genres.map((g: string, idx: number) => ({
        mal_id: idx + 100,
        type: "anime",
        name: g,
        url: "",
      }))
    : [];

  const studiosMapped = media.studios?.nodes?.length
    ? media.studios.nodes.map((s: any) => ({
        mal_id: s.id || 1,
        type: "anime",
        name: s.name,
        url: "",
      }))
    : [];

  return {
    mal_id: media.id,
    url: media.siteUrl || `https://anilist.co/anime/${media.id}`,
    images: {
      jpg: {
        image_url: media.coverImage?.large || media.coverImage?.medium || "/placeholder.jpg",
        large_image_url: media.coverImage?.extraLarge || media.coverImage?.large || "/placeholder.jpg",
      },
    },
    trailer: {
      youtube_id: media.trailer?.site === "youtube" ? media.trailer.id : undefined,
      images: {
        maximum_image_url: media.bannerImage || media.coverImage?.extraLarge,
      },
    },
    approved: true,
    titles: [
      { type: "Default", title: media.title?.romaji || media.title?.english || "Untitled" },
    ],
    title: media.title?.english || media.title?.romaji || "Untitled",
    title_english: media.title?.english,
    title_japanese: media.title?.native,
    type: media.format === "MOVIE" ? "Movie" : media.format === "TV_SHORT" ? "TV" : media.format || "TV",
    source: media.source || "Original",
    episodes: media.episodes,
    status: statusStr,
    airing: media.status === "RELEASING",
    aired: {
      from: media.startDate?.year ? `${media.startDate.year}` : "",
      to: media.endDate?.year ? `${media.endDate.year}` : null,
      string: media.startDate?.year ? `${media.startDate.year}` : "N/A",
    },
    duration: media.duration ? `${media.duration} min` : undefined,
    rating: media.isAdult ? "R-18+ (Hentai)" : "PG-13",
    score,
    scored_by: media.popularity ? Math.floor(media.popularity * 0.8) : null,
    rank: media.rank || null,
    popularity: media.popularity || null,
    members: media.popularity || null,
    favorites: media.favourites || null,
    synopsis: media.description
      ? media.description.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]*>/g, "")
      : "No detailed description available.",
    season: media.season?.toLowerCase() || undefined,
    year: media.seasonYear || media.startDate?.year || undefined,
    studios: studiosMapped,
    genres: genresMapped,
  };
}
