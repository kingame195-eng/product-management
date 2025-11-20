import React from "react";
import "./SearchBar.css";

function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder={placeholder || "Search products..."}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        {value && (
          <button
            className="search-clear"
            onClick={() => onChange("")}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
