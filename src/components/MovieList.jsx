import React from 'react';
import MovieCard from './MovieCard';
import { IconFilm, IconHeart, IconSearch } from './Icons';

export default function MovieList({
  movies,
  favorites,
  onToggleFavorite,
  onClickMovie,
  showOnlyFavorites,
  searchTerm,
  activeGenre,
  onResetFilters,
}) {
  // 결과가 비어있는 경우 Empty State 표시
  if (movies.length === 0) {
    return (
      <section className="empty-state-section">
        <div className="empty-state-card">
          <div className="empty-icon-wrapper">
            {showOnlyFavorites ? (
              <IconHeart filled={false} size={48} />
            ) : searchTerm ? (
              <IconSearch size={48} />
            ) : (
              <IconFilm size={48} />
            )}
          </div>

          <h3 className="empty-title">
            {showOnlyFavorites
              ? '찜한 영화가 아직 없습니다'
              : searchTerm
              ? `"${searchTerm}" 검색 결과가 없습니다`
              : '해당 조건의 영화가 없습니다'}
          </h3>

          <p className="empty-desc">
            {showOnlyFavorites
              ? '영화 카드의 하트(❤️) 버튼을 눌러 나만의 영화 보관함을 채워보세요!'
              : '다른 검색어를 입력하시거나 장르 필터를 변경해 보세요.'}
          </p>

          <button
            className="reset-filter-btn"
            onClick={onResetFilters}
            type="button"
          >
            전체 영화 목록 보기
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="movie-list-section">
      <div className="list-status-bar">
        <span className="status-label">
          {showOnlyFavorites ? '❤️ 내가 찜한 영화' : activeGenre === '전체' ? '🎬 전체 영화' : `🎬 ${activeGenre} 영화`}
          {searchTerm && <span className="status-search"> · "{searchTerm}" 검색 중</span>}
        </span>
        <span className="status-count">총 <strong>{movies.length}</strong>편</span>
      </div>

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={favorites.includes(movie.id)}
            onToggleFavorite={onToggleFavorite}
            onClickMovie={onClickMovie}
          />
        ))}
      </div>
    </section>
  );
}
