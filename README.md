# AniMerit

**A modern anime discovery platform built with Next.js and Jikan API.**

AniMerit makes it easy to discover top-rated, currently airing, seasonal, and popular anime through a clean and responsive interface.

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Jikan-API-7C3AED" alt="Jikan API" />
</p>

---

## Features

* Browse top-rated anime and movies
* Discover currently airing series
* Explore seasonal anime
* Search anime with instant results
* Detailed anime and character pages
* Ratings, rankings, genres, studios, episodes, and other metadata
* Anime recommendations and related titles
* Save favorites locally
* Responsive design for desktop, tablet, and mobile
* Smooth animations and modern UI
* Dark interface with customizable accent colors
* Keyboard-friendly navigation
* Optimized API fetching and caching

---

## Tech Stack

| Technology         | Purpose                   |
| ------------------ | ------------------------- |
| **Next.js**        | Application framework     |
| **React**          | UI                        |
| **TypeScript**     | Type-safe development     |
| **Tailwind CSS**   | Styling                   |
| **TanStack Query** | Data fetching and caching |
| **Axios**          | API requests              |
| **Framer Motion**  | Animations                |
| **Lucide React**   | Icons                     |
| **Jikan API**      | Anime data                |

---

## API

AniMerit uses the [Jikan API](https://jikan.moe/), an unofficial REST API for MyAnimeList.

No API key is required.

API base URL:

```text
https://api.jikan.moe/v4
```

---

## Getting Started

### Prerequisites

* Node.js 18.17+
* npm, pnpm, yarn, or Bun

### Installation

Clone the repository:

```bash
git clone https://github.com/IshtiAK47/AniMerit.git
cd AniMerit
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### Production

```bash
npm run build
npm run start
```

---

## Project Structure

```text
AniMerit/
├── app/            # Pages and routes
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── lib/            # Utilities and API helpers
├── providers/      # Application providers
├── services/       # API services
├── types/          # TypeScript types
├── utils/          # Utility functions
└── public/         # Static assets
```

---

## 🏗 Architecture

```mermaid
flowchart TD
    User([User Device / Mobile]) --> Navbar[Navbar / MobileBottomNav]
    Navbar --> ApiSelector[ApiSelector Component]
    ApiSelector -->|State: jikan / anilist| ApiProviderContext[ApiProviderContext]
    
    ApiProviderContext --> UnifiedAPI[Unified API Router: services/unifiedApi.ts]
    
    UnifiedAPI -->|if provider == 'anilist'| AniListAPI[AniList GraphQL API]
    UnifiedAPI -->|if provider == 'jikan'| JikanAPI[Jikan REST API v4]
    
    AniListAPI -->|GraphQL Response| Normalizer[Data Normalizer: lib/anilist.ts]
    JikanAPI -->|REST JSON| Normalizer
    
    Normalizer -->|Unified Anime Model| UI[React 19 Pages & Components]
    UI --> Cache[(TanStack Query Cache + LocalStorage)]
```

---

## Contributing

Contributions, suggestions, and bug reports are welcome.

If you'd like to contribute:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Commit your changes
5. Open a pull request

---

## License

This project is licensed under the MIT License.

