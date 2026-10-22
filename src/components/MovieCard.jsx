import React, { useState } from 'react';
import { IconHeart, IconStar, IconFilm } from './Icons';

export default function MovieCard({
  movie,
  isFavorite,
  onToggleFavorite,
  onClickMovie,
}) {
  const [imageError, setImageError] = useState(false);

  // 찜하기 버튼 클릭 시 이벤트 버블링 방지 (상세 모달이 열리지 않도록)
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(movie.id);
  };

  return (
    <article
      className="movie-card"
      onClick={() => onClickMovie(movie)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClickMovie(movie);
        }
      }}
    >
      {/* 포스터 썸네일 영역 */}
      <div className="poster-wrapper">
        {!imageError ? (
          <img
            src={movie.poster}
            alt={`${movie.title} 포스터`}
            className="movie-poster"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="poster-fallback">
            <IconFilm size={40} className="fallback-icon" />
            <span className="fallback-title">{movie.title}</span>
            <span className="fallback-badge">포스터 준비 중</span>
          </div>
        )}

        {/* 상단 오버레이: 평점 뱃지 (5점 미만은 개똥망작 특수 뱃지) */}
        <div className={`poster-rating-badge ${movie.rating < 5.0 ? 'mangjak-badge' : ''}`}>
          {movie.rating < 5.0 ? (
            <span role="img" aria-label="망작">💩</span>
          ) : (
            <IconStar size={14} />
          )}
          <span>{movie.rating.toFixed(1)}</span>
        </div>

        {movie.rating < 5.0 && (
          <div className="mangjak-ribbon">
            <span>개똥망작</span>
          </div>
        )}

        {/* 상단 오버레이: 찜하기(하트) 버튼 */}
        <button
          className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
          onClick={handleFavoriteClick}
          type="button"
          aria-label={isFavorite ? '찜 해제' : '찜하기'}
          title={isFavorite ? '찜 목록에서 제거' : '찜 목록에 추가'}
        >
          <IconHeart filled={isFavorite} size={20} />
        </button>

        {/* 호버 시 나타나는 빠른 안내 배너 */}
        <div className="poster-overlay-hint">
          <span>클릭하여 상세보기</span>
        </div>
      </div>

      {/* 영화 텍스트 정보 영역 */}
      <div className="card-info">
        <div className="card-header">
          <h3 className="movie-title" title={movie.title}>
            {movie.title}
          </h3>
        </div>

        <div className="movie-meta">
          <span className="meta-genre">{movie.genre}</span>
          <span className="meta-dot">•</span>
          <span className="meta-year">{movie.year}년</span>
        </div>

        <p className="movie-summary">
          {movie.summary}
        </p>
      </div>
    </article>
  );
}
