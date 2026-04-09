// Shared feedback UI for loading, error, and empty states across the app.
const config = {
  loading: {
    icon: null,
    message: "Loading...",
    color: "text-blue-400",
  },
  error: {
    icon: "!",
    color: "text-red-400",
  },
  empty: {
    icon: "o",
    color: "text-slate-500",
  },
};

export default function StateDisplay({ type, message, compact = false }) {
  const current = config[type];

  if (!current) return null;

  // Compact mode is used inside the search dropdown where space is tighter.
  const containerClassName = compact
    ? "flex flex-col items-center justify-center px-4 py-6 text-center"
    : "flex flex-col items-center justify-center px-6 py-16 text-center";

  const spinnerClassName = compact
    ? "mb-3 h-6 w-6 animate-spin rounded-full border-2 border-slate-700 border-t-blue-400"
    : "mb-4 h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-blue-400";

  const iconClassName = compact
    ? `mb-2 text-2xl ${current.color}`
    : `mb-3 text-4xl ${current.color}`;

  const textClassName = compact
    ? `text-sm ${current.color}`
    : `text-sm font-mono ${current.color}`;

  return (
    <div className={containerClassName}>
      {type === "loading" ? (
        <div className={spinnerClassName} />
      ) : (
        <span className={iconClassName}>{current.icon}</span>
      )}

      <p className={textClassName}>{message || current.message}</p>
    </div>
  );
}
