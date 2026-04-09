/**
 * Sort & filter controls for repos.
 * Controlled by parent (no state here).
 *
 * Props:
 * - sortBy (string)
 * - onSortChange (function)
 * - language (string)
 * - onLanguageChange (function)
 * - languages (string[])
 */

export default function RepoFilters({
  sortBy,
  onSortChange,
  language,
  onLanguageChange,
  languages,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* ── Sort control ──────────────────────────────── */}
      <div className="flex items-center gap-2">
        <label className="text-xs text-slate-500 shrink-0">Sort by</label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="
            text-xs text-slate-300
            bg-slate-900 border border-slate-700
            rounded-lg px-3 py-1.5
            outline-none focus:border-blue-500
            cursor-pointer
          "
        >
          <option value="stars">Stars</option>
          <option value="forks">Forks</option>
          <option value="name">Name</option>
        </select>
      </div>

      {/* ── Language filter ───────────────────────────── */}
      <div className="flex items-center gap-2">
        <label className="text-xs text-slate-500 shrink-0">Language</label>
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="
            text-xs text-slate-300
            bg-slate-900 border border-slate-700
            rounded-lg px-3 py-1.5
            outline-none focus:border-blue-500
            cursor-pointer
          "
        >
          {/* "all" is always the first option */}
          <option value="all">All languages</option>

          {/* dynamically populated from the actual repos — no hardcoding */}
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
