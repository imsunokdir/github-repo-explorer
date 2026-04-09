// Supports both compact dropdown rows and larger grid cards for the same user data.
export default function UserCard({
  user,
  isSelected,
  onSelect,
  variant = "grid",
}) {
  // Dropdown mode keeps the search results compact and easy to scan.
  if (variant === "dropdown") {
    return (
      <button
        type="button"
        onClick={() => onSelect(user)}
        className={`
          flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left
          transition-all duration-150
          ${
            isSelected
              ? "border-blue-500 bg-slate-800 shadow-lg shadow-blue-500/10"
              : "border-slate-800 bg-slate-950/70 hover:border-slate-600 hover:bg-slate-800/80"
          }
        `}
      >
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          className="h-11 w-11 shrink-0 rounded-full border border-slate-700"
        />

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-100">
            {user.login}
          </p>
          <p className={isSelected ? "text-xs text-blue-300" : "text-xs text-slate-500"}>
            {isSelected ? "Currently selected" : "View repositories"}
          </p>
        </div>

        <span
          className={`text-[10px] uppercase tracking-[0.24em] ${
            isSelected ? "text-blue-300" : "text-slate-500"
          }`}
        >
          {isSelected ? "Active" : "Open"}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(user)}
      className={`
        flex w-full cursor-pointer flex-col items-center gap-3 rounded-xl border p-4 text-center
        transition-all duration-150
        ${
          isSelected
            ? "border-blue-500 bg-slate-800 shadow-lg shadow-blue-500/10"
            : "border-slate-700 bg-slate-900 hover:border-slate-500 hover:bg-slate-800"
        }
      `}
    >
      <img
        src={user.avatar_url}
        alt={`${user.login}'s avatar`}
        className="h-14 w-14 rounded-full border-2 border-slate-700"
      />

      <div>
        <p className="w-full truncate text-sm font-semibold text-slate-200">
          {user.login}
        </p>
        {isSelected && (
          <span className="mt-0.5 block text-xs text-blue-400">
            viewing repos
          </span>
        )}
      </div>
    </button>
  );
}
