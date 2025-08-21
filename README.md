# AniMerit

AniMerit is a modern web application that displays the **Top 10 currently running anime series and movies**.  
Powered by [Jikan API](https://jikan.moe/), it fetches real-time anime data and presents it in a clean, responsive interface.

## Table of Contents

- [Live Demo](#live-demo)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Running Locally](#running-locally)  
- [Folder Structure](#folder-structure)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Live Demo

Check out AniMerit in action: [ani-merit.vercel.app](https://ani-merit.vercel.app)

---

## Features

- Shows the **Top 10 currently airing anime series and movies**  
- Fetches live data using [Jikan API](https://jikan.moe/)  
- Clean and modern responsive UI  
- Easily extensible for additional filters and features  

---

## Tech Stack

- **Frontend**  
  - **TypeScript**  
  - **React / Next.js**  
  - **Tailwind CSS**

- **API**  
  - [Jikan API](https://jikan.moe/) – unofficial MyAnimeList REST API

- **Build & Deployment**  
  - Hosted on **Vercel**  

---

## Getting Started

### Prerequisites

- Node.js (v14 or above recommended)  
- npm or yarn package manager  

### Installation

1. Clone the repository  
   ```bash
   git clone https://github.com/IshtiAK47/AniMerit.git
   cd AniMerit
   ```

2. Install dependencies  
   ```bash
   npm install
   # or
   yarn
   ```

### Running Locally

```bash
npm run dev
# or
yarn dev
```

This starts the development server at `http://localhost:3000`.

---

## Folder Structure

```
AniMerit/
├── docs/                 # Documentation and supporting materials
├── src/                  # Source code (components, pages, styles)
├── .gitignore            # Files ignored by Git
├── apphosting.yaml       # Hosting configurations for deployment
├── components.json       # Component definitions
├── next.config.ts        # Next.js configuration
├── package.json          # Project metadata & scripts
├── postcss.config.mjs    # PostCSS setup
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

---

## Contributing

Contributions are welcome!  

1. **Fork** the repository  
2. **Create** a new branch  
3. **Commit** changes  
4. **Push** to your fork  
5. **Submit a Pull Request**

Ideas for contributions:  
- Add genre/score filters  
- Dark mode toggle  
- Performance optimization  

---

## License

Distributed under the **MIT License**. See `LICENSE` for details.

---

## Acknowledgements

- [Jikan API](https://jikan.moe/) for open-source anime data  
- [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/)  
- Inspired by the anime community and MyAnimeList
