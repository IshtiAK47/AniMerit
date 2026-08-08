import { anilistQuery, normalizeAniListMediaToAnime } from "@/lib/anilist";
import { Anime, AnimeCharacter, Genre, JikanResponse, Recommendation } from "@/types/jikan";

const MEDIA_FIELDS = `
  id
  title { romaji english native }
  coverImage { extraLarge large medium }
  bannerImage
  format
  episodes
  duration
  status
  season
  seasonYear
  startDate { year month day }
  endDate { year month day }
  averageScore
  popularity
  favourites
  description(asHtml: false)
  genres
  isAdult
  siteUrl
  studios(isMain: true) { nodes { id name } }
  trailer { id site }
`;

export async function getTopAnimeAniList(params: {
  page?: number;
  limit?: number;
  type?: string;
}): Promise<JikanResponse<Anime[]>> {
  const page = params.page || 1;
  const perPage = params.limit || 24;

  let formatFilter = "";
  if (params.type?.toLowerCase() === "tv") formatFilter = ", format: TV";
  if (params.type?.toLowerCase() === "movie") formatFilter = ", format: MOVIE";
  if (params.type?.toLowerCase() === "ova") formatFilter = ", format: OVA";
  if (params.type?.toLowerCase() === "ona") formatFilter = ", format: ONA";
  if (params.type?.toLowerCase() === "special") formatFilter = ", format: SPECIAL";

  const query = `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo { currentPage hasNextPage lastPage total }
        media(sort: SCORE_DESC, type: ANIME, isAdult: false ${formatFilter}) {
          ${MEDIA_FIELDS}
        }
      }
    }
  `;

  const res = await anilistQuery<any>(query, { page, perPage });
  const mediaList = res.Page?.media || [];
  const normalized = mediaList.map(normalizeAniListMediaToAnime);

  return {
    data: normalized,
    pagination: {
      current_page: res.Page?.pageInfo?.currentPage || 1,
      has_next_page: res.Page?.pageInfo?.hasNextPage || false,
      last_visible_page: res.Page?.pageInfo?.lastPage || 1,
      items: { count: normalized.length, total: res.Page?.pageInfo?.total || 100, per_page: perPage },
    },
  };
}

export async function getAiringAnimeAniList(params: {
  page?: number;
  limit?: number;
}): Promise<JikanResponse<Anime[]>> {
  const page = params.page || 1;
  const perPage = params.limit || 24;

  const query = `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo { currentPage hasNextPage lastPage total }
        media(status: RELEASING, sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
          ${MEDIA_FIELDS}
        }
      }
    }
  `;

  const res = await anilistQuery<any>(query, { page, perPage });
  const mediaList = res.Page?.media || [];
  const normalized = mediaList.map(normalizeAniListMediaToAnime);

  return {
    data: normalized,
    pagination: {
      current_page: res.Page?.pageInfo?.currentPage || 1,
      has_next_page: res.Page?.pageInfo?.hasNextPage || false,
      last_visible_page: res.Page?.pageInfo?.lastPage || 1,
      items: { count: normalized.length, total: res.Page?.pageInfo?.total || 100, per_page: perPage },
    },
  };
}

export async function getTopMoviesAniList(params: {
  page?: number;
  limit?: number;
}): Promise<JikanResponse<Anime[]>> {
  const page = params.page || 1;
  const perPage = params.limit || 24;

  const query = `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo { currentPage hasNextPage lastPage total }
        media(format: MOVIE, sort: SCORE_DESC, type: ANIME, isAdult: false) {
          ${MEDIA_FIELDS}
        }
      }
    }
  `;

  const res = await anilistQuery<any>(query, { page, perPage });
  const mediaList = res.Page?.media || [];
  const normalized = mediaList.map(normalizeAniListMediaToAnime);

  return {
    data: normalized,
    pagination: {
      current_page: res.Page?.pageInfo?.currentPage || 1,
      has_next_page: res.Page?.pageInfo?.hasNextPage || false,
      last_visible_page: res.Page?.pageInfo?.lastPage || 1,
      items: { count: normalized.length, total: res.Page?.pageInfo?.total || 100, per_page: perPage },
    },
  };
}

export async function getSeasonalAnimeAniList(
  year?: number,
  season?: string,
  params: { page?: number; limit?: number } = {}
): Promise<JikanResponse<Anime[]>> {
  const page = params.page || 1;
  const perPage = params.limit || 24;
  const seasonStr = season ? season.toUpperCase() : "WINTER";
  const seasonYearInt = year || 2026;

  const query = `
    query ($page: Int, $perPage: Int, $season: MediaSeason, $seasonYear: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo { currentPage hasNextPage lastPage total }
        media(season: $season, seasonYear: $seasonYear, sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
          ${MEDIA_FIELDS}
        }
      }
    }
  `;

  const res = await anilistQuery<any>(query, { page, perPage, season: seasonStr, seasonYear: seasonYearInt });
  const mediaList = res.Page?.media || [];
  const normalized = mediaList.map(normalizeAniListMediaToAnime);

  return {
    data: normalized,
    pagination: {
      current_page: res.Page?.pageInfo?.currentPage || 1,
      has_next_page: res.Page?.pageInfo?.hasNextPage || false,
      last_visible_page: res.Page?.pageInfo?.lastPage || 1,
      items: { count: normalized.length, total: res.Page?.pageInfo?.total || 100, per_page: perPage },
    },
  };
}

export async function getUpcomingAnimeAniList(params: {
  page?: number;
  limit?: number;
}): Promise<JikanResponse<Anime[]>> {
  const page = params.page || 1;
  const perPage = params.limit || 24;

  const query = `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo { currentPage hasNextPage lastPage total }
        media(status: NOT_YET_RELEASED, sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
          ${MEDIA_FIELDS}
        }
      }
    }
  `;

  const res = await anilistQuery<any>(query, { page, perPage });
  const mediaList = res.Page?.media || [];
  const normalized = mediaList.map(normalizeAniListMediaToAnime);

  return {
    data: normalized,
    pagination: {
      current_page: res.Page?.pageInfo?.currentPage || 1,
      has_next_page: res.Page?.pageInfo?.hasNextPage || false,
      last_visible_page: res.Page?.pageInfo?.lastPage || 1,
      items: { count: normalized.length, total: res.Page?.pageInfo?.total || 100, per_page: perPage },
    },
  };
}

export async function searchAnimeAniList(params: {
  q?: string;
  page?: number;
  limit?: number;
  genres?: string;
  type?: string;
}): Promise<JikanResponse<Anime[]>> {
  const page = params.page || 1;
  const perPage = params.limit || 24;
  const searchStr = params.q || undefined;

  const query = `
    query ($page: Int, $perPage: Int, $search: String) {
      Page(page: $page, perPage: $perPage) {
        pageInfo { currentPage hasNextPage lastPage total }
        media(search: $search, sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
          ${MEDIA_FIELDS}
        }
      }
    }
  `;

  const res = await anilistQuery<any>(query, { page, perPage, search: searchStr });
  const mediaList = res.Page?.media || [];
  const normalized = mediaList.map(normalizeAniListMediaToAnime);

  return {
    data: normalized,
    pagination: {
      current_page: res.Page?.pageInfo?.currentPage || 1,
      has_next_page: res.Page?.pageInfo?.hasNextPage || false,
      last_visible_page: res.Page?.pageInfo?.lastPage || 1,
      items: { count: normalized.length, total: res.Page?.pageInfo?.total || 100, per_page: perPage },
    },
  };
}

export async function getAnimeDetailsAniList(id: number): Promise<JikanResponse<Anime>> {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        ${MEDIA_FIELDS}
        characters(page: 1, perPage: 12) {
          edges {
            role
            node {
              id
              name { full native }
              image { large medium }
            }
            voiceActors(language: JAPANESE) {
              id
              name { full }
              image { large }
              language
            }
          }
        }
        recommendations(page: 1, perPage: 6) {
          nodes {
            mediaRecommendation {
              id
              title { romaji english }
              coverImage { large }
            }
          }
        }
      }
    }
  `;

  const res = await anilistQuery<any>(query, { id });
  const media = res.Media;
  const normalized = normalizeAniListMediaToAnime(media);

  return { data: normalized };
}

export async function getAnimeCharactersAniList(id: number): Promise<JikanResponse<AnimeCharacter[]>> {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        characters(page: 1, perPage: 12) {
          edges {
            role
            node {
              id
              name { full native }
              image { large medium }
            }
            voiceActors(language: JAPANESE) {
              id
              name { full }
              image { large }
              language
            }
          }
        }
      }
    }
  `;

  const res = await anilistQuery<any>(query, { id });
  const edges = res.Media?.characters?.edges || [];

  const mapped: AnimeCharacter[] = edges.map((e: any) => ({
    character: {
      mal_id: e.node.id,
      url: `https://anilist.co/character/${e.node.id}`,
      name: e.node.name?.full || "Character",
      images: {
        jpg: {
          image_url: e.node.image?.large || e.node.image?.medium || "/placeholder.jpg",
        },
      },
    },
    role: e.role === "MAIN" ? "Main" : "Supporting",
    voice_actors: e.voiceActors?.length
      ? e.voiceActors.map((va: any) => ({
          person: {
            mal_id: va.id,
            url: `https://anilist.co/staff/${va.id}`,
            name: va.name?.full || "Voice Actor",
            images: { jpg: { image_url: va.image?.large || "/placeholder.jpg" } },
          },
          language: va.language || "Japanese",
        }))
      : [],
  }));

  return { data: mapped };
}
