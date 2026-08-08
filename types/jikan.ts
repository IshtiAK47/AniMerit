export interface JikanImageFormats {
  jpg: {
    image_url: string;
    small_image_url?: string;
    large_image_url?: string;
  };
  webp?: {
    image_url: string;
    small_image_url?: string;
    large_image_url?: string;
  };
}

export interface JikanNamedResource {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface JikanBroadcast {
  day?: string;
  time?: string;
  timezone?: string;
  string?: string;
}

export interface JikanAired {
  from: string;
  to: string | null;
  string: string;
}

export interface JikanTrailer {
  youtube_id?: string;
  url?: string;
  embed_url?: string;
  images?: {
    image_url?: string;
    small_image_url?: string;
    medium_image_url?: string;
    large_image_url?: string;
    maximum_image_url?: string;
  };
}

export interface Anime {
  mal_id: number;
  url: string;
  images: JikanImageFormats;
  trailer: JikanTrailer;
  approved: boolean;
  titles: Array<{ type: string; title: string }>;
  title: string;
  title_english?: string | null;
  title_japanese?: string | null;
  title_synonyms?: string[];
  type?: string;
  source?: string;
  episodes?: number | null;
  status?: string;
  airing: boolean;
  aired: JikanAired;
  duration?: string;
  rating?: string;
  score?: number | null;
  scored_by?: number | null;
  rank?: number | null;
  popularity?: number | null;
  members?: number | null;
  favorites?: number | null;
  synopsis?: string | null;
  background?: string | null;
  season?: string | null;
  year?: number | null;
  broadcast?: JikanBroadcast;
  producers?: JikanNamedResource[];
  licensors?: JikanNamedResource[];
  studios?: JikanNamedResource[];
  genres: JikanNamedResource[];
  explicit_genres?: JikanNamedResource[];
  themes?: JikanNamedResource[];
  demographics?: JikanNamedResource[];
}

export interface AnimeCharacter {
  character: {
    mal_id: number;
    url: string;
    images: JikanImageFormats;
    name: string;
  };
  role: "Main" | "Supporting";
  favorites?: number;
  voice_actors: Array<{
    person: {
      mal_id: number;
      url: string;
      images: JikanImageFormats;
      name: string;
    };
    language: string;
  }>;
}

export interface CharacterDetail {
  mal_id: number;
  url: string;
  images: JikanImageFormats;
  name: string;
  name_kanji?: string | null;
  nicknames?: string[];
  favorites?: number;
  about?: string | null;
  anime?: Array<{
    role: string;
    anime: {
      mal_id: number;
      url: string;
      images: JikanImageFormats;
      title: string;
    };
  }>;
  voices?: Array<{
    language: string;
    person: {
      mal_id: number;
      url: string;
      images: JikanImageFormats;
      name: string;
    };
  }>;
}

export interface Genre {
  mal_id: number;
  name: string;
  url: string;
  count: number;
}

export interface Recommendation {
  entry: {
    mal_id: number;
    url: string;
    images: JikanImageFormats;
    title: string;
  };
  votes: number;
}

export interface Relation {
  relation: string;
  entry: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
}

export interface AnimeThemes {
  openings: string[];
  endings: string[];
}

export interface AnimeStatistics {
  watching: number;
  completed: number;
  on_hold: number;
  dropped: number;
  plan_to_watch: number;
  total: number;
  scores: Array<{
    score: number;
    count: number;
    percentage: number;
  }>;
}

export interface AnimePictures {
  jpg: { image_url: string; large_image_url?: string; small_image_url?: string };
}

export interface AnimeQuote {
  quote: string;
  character: string;
  anime: string;
}

export interface JikanPagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

export interface JikanResponse<T> {
  data: T;
  pagination?: JikanPagination;
}
