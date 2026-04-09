export function filterByLanguage(repos, language) {
  // "all" is the default — return everything
  if (!language || language === "all") return repos;

  return repos.filter(
    // GitHub sets repo.language to null if it can't detect one
    (repo) => repo.language === language,
  );
}

// Sorts repos by a given field in descending order (highest first).
export function sortRepos(repos, sortBy) {
  // Spread to avoid mutation
  const sorted = [...repos];

  switch (sortBy) {
    case "stars":
      // Higher star count first → b - a (descending)
      return sorted.sort((a, b) => b.stargazers_count - a.stargazers_count);

    case "forks":
      // Higher fork count first
      return sorted.sort((a, b) => b.forks_count - a.forks_count);

    case "name":
      // Alphabetical A → Z
      return sorted.sort((a, b) => a.name.localeCompare(b.name));

    default:
      // Unknown sort key — return array unchanged rather than throwing
      return sorted;
  }
}

// getUniqueLanguages
export function getUniqueLanguages(repos) {
  const languages = repos.map((repo) => repo.language).filter(Boolean);

  // Set removes duplicates, Array.from converts back, sort for consistency
  return Array.from(new Set(languages)).sort();
}

// applyFiltersAndSort
export function applyFiltersAndSort(repos, language, sortBy) {
  const filtered = filterByLanguage(repos, language);
  const sorted = sortRepos(filtered, sortBy);
  return sorted;
}
