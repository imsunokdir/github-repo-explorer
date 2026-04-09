/**
 * Shows a GitHub repo (name, desc, stars, forks, language).
 * Opens repo on click.
 */

export default function RepoCard({ repo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div
        className="
          h-full flex flex-col gap-3
          bg-slate-900 border border-slate-700
          rounded-xl p-4
          hover:border-slate-500 hover:bg-slate-800
          transition-all duration-150
        "
      >
        {/* repo name */}
        <p className="text-sm font-semibold text-blue-400 truncate">
          {repo.name}
        </p>

        {/* description — clamp to 2 lines so cards stay same height */}
        <p className="text-xs text-slate-400 line-clamp-2 flex-1">
          {repo.description || "No description provided."}
        </p>

        {/* stats row — stars, forks, language */}
        <div className="flex items-center gap-2 flex-wrap mt-auto">
          {/* star count */}
          <span className="flex items-center gap-1 text-xs text-yellow-400 bg-slate-800 border border-slate-700 rounded-full px-2 py-0.5">
            ★ {repo.stargazers_count.toLocaleString()}
          </span>

          {/* fork count */}
          <span className="flex items-center gap-1 text-xs text-slate-400 bg-slate-800 border border-slate-700 rounded-full px-2 py-0.5">
            ⑂ {repo.forks_count.toLocaleString()}
          </span>

          {/* language badge — only render if GitHub detected one */}
          {repo.language && (
            <span className="text-xs text-green-400 bg-slate-800 border border-green-900 rounded-full px-2 py-0.5">
              {repo.language}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
