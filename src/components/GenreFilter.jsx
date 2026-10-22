import React from 'react';
import { GENRES } from '../data/movies';

export default function GenreFilter({
  activeGenre,
  onSelectGenre,
  genreCounts = {},
}) {
  return (
    <nav className="genre-filter-nav" aria-label="장르별 필터">
      <div className="genre-button-group">
        {GENRES.map((genre) => {
          const isSelected = activeGenre === genre;
          const count = genreCounts[genre] ?? 0;

          return (
            <button
              key={genre}
              type="button"
              className={`genre-btn ${isSelected ? 'active' : ''}`}
              onClick={() => onSelectGenre(genre)}
            >
              <span>{genre}</span>
              <span className="genre-count">({count})</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
