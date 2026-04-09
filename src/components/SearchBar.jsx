// Search input wrapper that can show a dropdown panel directly below the field.
export default function SearchBar({
  query,
  onQueryChange,
  children,
  onOpen,
  onClose,
  compact = false,
  isDropdownVisible = false,
}) {
  // Only close the dropdown when focus leaves the whole search area.
  const handleBlur = (event) => {
    const nextFocusedElement = event.relatedTarget;

    if (!event.currentTarget.contains(nextFocusedElement)) {
      onClose?.();
    }
  };

  return (
    <div
      className={`relative mx-auto w-full max-w-2xl transition-all duration-300 ${
        compact ? "max-w-xl" : "max-w-2xl"
      }`}
      onFocusCapture={() => onOpen?.()}
      onBlur={handleBlur}
    >
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
          @
        </span>

        <input
          type="text"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          autoComplete="off"
          placeholder="Search GitHub users..."
          aria-expanded={isDropdownVisible}
          className={`w-full border border-slate-700 bg-slate-900 pl-11 pr-10 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
            compact
              ? "rounded-lg py-2.5 transition-all duration-300"
              : "rounded-xl py-3 transition-all duration-300"
          }`}
        />

        {query && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-lg leading-none text-slate-500 transition-colors hover:text-slate-300"
            aria-label="Clear search"
          >
            x
          </button>
        )}
      </div>

      {/* The parent decides what goes inside the dropdown: states or user results. */}
      {isDropdownVisible && children ? (
        <div
          className={`absolute left-0 right-0 top-full z-30 overflow-hidden border border-slate-700 bg-slate-900/95 shadow-2xl shadow-slate-950/50 backdrop-blur transition-all duration-300 ${
            compact ? "mt-2 rounded-xl" : "mt-3 rounded-2xl"
          }`}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
