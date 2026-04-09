import { useState, useEffect } from "react";
import { GITHUB_API_BASE_URL } from "../utils/api";

export function useUserRepos(username) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // no username means no fetch
    if (!username) {
      setRepos([]);
      return;
    }

    // prevents stale fetch from overwriting newer results
    let cancelled = false;

    const fetchRepos = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${GITHUB_API_BASE_URL}/users/${username}/repos?per_page=100&sort=updated`,
        );

        if (response.status === 403)
          throw new Error("Rate limit hit. Please wait.");
        if (!response.ok)
          throw new Error(`Failed to fetch repos. Status: ${response.status}`);

        const data = await response.json();

        if (!cancelled) setRepos(data);
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setRepos([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchRepos();

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { repos, loading, error };
}
