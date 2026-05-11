type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <svg
          className="search-icon"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M14.1667 14.1667L18.3334 18.3334"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle
            cx="8.75"
            cy="8.75"
            r="5.41667"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="جستجو بر اساس نام کتاب..."
          className="search-input"
          aria-label="جستجوی کتاب‌ها"
        />

        {value && (
          <button
            type="button"
            className="clear-search-btn"
            onClick={() => onChange("")}
            aria-label="پاک کردن جستجو"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
