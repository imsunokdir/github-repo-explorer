import { useMemo, useState } from "react";

import RepoCard from "../components/RepoCard";
import RepoFilters from "../components/RepoFilters";
import StateDisplay from "../components/StateDisplay";
import { useUserRepos } from "../hooks/useUserRepo";
import {
  applyFiltersAndSort,
  getUniqueLanguages,
} from "../utils/sortAndFilter";

// Displays the selected user's repos with local sort and language filters.
export default function RepoPage({ user }) {
  const [sortBy, setSortBy] = useState("stars");
  const [language, setLanguage] = useState("all");

  const { repos, loading, error } = useUserRepos(user.login);

  // Apply UI filters before rendering so the list always matches the controls.
  const filteredRepos = useMemo(
    () => applyFiltersAndSort(repos, language, sortBy),
    [repos, language, sortBy],
  );

  // Build language options from the fetched repos instead of hardcoding them.
  const languages = useMemo(() => getUniqueLanguages(repos), [repos]);

  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="h-10 w-10 rounded-full border border-slate-700"
        />
        <div>
          <h2 className="text-base font-semibold text-slate-100">
            {user.login}
          </h2>
          <a
            href={`https://github.com/${user.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:underline"
          >
            View on GitHub
          </a>
        </div>
      </div>

      {loading && <StateDisplay type="loading" />}
      {error && <StateDisplay type="error" message={error} />}

      {!loading && !error && repos.length > 0 && (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              {filteredRepos.length} / {repos.length} repos
            </p>

            <RepoFilters
              sortBy={sortBy}
              onSortChange={setSortBy}
              language={language}
              onLanguageChange={setLanguage}
              languages={languages}
            />
          </div>

          {filteredRepos.length === 0 ? (
            <StateDisplay
              type="empty"
              message={`No ${language} repos found.`}
            />
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {filteredRepos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          )}
        </>
      )}

      {!loading && !error && repos.length === 0 && (
        <StateDisplay
          type="empty"
          message={`${user.login} has no public repositories.`}
        />
      )}
    </div>
  );
}
