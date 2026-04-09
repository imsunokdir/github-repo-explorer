import { useEffect, useState } from "react";

import { useGitHubSearch } from "../hooks/useGithubSearch";

import SearchBar from "../components/SearchBar";
import UserList from "../components/UserList";
import StateDisplay from "../components/StateDisplay";
import RepoPage from "./RepoPage";
import { useDebounce } from "../hooks/useDebouce";

// Coordinates the search flow and shows repo details for the selected user.
export default function HomePage() {
  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);

  // Debouncing avoids firing the search request on every keypress.
  const debouncedQuery = useDebounce(query, 400);
  const { users, loading, error } = useGitHubSearch(debouncedQuery);

  useEffect(() => {
    if (selectedUser) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedUser]);

  useEffect(() => {
    if (!selectedUser) return;

    const handleScroll = () => {
      const nextCompact = window.scrollY > 72;

      setIsHeaderCompact((prev) =>
        prev === nextCompact ? prev : nextCompact,
      );
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [selectedUser]);

  const trimmedQuery = query.trim();
  const trimmedDebouncedQuery = debouncedQuery.trim();
  const hasQuery = trimmedQuery.length > 0;
  const hasEnoughChars = trimmedQuery.length >= 2;
  const isWaitingForDebounce =
    hasEnoughChars && trimmedQuery !== trimmedDebouncedQuery;
  const showDropdown = isDropdownOpen && hasQuery;
  const showResults = !loading && !error && users.length > 0;
  const shouldCompactHeader = Boolean(selectedUser && isHeaderCompact);
  const showNoResults =
    hasEnoughChars &&
    trimmedDebouncedQuery &&
    !isWaitingForDebounce &&
    !loading &&
    !error &&
    users.length === 0;

  // Keep the dropdown tied to the raw input so it opens and closes instantly.
  const handleQueryChange = (value) => {
    setQuery(value);
    setIsDropdownOpen(value.trim().length > 0);
  };

  // After choosing a user, hide the search dropdown and show the repo panel.
  const handleSelectUser = (user) => {
    setSelectedUser((prev) => (prev?.login === user.login ? null : user));
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div
          className={`mx-auto max-w-6xl px-4 transition-all duration-300 ${
            shouldCompactHeader ? "py-2.5" : "py-4"
          }`}
        >
          <div
            className={`overflow-hidden transition-all duration-300 ${
              shouldCompactHeader
                ? "mb-0 max-h-0 -translate-y-3 opacity-0"
                : "mb-4 max-h-16 translate-y-0 opacity-100"
            }`}
          >
            <h1 className="text-lg font-bold text-slate-100">
              GitHub Explorer
            </h1>
          </div>

          <SearchBar
            compact={shouldCompactHeader}
            query={query}
            onQueryChange={handleQueryChange}
            onOpen={() => {
              if (trimmedQuery) {
                setIsDropdownOpen(true);
              }
            }}
            onClose={() => setIsDropdownOpen(false)}
            isDropdownVisible={showDropdown}
          >
            {!hasEnoughChars ? (
              <StateDisplay
                compact
                type="empty"
                message="Type at least 2 characters to search."
              />
            ) : isWaitingForDebounce || loading ? (
              <StateDisplay
                compact
                type="loading"
                message={`Searching for "${trimmedQuery}"...`}
              />
            ) : error ? (
              <StateDisplay compact type="error" message={error} />
            ) : showResults ? (
              <>
                <div className="flex items-center justify-between gap-3 border-b border-slate-800 px-4 py-3">
                  <p className="text-xs text-slate-400">
                    {users.length} users found for "{trimmedDebouncedQuery}"
                  </p>
                  <p className="text-xs text-slate-500">
                    Select a user to view repos
                  </p>
                </div>

                <UserList
                  users={users}
                  selectedUser={selectedUser}
                  onSelectUser={handleSelectUser}
                  variant="dropdown"
                />
              </>
            ) : showNoResults ? (
              <StateDisplay
                compact
                type="empty"
                message={`No users found for "${trimmedDebouncedQuery}".`}
              />
            ) : null}
          </SearchBar>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {selectedUser ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-4 sm:p-6">
            <RepoPage user={selectedUser} />
          </div>
        ) : (
          <StateDisplay
            type="empty"
            message={
              hasEnoughChars
                ? "Choose a user from the search dropdown to explore repositories."
                : "Search for a GitHub user to get started."
            }
          />
        )}
      </main>
    </div>
  );
}
