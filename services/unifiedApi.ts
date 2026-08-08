import { ApiProviderType } from "@/providers/ApiProviderContext";
import {
  getTopAnime as getTopJikan,
  getAiringAnime as getAiringJikan,
  getTopMovies as getTopMoviesJikan,
  getSeasonalAnime as getSeasonalJikan,
  getUpcomingAnime as getUpcomingJikan,
  searchAnime as searchJikan,
  getAnimeDetails as getDetailsJikan,
  getAnimeCharacters as getCharactersJikan,
} from "@/services/jikanApi";
import {
  getTopAnimeAniList,
  getAiringAnimeAniList,
  getTopMoviesAniList,
  getSeasonalAnimeAniList,
  getUpcomingAnimeAniList,
  searchAnimeAniList,
  getAnimeDetailsAniList,
  getAnimeCharactersAniList,
} from "@/services/anilistApi";
import { Anime, AnimeCharacter, JikanResponse } from "@/types/jikan";

export async function fetchTopAnime(
  provider: ApiProviderType,
  params: any = {}
): Promise<JikanResponse<Anime[]>> {
  if (provider === "anilist") {
    return getTopAnimeAniList(params);
  }
  return getTopJikan(params);
}

export async function fetchAiringAnime(
  provider: ApiProviderType,
  params: any = {}
): Promise<JikanResponse<Anime[]>> {
  if (provider === "anilist") {
    return getAiringAnimeAniList(params);
  }
  return getAiringJikan(params);
}

export async function fetchTopMovies(
  provider: ApiProviderType,
  params: any = {}
): Promise<JikanResponse<Anime[]>> {
  if (provider === "anilist") {
    return getTopMoviesAniList(params);
  }
  return getTopMoviesJikan(params);
}

export async function fetchSeasonalAnime(
  provider: ApiProviderType,
  year?: number,
  season?: string,
  params: any = {}
): Promise<JikanResponse<Anime[]>> {
  if (provider === "anilist") {
    return getSeasonalAnimeAniList(year, season, params);
  }
  return getSeasonalJikan(year, season, params);
}

export async function fetchUpcomingAnime(
  provider: ApiProviderType,
  params: any = {}
): Promise<JikanResponse<Anime[]>> {
  if (provider === "anilist") {
    return getUpcomingAnimeAniList(params);
  }
  return getUpcomingJikan(params);
}

export async function fetchSearchAnime(
  provider: ApiProviderType,
  params: any = {}
): Promise<JikanResponse<Anime[]>> {
  if (provider === "anilist") {
    return searchAnimeAniList(params);
  }
  return searchJikan(params);
}

export async function fetchAnimeDetails(
  provider: ApiProviderType,
  id: number
): Promise<JikanResponse<Anime>> {
  if (provider === "anilist") {
    return getAnimeDetailsAniList(id);
  }
  return getDetailsJikan(id);
}

export async function fetchAnimeCharacters(
  provider: ApiProviderType,
  id: number
): Promise<JikanResponse<AnimeCharacter[]>> {
  if (provider === "anilist") {
    return getAnimeCharactersAniList(id);
  }
  return getCharactersJikan(id);
}
