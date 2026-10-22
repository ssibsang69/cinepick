import React, { useEffect, useState } from 'react';
import { IconClose, IconStar, IconHeart, IconFilm } from './Icons';

export default function MovieModal({
  movie,
  onClose,
  isFavorite,
  onToggleFavorite,
}) {
  const [imageError, setImageError] = useState(false);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    // 모달 오픈 시 배경 스크롤 방지
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!movie) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* 상단 닫기 버튼 */}
        <button
          className="modal-close-btn"
          onClick={onClose}
          type="button"
          aria-label="모달 닫기"
        >
          <IconClose size={22} />
        </button>

        <div className="modal-body">
          {/* 모달 좌측/상단 포스터 */}
          <div className="modal-poster-wrap">
            {!imageError ? (
              <img
                src={movie.poster}
                alt={`${movie.title} 포스터`}
                className="modal-poster"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="modal-poster-fallback">
                <IconFilm size={48} />
                <span>{movie.title}</span>
              </div>
            )}
          </div>

          {/* 모달 우측/하단 영화 상세 정보 */}
          <div className="modal-details">
            <div className="modal-header-meta">
              <span className="modal-genre-tag">{movie.genre}</span>
              <span className="modal-year-tag">{movie.year}년</span>
              {movie.runtime && <span className="modal-runtime-tag">{movie.runtime}</span>}
            </div>

            <h2 className="modal-title">{movie.title}</h2>
            {movie.originalTitle && (
              <p className="modal-original-title">{movie.originalTitle}</p>
            )}

            <div className="modal-rating-row">
              <div className="modal-stars">
                {movie.rating < 5.0 ? (
                  <span style={{ fontSize: '1.4rem' }}>💩</span>
                ) : (
                  <IconStar size={20} />
                )}
                <span className={`modal-score ${movie.rating < 5.0 ? 'mangjak-score' : ''}`}>
                  {movie.rating.toFixed(1)}
                </span>
                <span className="modal-score-max">/ 10</span>
                {movie.rating < 5.0 && (
                  <span className="mangjak-warning-tag">⚠️ 세기의 개똥망작 주의</span>
                )}
              </div>

              {/* 찜하기 액션 버튼 */}
              <button
                className={`modal-fav-btn ${isFavorite ? 'favorited' : ''}`}
                onClick={() => onToggleFavorite(movie.id)}
                type="button"
              >
                <IconHeart filled={isFavorite} size={18} />
                <span>{isFavorite ? '찜한 영화' : '찜하기'}</span>
              </button>
            </div>

            {/* 감독 및 출연진 정보 */}
            {(movie.director || movie.actors) && (
              <div className="modal-credits">
                {movie.director && (
                  <div className="credit-row">
                    <span className="credit-label">감독:</span>
                    <span className="credit-value">{movie.director}</span>
                  </div>
                )}
                {movie.actors && (
                  <div className="credit-row">
                    <span className="credit-label">출연:</span>
                    <span className="credit-value">{movie.actors}</span>
                  </div>
                )}
              </div>
            )}

            {/* 줄거리 */}
            <div className="modal-story">
              <h4 className="story-heading">줄거리</h4>
              <p className="story-content">
                {movie.description || movie.summary}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
