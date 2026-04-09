/*This hook searches GitHub users using the GitHub Search API.
 * I'm keeping all the fetch logic here so my components stay clean
 * and don't have to worry about HOW the data is fetched.
 *
 * It gives back 3 things:users, error, loading.
 */

import { useState, useEffect } from "react";
import { GITHUB_API_BASE_URL } from "../utils/api";

export function useGitHubSearch(query) {
  //states
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // if the query is empty or too short, don't bother calling the API
    // also reset everything back to a clean state
    if (!query || query.trim().length < 2) {
      setUsers([]);
      setError(null);
      setLoading(false);
      return;
    }

    // prevents stale fetch from overwriting newer results
    let cancelled = false;

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${GITHUB_API_BASE_URL}/search/users?q=${encodeURIComponent(query)}&per_page=12`,
        );

        if (response.status === 403) {
          throw new Error(
            "Rate limit hit. Please wait a moment and try again.",
          );
        }

        if (!response.ok) {
          throw new Error(`Something went wrong. Status: ${response.status}`);
        }

        const data = await response.json();

        // only update state if this fetch is still the latest one
        if (!cancelled) {
          setUsers(data.items || []);
        }
      } catch (err) {
        // only update error state if this fetch hasn't been cancelled
        if (!cancelled) {
          setError(err.message);
          setUsers([]);
        }
      } finally {
        // finally runs whether the request succeeded or failed
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchUsers();

    return () => {
      cancelled = true;
    };
  }, [query]);

  return { users, loading, error };
}
