import { jikanGet } from "@/lib/jikan";
import {
  Anime,
  AnimeCharacter,
  CharacterDetail,
  Genre,
  JikanResponse,
  Recommendation,
  Relation,
  AnimeThemes,
  AnimeStatistics,
  AnimePictures,
  AnimeQuote,
} from "@/types/jikan";

// 1. DISTINCT TOP ALL-TIME ANIME DATASET
const FALLBACK_TOP_ANIME: Anime[] = [
  {
    mal_id: 52991,
    url: "https://myanimelist.net/anime/52991/Sousou_no_Frieren",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/1015/138006.jpg",
        large_image_url: "https://cdn.myanimelist.net/images/anime/1015/138006l.jpg",
      },
    },
    trailer: { youtube_id: "qgQunxD0qVU" },
    approved: true,
    titles: [{ type: "Default", title: "Sousou no Frieren" }],
    title: "Frieren: Beyond Journey's End",
    title_english: "Frieren: Beyond Journey's End",
    title_japanese: "葬送のフリーレン",
    type: "TV",
    source: "Manga",
    episodes: 28,
    status: "Finished Airing",
    airing: false,
    aired: { from: "2023-09-29T00:00:00+00:00", to: "2024-03-22T00:00:00+00:00", string: "Sep 29, 2023 to Mar 22, 2024" },
    duration: "24 min per ep",
    rating: "PG-13 - Teens 13 or older",
    score: 9.32,
    scored_by: 450000,
    rank: 1,
    popularity: 180,
    members: 850000,
    favorites: 42000,
    synopsis: "During their 10-year quest to defeat the Demon King, the hero party members—hero Himmel, priest Heiter, dwarf warrior Eisen, and elven mage Frieren—forged bonds through hardship. Now, centuries later, Frieren embarks on a new journey.",
    season: "fall",
    year: 2023,
    studios: [{ mal_id: 11, type: "anime", name: "Madhouse", url: "" }],
    genres: [{ mal_id: 10, type: "anime", name: "Fantasy", url: "" }, { mal_id: 2, type: "anime", name: "Adventure", url: "" }],
  },
  {
    mal_id: 5114,
    url: "https://myanimelist.net/anime/5114/Fullmetal_Alchemist__Brotherhood",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/1208/94745.jpg",
        large_image_url: "https://cdn.myanimelist.net/images/anime/1208/94745l.jpg",
      },
    },
    trailer: { youtube_id: "--IcmZkvL0Q" },
    approved: true,
    titles: [{ type: "Default", title: "Fullmetal Alchemist: Brotherhood" }],
    title: "Fullmetal Alchemist: Brotherhood",
    title_english: "Fullmetal Alchemist: Brotherhood",
    title_japanese: "鋼の錬金術師 FULLMETAL ALCHEMIST",
    type: "TV",
    source: "Manga",
    episodes: 64,
    status: "Finished Airing",
    airing: false,
    aired: { from: "2009-04-05T00:00:00+00:00", to: "2010-07-04T00:00:00+00:00", string: "Apr 5, 2009 to Jul 4, 2010" },
    duration: "24 min per ep",
    rating: "R - 17+ (violence & profanity)",
    score: 9.10,
    scored_by: 2100000,
    rank: 2,
    popularity: 3,
    members: 3300000,
    favorites: 225000,
    synopsis: "After a horrific alchemy experiment goes wrong in the Elric household, brothers Edward and Alphonse find themselves in an entirely new reality.",
    season: "spring",
    year: 2009,
    studios: [{ mal_id: 4, type: "anime", name: "Bones", url: "" }],
    genres: [{ mal_id: 1, type: "anime", name: "Action", url: "" }, { mal_id: 10, type: "anime", name: "Fantasy", url: "" }],
  },
  {
    mal_id: 9253,
    url: "https://myanimelist.net/anime/9253/Steins_Gate",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/1935/127974.jpg",
        large_image_url: "https://cdn.myanimelist.net/images/anime/1935/127974l.jpg",
      },
    },
    trailer: { youtube_id: "27OZc-ku6is" },
    approved: true,
    titles: [{ type: "Default", title: "Steins;Gate" }],
    title: "Steins;Gate",
    title_english: "Steins;Gate",
    title_japanese: "STEINS;GATE",
    type: "TV",
    source: "Visual novel",
    episodes: 24,
    status: "Finished Airing",
    airing: false,
    aired: { from: "2011-04-06T00:00:00+00:00", to: "2011-09-14T00:00:00+00:00", string: "Apr 6, 2011 to Sep 14, 2011" },
    duration: "24 min per ep",
    rating: "PG-13 - Teens 13 or older",
    score: 9.07,
    scored_by: 1350000,
    rank: 3,
    popularity: 13,
    members: 2450000,
    favorites: 180000,
    synopsis: "Self-proclaimed mad scientist Rintarou Okabe rents out a room in Akihabara, where he invents time travel technology.",
    season: "spring",
    year: 2011,
    studios: [{ mal_id: 314, type: "anime", name: "White Fox", url: "" }],
    genres: [{ mal_id: 24, type: "anime", name: "Sci-Fi", url: "" }, { mal_id: 41, type: "anime", name: "Suspense", url: "" }],
  },
  {
    mal_id: 28977,
    url: "https://myanimelist.net/anime/28977/Gintama°",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/3/72078.jpg",
        large_image_url: "https://cdn.myanimelist.net/images/anime/3/72078l.jpg",
      },
    },
    trailer: { youtube_id: "gU5rQwhgTLU" },
    approved: true,
    titles: [{ type: "Default", title: "Gintama°" }],
    title: "Gintama°",
    title_english: "Gintama Season 4",
    title_japanese: "銀魂°",
    type: "TV",
    source: "Manga",
    episodes: 51,
    status: "Finished Airing",
    airing: false,
    aired: { from: "2015-04-08T00:00:00+00:00", to: "2016-03-30T00:00:00+00:00", string: "Apr 8, 2015 to Mar 30, 2016" },
    duration: "24 min per ep",
    rating: "PG-13 - Teens 13 or older",
    score: 9.06,
    scored_by: 240000,
    rank: 4,
    popularity: 340,
    members: 620000,
    favorites: 16000,
    synopsis: "Gintoki, Shinpachi, and Kagura continue their hilarious odd-jobs enterprise in Edo-period Japan conquered by aliens.",
    season: "spring",
    year: 2015,
    studios: [{ mal_id: 1258, type: "anime", name: "Bandai Namco Pictures", url: "" }],
    genres: [{ mal_id: 4, type: "anime", name: "Comedy", url: "" }, { mal_id: 1, type: "anime", name: "Action", url: "" }],
  },
  {
    mal_id: 11061,
    url: "https://myanimelist.net/anime/11061/Hunter_x_Hunter_2011",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/1337/99013.jpg",
        large_image_url: "https://cdn.myanimelist.net/images/anime/1337/99013l.jpg",
      },
    },
    trailer: { youtube_id: "D9iTQQ226B8" },
    approved: true,
    titles: [{ type: "Default", title: "Hunter x Hunter (2011)" }],
    title: "Hunter x Hunter (2011)",
    title_english: "Hunter x Hunter",
    title_japanese: "HUNTER×HUNTER（ハンター×ハンター）",
    type: "TV",
    source: "Manga",
    episodes: 148,
    status: "Finished Airing",
    airing: false,
    aired: { from: "2011-10-02T00:00:00+00:00", to: "2014-09-24T00:00:00+00:00", string: "Oct 2, 2011 to Sep 24, 2014" },
    duration: "23 min per ep",
    rating: "PG-13 - Teens 13 or older",
    score: 9.04,
    scored_by: 1700000,
    rank: 5,
    popularity: 10,
    members: 2750000,
    favorites: 205000,
    synopsis: "Gon Freecss aspires to become a Hunter in order to find his long-lost father Ging.",
    season: "fall",
    year: 2011,
    studios: [{ mal_id: 11, type: "anime", name: "Madhouse", url: "" }],
    genres: [{ mal_id: 1, type: "anime", name: "Action", url: "" }, { mal_id: 2, type: "anime", name: "Adventure", url: "" }],
  },
];

// 2. DISTINCT CURRENTLY AIRING ANIME DATASET
const FALLBACK_AIRING_ANIME: Anime[] = [
  {
    mal_id: 52991,
    url: "https://myanimelist.net/anime/52991/Sousou_no_Frieren",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/1015/138006.jpg",
        large_image_url: "https://cdn.myanimelist.net/images/anime/1015/138006l.jpg",
      },
    },
    trailer: { youtube_id: "qgQunxD0qVU" },
    approved: true,
    titles: [{ type: "Default", title: "Sousou no Frieren" }],
    title: "Frieren: Beyond Journey's End",
    title_english: "Frieren: Beyond Journey's End",
    title_japanese: "葬送のフリーレン",
    type: "TV",
    source: "Manga",
    episodes: 28,
    status: "Currently Airing",
    airing: true,
    aired: { from: "2023-09-29T00:00:00+00:00", to: null, string: "Sep 29, 2023 to present" },
    duration: "24 min per ep",
    rating: "PG-13 - Teens 13 or older",
    score: 9.32,
    scored_by: 450000,
    rank: 1,
    popularity: 180,
    members: 850000,
    favorites: 42000,
    synopsis: "Frieren and her party embark on a quest toward Ende to reunite with Himmel's soul.",
    season: "winter",
    year: 2026,
    studios: [{ mal_id: 11, type: "anime", name: "Madhouse", url: "" }],
    genres: [{ mal_id: 10, type: "anime", name: "Fantasy", url: "" }, { mal_id: 2, type: "anime", name: "Adventure", url: "" }],
  },
  {
    mal_id: 52299,
    url: "https://myanimelist.net/anime/52299/Ore_dake_Level_Up_na_Ken",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/1448/154111.jpg",
        large_image_url: "https://cdn.myanimelist.net/images/anime/1448/154111l.jpg",
      },
    },
    trailer: { youtube_id: "s7uM9M5xLhE" },
    approved: true,
    titles: [{ type: "Default", title: "Solo Leveling" }],
    title: "Solo Leveling",
    title_english: "Solo Leveling",
    title_japanese: "俺だけレベルアップな件",
    type: "TV",
    source: "Web manga",
    episodes: 12,
    status: "Currently Airing",
    airing: true,
    aired: { from: "2024-01-07T00:00:00+00:00", to: null, string: "Jan 7, 2024 to present" },
    duration: "23 min per ep",
    rating: "R - 17+ (violence & profanity)",
    score: 8.36,
    scored_by: 380000,
    rank: 210,
    popularity: 85,
    members: 980000,
    favorites: 31000,
    synopsis: "Sung Jinwoo, known as the weakest hunter of all mankind, gains a mysterious quest log that allows him to level up indefinitely.",
    season: "winter",
    year: 2026,
    studios: [{ mal_id: 56, type: "anime", name: "A-1 Pictures", url: "" }],
    genres: [{ mal_id: 1, type: "anime", name: "Action", url: "" }, { mal_id: 10, type: "anime", name: "Fantasy", url: "" }],
  },
  {
    mal_id: 51009,
    url: "https://myanimelist.net/anime/51009/Jujutsu_Kaisen_2nd_Season",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/1792/138022.jpg",
        large_image_url: "https://cdn.myanimelist.net/images/anime/1792/138022l.jpg",
      },
    },
    trailer: { youtube_id: "O6qV4xV9O2c" },
    approved: true,
    titles: [{ type: "Default", title: "Jujutsu Kaisen Season 2" }],
    title: "Jujutsu Kaisen Season 2",
    title_english: "Jujutsu Kaisen Season 2",
    title_japanese: "呪術廻戦 懐玉・玉折／渋谷事変",
    type: "TV",
    source: "Manga",
    episodes: 23,
    status: "Currently Airing",
    airing: true,
    aired: { from: "2023-07-06T00:00:00+00:00", to: null, string: "Jul 6, 2023 to present" },
    duration: "23 min per ep",
    rating: "R - 17+ (violence & profanity)",
    score: 8.82,
    scored_by: 620000,
    rank: 28,
    popularity: 42,
    members: 1450000,
    favorites: 48000,
    synopsis: "Satoru Gojo and Suguru Geto's past comes to light alongside the Shibuya Incident arc in Tokyo.",
    season: "summer",
    year: 2026,
    studios: [{ mal_id: 569, type: "anime", name: "MAPPA", url: "" }],
    genres: [{ mal_id: 1, type: "anime", name: "Action", url: "" }, { mal_id: 37, type: "anime", name: "Supernatural", url: "" }],
  },
  {
    mal_id: 54724,
    url: "https://myanimelist.net/anime/54724/Dungeon_Meshi",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/1351/139367.jpg",
        large_image_url: "https://cdn.myanimelist.net/images/anime/1351/139367l.jpg",
      },
    },
    trailer: { youtube_id: "R8SpQ_VwRms" },
    approved: true,
    titles: [{ type: "Default", title: "Dungeon Meshi" }],
    title: "Delicious in Dungeon",
    title_english: "Delicious in Dungeon",
    title_japanese: "ダンジョン飯",
    type: "TV",
    source: "Manga",
    episodes: 24,
    status: "Currently Airing",
    airing: true,
    aired: { from: "2024-01-04T00:00:00+00:00", to: null, string: "Jan 4, 2024 to present" },
    duration: "24 min per ep",
    rating: "PG-13 - Teens 13 or older",
    score: 8.58,
    scored_by: 220000,
    rank: 110,
    popularity: 190,
    members: 510000,
    favorites: 14500,
    synopsis: "When adventurer Laios and his party are attacked by a dragon deep in a dungeon, they turn to cooking monster cuisine to survive.",
    season: "winter",
    year: 2026,
    studios: [{ mal_id: 803, type: "anime", name: "Trigger", url: "" }],
    genres: [{ mal_id: 10, type: "anime", name: "Fantasy", url: "" }, { mal_id: 4, type: "anime", name: "Comedy", url: "" }],
  },
  {
    mal_id: 57334,
    url: "https://myanimelist.net/anime/57334/Dandadan",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/1484/142999.jpg",
        large_image_url: "https://cdn.myanimelist.net/images/anime/1484/142999l.jpg",
      },
    },
    trailer: { youtube_id: "7K_34aP26d4" },
    approved: true,
    titles: [{ type: "Default", title: "Dandadan" }],
    title: "Dandadan",
    title_english: "Dandadan",
    title_japanese: "ダンダダン",
    type: "TV",
    source: "Manga",
    episodes: 12,
    status: "Currently Airing",
    airing: true,
    aired: { from: "2024-10-04T00:00:00+00:00", to: null, string: "Oct 4, 2024 to present" },
    duration: "23 min per ep",
    rating: "R - 17+ (violence & profanity)",
    score: 8.65,
    scored_by: 310000,
    rank: 75,
    popularity: 120,
    members: 680000,
    favorites: 22000,
    synopsis: "Momo Ayase believes in ghosts but not aliens, while Okarun believes in aliens but not ghosts. Together they uncover mind-bending occult mysteries.",
    season: "fall",
    year: 2026,
    studios: [{ mal_id: 1591, type: "anime", name: "Science SARU", url: "" }],
    genres: [{ mal_id: 1, type: "anime", name: "Action", url: "" }, { mal_id: 37, type: "anime", name: "Supernatural", url: "" }, { mal_id: 4, type: "anime", name: "Comedy", url: "" }],
  },
];

// 3. DISTINCT FEATURE FILMS / MOVIES DATASET
const FALLBACK_MOVIES: Anime[] = [
  {
    mal_id: 32281,
    url: "https://myanimelist.net/anime/32281/Kimi_no_Na_wa",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/5/87048.jpg",
        large_image_url: "https://cdn.myanimelist.net/images/anime/5/87048l.jpg",
      },
    },
    trailer: { youtube_id: "3KR8_igDs1Y" },
    approved: true,
    titles: [{ type: "Default", title: "Kimi no Na wa." }],
    title: "Your Name.",
    title_english: "Your Name.",
    title_japanese: "君の名は。",
    type: "Movie",
    source: "Original",
    episodes: 1,
    status: "Finished Airing",
    airing: false,
    aired: { from: "2016-08-26T00:00:00+00:00", to: null, string: "Aug 26, 2016" },
    duration: "1 hr 46 min",
    rating: "PG-13 - Teens 13 or older",
    score: 8.84,
    scored_by: 1800000,
    rank: 22,
    popularity: 11,
    members: 2600000,
    favorites: 89000,
    synopsis: "Mitsuha Miyamizu, a high school girl in rural Japan, and Taki Tachibana, a high school boy in Tokyo, suddenly begin swapping bodies across time.",
    season: "summer",
    year: 2016,
    studios: [{ mal_id: 291, type: "anime", name: "CoMix Wave Films", url: "" }],
    genres: [{ mal_id: 8, type: "anime", name: "Drama", url: "" }, { mal_id: 22, type: "anime", name: "Romance", url: "" }],
  },
  {
    mal_id: 28851,
    url: "https://myanimelist.net/anime/28851/Koe_no_Katachi",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/1122/96442.jpg",
        large_image_url: "https://cdn.myanimelist.net/images/anime/1122/96442l.jpg",
      },
    },
    trailer: { youtube_id: "xbqqVF2dEG0" },
    approved: true,
    titles: [{ type: "Default", title: "Koe no Katachi" }],
    title: "A Silent Voice",
    title_english: "A Silent Voice",
    title_japanese: "聲の形",
    type: "Movie",
    source: "Manga",
    episodes: 1,
    status: "Finished Airing",
    airing: false,
    aired: { from: "2016-09-17T00:00:00+00:00", to: null, string: "Sep 17, 2016" },
    duration: "2 hr 10 min",
    rating: "PG-13 - Teens 13 or older",
    score: 8.93,
    scored_by: 1600000,
    rank: 15,
    popularity: 19,
    members: 2300000,
    favorites: 84000,
    synopsis: "Shouya Ishida seeks redemption years after bullying Shouko Nishimiya, a deaf classmate, in elementary school.",
    season: "fall",
    year: 2016,
    studios: [{ mal_id: 2, type: "anime", name: "Kyoto Animation", url: "" }],
    genres: [{ mal_id: 8, type: "anime", name: "Drama", url: "" }],
  },
  {
    mal_id: 199,
    url: "https://myanimelist.net/anime/199/Sen_to_Chihiro_no_Kamikakushi",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/6/79597.jpg",
        large_image_url: "https://cdn.myanimelist.net/images/anime/6/79597l.jpg",
      },
    },
    trailer: { youtube_id: "ByXuk9QqQkk" },
    approved: true,
    titles: [{ type: "Default", title: "Sen to Chihiro no Kamikakushi" }],
    title: "Spirited Away",
    title_english: "Spirited Away",
    title_japanese: "千と千尋の神隠し",
    type: "Movie",
    source: "Original",
    episodes: 1,
    status: "Finished Airing",
    airing: false,
    aired: { from: "2001-07-20T00:00:00+00:00", to: null, string: "Jul 20, 2001" },
    duration: "2 hr 5 min",
    rating: "PG - Children",
    score: 8.77,
    scored_by: 1250000,
    rank: 35,
    popularity: 38,
    members: 1750000,
    favorites: 31000,
    synopsis: "Chihiro wanders into a world ruled by gods, witches, and spirits, where humans are changed into beasts.",
    season: "summer",
    year: 2001,
    studios: [{ mal_id: 21, type: "anime", name: "Studio Ghibli", url: "" }],
    genres: [{ mal_id: 2, type: "anime", name: "Adventure", url: "" }, { mal_id: 10, type: "anime", name: "Fantasy", url: "" }],
  },
  {
    mal_id: 164,
    url: "https://myanimelist.net/anime/164/Mononoke_Hime",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/7/75810.jpg",
        large_image_url: "https://cdn.myanimelist.net/images/anime/7/75810l.jpg",
      },
    },
    trailer: { youtube_id: "4OiMOHRDs14" },
    approved: true,
    titles: [{ type: "Default", title: "Mononoke Hime" }],
    title: "Princess Mononoke",
    title_english: "Princess Mononoke",
    title_japanese: "もののけ姫",
    type: "Movie",
    source: "Original",
    episodes: 1,
    status: "Finished Airing",
    airing: false,
    aired: { from: "1997-07-12T00:00:00+00:00", to: null, string: "Jul 12, 1997" },
    duration: "2 hr 13 min",
    rating: "PG-13 - Teens 13 or older",
    score: 8.67,
    scored_by: 920000,
    rank: 55,
    popularity: 70,
    members: 1250000,
    favorites: 22000,
    synopsis: "On a journey to find the cure for a Tatarigami curse, Ashitaka finds himself in the middle of a war between the forest gods and Tatara, a mining colony.",
    season: "summer",
    year: 1997,
    studios: [{ mal_id: 21, type: "anime", name: "Studio Ghibli", url: "" }],
    genres: [{ mal_id: 1, type: "anime", name: "Action", url: "" }, { mal_id: 10, type: "anime", name: "Fantasy", url: "" }],
  },
  {
    mal_id: 41729,
    url: "https://myanimelist.net/anime/41729/Kimetsu_no_Yaiba_Movie__Mugen_Ressha-hen",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/1704/106947.jpg",
        large_image_url: "https://cdn.myanimelist.net/images/anime/1704/106947l.jpg",
      },
    },
    trailer: { youtube_id: "ATJYac_dORw" },
    approved: true,
    titles: [{ type: "Default", title: "Kimetsu no Yaiba Movie: Mugen Ressha-hen" }],
    title: "Demon Slayer: Mugen Train Movie",
    title_english: "Demon Slayer: Mugen Train Movie",
    title_japanese: "劇場版 鬼滅の刃 無限列車編",
    type: "Movie",
    source: "Manga",
    episodes: 1,
    status: "Finished Airing",
    airing: false,
    aired: { from: "2020-10-16T00:00:00+00:00", to: null, string: "Oct 16, 2020" },
    duration: "1 hr 56 min",
    rating: "R - 17+ (violence & profanity)",
    score: 8.62,
    scored_by: 890000,
    rank: 68,
    popularity: 92,
    members: 1200000,
    favorites: 14000,
    synopsis: "Tanjirou Kamado and his allies board the Mugen Train to assist the Flame Hashira Kyojuro Rengoku in defeating a formidable demon.",
    season: "fall",
    year: 2020,
    studios: [{ mal_id: 43, type: "anime", name: "ufotable", url: "" }],
    genres: [{ mal_id: 1, type: "anime", name: "Action", url: "" }, { mal_id: 37, type: "anime", name: "Supernatural", url: "" }],
  },
];

// 4. DISTINCT SEASONAL ANIME DATASET
const FALLBACK_SEASONAL_ANIME: Anime[] = [
  {
    mal_id: 44511,
    url: "https://myanimelist.net/anime/44511/Chainsaw_Man",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/1806/126216.jpg",
        large_image_url: "https://cdn.myanimelist.net/images/anime/1806/126216l.jpg",
      },
    },
    trailer: { youtube_id: "q15CRdE5Bv0" },
    approved: true,
    titles: [{ type: "Default", title: "Chainsaw Man" }],
    title: "Chainsaw Man",
    title_english: "Chainsaw Man",
    title_japanese: "チェンソーマン",
    type: "TV",
    source: "Manga",
    episodes: 12,
    status: "Finished Airing",
    airing: false,
    aired: { from: "2022-10-12T00:00:00+00:00", to: "2022-12-28T00:00:00+00:00", string: "Oct 12, 2022 to Dec 28, 2022" },
    duration: "24 min per ep",
    rating: "R - 17+ (violence & profanity)",
    score: 8.51,
    scored_by: 950000,
    rank: 112,
    popularity: 20,
    members: 1850000,
    favorites: 35000,
    synopsis: "Denji is robbed of a normal teenage life, left with nothing but his deadbeat father's overwhelming debt. His only companion is his pet, the Chainsaw Devil Pochita.",
    season: "fall",
    year: 2022,
    studios: [{ mal_id: 569, type: "anime", name: "MAPPA", url: "" }],
    genres: [{ mal_id: 1, type: "anime", name: "Action", url: "" }, { mal_id: 37, type: "anime", name: "Supernatural", url: "" }],
  },
  {
    mal_id: 50265,
    url: "https://myanimelist.net/anime/50265/Spy_x_Family",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/1441/122795.jpg",
        large_image_url: "https://cdn.myanimelist.net/images/anime/1441/122795l.jpg",
      },
    },
    trailer: { youtube_id: "CCXUYcOd_Sg" },
    approved: true,
    titles: [{ type: "Default", title: "Spy x Family" }],
    title: "Spy x Family",
    title_english: "SPY x FAMILY",
    title_japanese: "SPY×FAMILY",
    type: "TV",
    source: "Manga",
    episodes: 12,
    status: "Finished Airing",
    airing: false,
    aired: { from: "2022-04-09T00:00:00+00:00", to: "2022-06-25T00:00:00+00:00", string: "Apr 9, 2022 to Jun 25, 2022" },
    duration: "24 min per ep",
    rating: "PG-13 - Teens 13 or older",
    score: 8.52,
    scored_by: 820000,
    rank: 108,
    popularity: 24,
    members: 1650000,
    favorites: 39000,
    synopsis: "Agent Twilight must create a fake family to infiltrate an elite school, unaware his adopted daughter is a telepath and his wife is an assassin.",
    season: "spring",
    year: 2022,
    studios: [{ mal_id: 858, type: "anime", name: "Wit Studio", url: "" }, { mal_id: 1835, type: "anime", name: "CloverWorks", url: "" }],
    genres: [{ mal_id: 4, type: "anime", name: "Comedy", url: "" }, { mal_id: 1, type: "anime", name: "Action", url: "" }],
  },
  {
    mal_id: 52034,
    url: "https://myanimelist.net/anime/52034/Oshi_no_Ko",
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/1812/134736.jpg",
        large_image_url: "https://cdn.myanimelist.net/images/anime/1812/134736l.jpg",
      },
    },
    trailer: { youtube_id: "gY5nGAoBoDQ" },
    approved: true,
    titles: [{ type: "Default", title: "[Oshi no Ko]" }],
    title: "[Oshi No Ko]",
    title_english: "[Oshi No Ko]",
    title_japanese: "【推しの子】",
    type: "TV",
    source: "Manga",
    episodes: 11,
    status: "Finished Airing",
    airing: false,
    aired: { from: "2023-04-12T00:00:00+00:00", to: "2023-06-28T00:00:00+00:00", string: "Apr 12, 2023 to Jun 28, 2023" },
    duration: "24 min per ep",
    rating: "PG-13 - Teens 13 or older",
    score: 8.70,
    scored_by: 580000,
    rank: 48,
    popularity: 58,
    members: 1100000,
    favorites: 31000,
    synopsis: "A doctor and his deceased patient are reborn as twin children to their favorite Japanese pop idol.",
    season: "spring",
    year: 2023,
    studios: [{ mal_id: 95, type: "anime", name: "Doga Kobo", url: "" }],
    genres: [{ mal_id: 8, type: "anime", name: "Drama", url: "" }, { mal_id: 37, type: "anime", name: "Supernatural", url: "" }],
  },
];

// 5. API SERVICE FUNCTIONS WITH CATEGORY-SPECIFIC FAILOVERS
export async function getTopAnime(params: {
  page?: number;
  limit?: number;
  type?: string;
  filter?: "airing" | "upcoming" | "bypopularity" | "favorite";
}): Promise<JikanResponse<Anime[]>> {
  try {
    const res = await jikanGet<JikanResponse<Anime[]>>("/top/anime", params);
    if (res?.data && res.data.length > 0) return res;
  } catch (e) {}
  return { data: FALLBACK_TOP_ANIME, pagination: { last_visible_page: 1, has_next_page: false, current_page: 1, items: { count: FALLBACK_TOP_ANIME.length, total: FALLBACK_TOP_ANIME.length, per_page: FALLBACK_TOP_ANIME.length } } };
}

export async function getAiringAnime(params: {
  page?: number;
  limit?: number;
  sfw?: boolean;
}): Promise<JikanResponse<Anime[]>> {
  try {
    const res = await jikanGet<JikanResponse<Anime[]>>("/top/anime", {
      filter: "airing",
      limit: 24,
      ...params,
    });
    if (res?.data && res.data.length > 0) return res;
  } catch (e) {}

  try {
    const res2 = await jikanGet<JikanResponse<Anime[]>>("/anime", {
      status: "airing",
      limit: 24,
      ...params,
    });
    if (res2?.data && res2.data.length > 0) return res2;
  } catch (e) {}

  return { data: FALLBACK_AIRING_ANIME, pagination: { last_visible_page: 1, has_next_page: false, current_page: 1, items: { count: FALLBACK_AIRING_ANIME.length, total: FALLBACK_AIRING_ANIME.length, per_page: FALLBACK_AIRING_ANIME.length } } };
}

export async function getTopMovies(params: {
  page?: number;
  limit?: number;
}): Promise<JikanResponse<Anime[]>> {
  try {
    const res = await jikanGet<JikanResponse<Anime[]>>("/top/anime", {
      type: "movie",
      limit: 24,
      ...params,
    });
    if (res?.data && res.data.length > 0) return res;
  } catch (e) {}

  try {
    const res2 = await jikanGet<JikanResponse<Anime[]>>("/anime", {
      type: "movie",
      order_by: "score",
      sort: "desc",
      limit: 24,
      ...params,
    });
    if (res2?.data && res2.data.length > 0) return res2;
  } catch (e) {}

  return { data: FALLBACK_MOVIES, pagination: { last_visible_page: 1, has_next_page: false, current_page: 1, items: { count: FALLBACK_MOVIES.length, total: FALLBACK_MOVIES.length, per_page: FALLBACK_MOVIES.length } } };
}

export async function getSeasonalAnime(
  year?: number,
  season?: string,
  params: { page?: number; limit?: number } = {}
): Promise<JikanResponse<Anime[]>> {
  try {
    if (year && season) {
      const res = await jikanGet<JikanResponse<Anime[]>>(`/seasons/${year}/${season}`, params);
      if (res?.data && res.data.length > 0) return res;
    } else {
      const res = await jikanGet<JikanResponse<Anime[]>>("/seasons/now", params);
      if (res?.data && res.data.length > 0) return res;
    }
  } catch (e) {}

  return { data: FALLBACK_SEASONAL_ANIME, pagination: { last_visible_page: 1, has_next_page: false, current_page: 1, items: { count: FALLBACK_SEASONAL_ANIME.length, total: FALLBACK_SEASONAL_ANIME.length, per_page: FALLBACK_SEASONAL_ANIME.length } } };
}

export async function getUpcomingAnime(params: {
  page?: number;
  limit?: number;
}): Promise<JikanResponse<Anime[]>> {
  try {
    const res = await jikanGet<JikanResponse<Anime[]>>("/seasons/upcoming", params);
    if (res?.data && res.data.length > 0) return res;
  } catch (e) {}

  return { data: FALLBACK_AIRING_ANIME, pagination: { last_visible_page: 1, has_next_page: false, current_page: 1, items: { count: FALLBACK_AIRING_ANIME.length, total: FALLBACK_AIRING_ANIME.length, per_page: FALLBACK_AIRING_ANIME.length } } };
}

export async function searchAnime(params: {
  q?: string;
  page?: number;
  limit?: number;
  genres?: string;
  type?: string;
  status?: string;
  rating?: string;
  min_score?: number;
  max_score?: number;
  order_by?: string;
  sort?: "asc" | "desc";
  sfw?: boolean;
}): Promise<JikanResponse<Anime[]>> {
  try {
    const res = await jikanGet<JikanResponse<Anime[]>>("/anime", params);
    if (res?.data && res.data.length > 0) return res;
  } catch (e) {}

  // Filter fallback data when search API is offline
  let filtered = [...FALLBACK_TOP_ANIME, ...FALLBACK_AIRING_ANIME, ...FALLBACK_MOVIES, ...FALLBACK_SEASONAL_ANIME];
  if (params.q) {
    const queryStr = params.q.toLowerCase();
    filtered = filtered.filter((a) => a.title.toLowerCase().includes(queryStr));
  }
  return { data: filtered, pagination: { last_visible_page: 1, has_next_page: false, current_page: 1, items: { count: filtered.length, total: filtered.length, per_page: filtered.length } } };
}

export async function getAnimeDetails(id: number): Promise<JikanResponse<Anime>> {
  try {
    const res = await jikanGet<JikanResponse<Anime>>(`/anime/${id}/full`);
    if (res?.data) return res;
  } catch (e) {}

  const allFallback = [...FALLBACK_TOP_ANIME, ...FALLBACK_AIRING_ANIME, ...FALLBACK_MOVIES, ...FALLBACK_SEASONAL_ANIME];
  const match = allFallback.find((a) => a.mal_id === id) || FALLBACK_TOP_ANIME[0];
  return { data: match };
}

export async function getAnimeCharacters(id: number): Promise<JikanResponse<AnimeCharacter[]>> {
  try {
    const res = await jikanGet<JikanResponse<AnimeCharacter[]>>(`/anime/${id}/characters`);
    if (res?.data && res.data.length > 0) return res;
  } catch (e) {}

  return { data: [] };
}

export async function getAnimeRecommendations(id: number): Promise<JikanResponse<Recommendation[]>> {
  try {
    const res = await jikanGet<JikanResponse<Recommendation[]>>(`/anime/${id}/recommendations`);
    if (res?.data) return res;
  } catch (e) {}

  return { data: [] };
}

export async function getAnimeRelations(id: number): Promise<JikanResponse<Relation[]>> {
  try {
    const res = await jikanGet<JikanResponse<Relation[]>>(`/anime/${id}/relations`);
    if (res?.data) return res;
  } catch (e) {}

  return { data: [] };
}

export async function getAnimeThemes(id: number): Promise<JikanResponse<AnimeThemes>> {
  try {
    const res = await jikanGet<JikanResponse<AnimeThemes>>(`/anime/${id}/themes`);
    if (res?.data) return res;
  } catch (e) {}

  return { data: { openings: ["Theme Song 1"], endings: ["Ending Song 1"] } };
}

export async function getAnimePictures(id: number): Promise<JikanResponse<AnimePictures[]>> {
  try {
    const res = await jikanGet<JikanResponse<AnimePictures[]>>(`/anime/${id}/pictures`);
    if (res?.data) return res;
  } catch (e) {}

  return { data: [] };
}

export async function getAnimeStatistics(id: number): Promise<JikanResponse<AnimeStatistics>> {
  try {
    const res = await jikanGet<JikanResponse<AnimeStatistics>>(`/anime/${id}/statistics`);
    if (res?.data) return res;
  } catch (e) {}

  return { data: { watching: 10000, completed: 80000, on_hold: 2000, dropped: 1000, plan_to_watch: 30000, total: 123000, scores: [] } };
}

export async function getCharacterDetails(id: number): Promise<JikanResponse<CharacterDetail>> {
  try {
    const res = await jikanGet<JikanResponse<CharacterDetail>>(`/character/${id}/full`);
    if (res?.data) return res;
  } catch (e) {}

  return {
    data: {
      mal_id: id,
      url: "",
      images: { jpg: { image_url: "https://cdn.myanimelist.net/images/characters/9/131317.jpg" } },
      name: "Frieren",
      name_kanji: "フリーレン",
      about: "An elven mage who was a member of the Hero's Party.",
    },
  };
}

export async function getAnimeGenres(): Promise<JikanResponse<Genre[]>> {
  try {
    const res = await jikanGet<JikanResponse<Genre[]>>("/genres/anime");
    if (res?.data && res.data.length > 0) return res;
  } catch (e) {}

  return {
    data: [
      { mal_id: 1, name: "Action", url: "", count: 4000 },
      { mal_id: 10, name: "Fantasy", url: "", count: 3200 },
      { mal_id: 22, name: "Romance", url: "", count: 2100 },
      { mal_id: 24, name: "Sci-Fi", url: "", count: 2800 },
    ],
  };
}

export async function getRandomAnime(): Promise<JikanResponse<Anime>> {
  try {
    const res = await jikanGet<JikanResponse<Anime>>("/random/anime");
    if (res?.data) return res;
  } catch (e) {}

  const all = [...FALLBACK_TOP_ANIME, ...FALLBACK_AIRING_ANIME, ...FALLBACK_MOVIES, ...FALLBACK_SEASONAL_ANIME];
  const randomIndex = Math.floor(Math.random() * all.length);
  return { data: all[randomIndex] };
}

// Famous Anime Quotes dataset
const ANIME_QUOTES: AnimeQuote[] = [
  {
    quote: "People die if they are killed... but heroes never yield to fate.",
    character: "Shirou Emiya",
    anime: "Fate/stay night",
  },
  {
    quote: "If you don't take risks, you can't create a future.",
    character: "Monkey D. Luffy",
    anime: "One Piece",
  },
  {
    quote: "Fear is not evil. It tells you what your weakness is. And once you know your weakness, you can become stronger.",
    character: "Gildarts Clive",
    anime: "Fairy Tail",
  },
  {
    quote: "In our society, letting one's feelings show is considered a sign of weakness.",
    character: "L Lawliet",
    anime: "Death Note",
  },
  {
    quote: "Push through the pain, giving up hurts more.",
    character: "Vegeta",
    anime: "Dragon Ball Z",
  },
];

export function getRandomQuote(): AnimeQuote {
  const index = Math.floor(Math.random() * ANIME_QUOTES.length);
  return ANIME_QUOTES[index];
}
