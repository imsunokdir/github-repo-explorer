# GitHub Repo Explorer

A simple React app to search GitHub users and explore their public repositories.

## Features

- Search GitHub users with a debounced search input
- View user avatars and usernames
- Open a user's public repositories
- Sort repositories by stars, forks, or name
- Filter repositories by language
- Handle loading, error, and empty states

## Tech Stack

- React
- Vite
- Tailwind CSS

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub APIs Used

- `https://api.github.com/search/users?q={query}`
- `https://api.github.com/users/{username}/repos`
