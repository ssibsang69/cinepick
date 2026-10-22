import React, { useEffect, useState } from 'react';
import { IconClose, IconRefresh, IconStar, IconHeart, IconFilm, IconSparkles } from './Icons';

export default function RandomModal({
  allMovies,
  onClose,
  favorites,
  onToggleFavorite,
  onSelectMovie,
}) {
  const [currentMovie, setCurrentMovie] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  // 랜덤 영화 한 편 선택 함수 (이전 추천 영화와 가급적 중복되지 않도록)
  const pickRandomMovie = () => {
    if (!allMovies || allMovies.length === 0) return;
    setIsSpinning(true);
    setImageError(false);

    let nextMovie;
    if (allMovies.length === 1) {
      nextMovie = allMovies[0];
    } else {
      do {
        const randomIndex = Math.floor(Math.random() * allMovies.length);
        nextMovie = allMovies[randomIndex];
      } while (currentMovie && nextMovie.id === currentMovie.id);
    }

    setTimeout(() => {
      setCurrentMovie(nextMovie);
      setIsSpinning(false);
    }, 200);
  };

  // 모달 처음 뜰 때 1편 추천
  useEffect(() => {
    pickRandomMovie();
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!currentMovie) return null;

  const isFavorite = favorites.includes(currentMovie.id);

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container random-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* 상단 닫기 버튼 */}
        <button
          className="modal-close-btn"
          onClick={onClose}
          type="button"
          aria-label="닫기"
        >
          <IconClose size={22} />
        </button>

        {/* 랜덤 추천 헤더 */}
        <div className="random-modal-header">
          <div className={`random-tag ${currentMovie.rating < 5.0 ? 'mangjak-random-tag' : ''}`}>
            {currentMovie.rating < 5.0 ? (
              <>
                <span role="img" aria-label="폭탄">💣</span>
                <span>지뢰작 당첨! 세기의 개똥망작 특별 추천!</span>
              </>
            ) : (
              <>
                <IconSparkles size={16} />
                <span>오늘 CINEPICK의 특별 추천작!</span>
              </>
            )}
          </div>
          <h2 className="random-heading">
            {currentMovie.rating < 5.0 ? "😂 이 영화... 감당할 수 있겠습니까?" : "오늘 이 영화 어때요?"}
          </h2>
        </div>

        <div className={`modal-body ${isSpinning ? 'fading' : ''}`}>
          {/* 포스터 */}
          <div className="modal-poster-wrap">
            {!imageError ? (
              <img
                src={currentMovie.poster}
                alt={`${currentMovie.title} 포스터`}
                className="modal-poster"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="modal-poster-fallback">
                <IconFilm size={48} />
                <span>{currentMovie.title}</span>
              </div>
            )}
          </div>

          {/* 추천 영화 내용 */}
          <div className="modal-details">
            <div className="modal-header-meta">
              <span className="modal-genre-tag">{currentMovie.genre}</span>
              <span className="modal-year-tag">{currentMovie.year}년</span>
              <span className={`modal-rating-pill ${currentMovie.rating < 5.0 ? 'mangjak-pill' : ''}`}>
                {currentMovie.rating < 5.0 ? (
                  <span role="img" aria-label="망작">💩</span>
                ) : (
                  <IconStar size={14} />
                )}
                <span>{currentMovie.rating.toFixed(1)}</span>
              </span>
            </div>

            <h3 className="modal-title">{currentMovie.title}</h3>
            {currentMovie.originalTitle && (
              <p className="modal-original-title">{currentMovie.originalTitle}</p>
            )}

            <div className="modal-story">
              <h4 className="story-heading">줄거리 소개</h4>
              <p className="story-content">
                {currentMovie.description || currentMovie.summary}
              </p>
            </div>

            {/* 하단 액션 버튼들 */}
            <div className="random-actions">
              <button
                className="refresh-recommend-btn"
                onClick={pickRandomMovie}
                type="button"
                disabled={isSpinning}
              >
                <IconRefresh size={18} className={isSpinning ? 'spin-anim' : ''} />
                <span>다른 영화 추천받기</span>
              </button>

              <button
                className={`random-fav-btn ${isFavorite ? 'favorited' : ''}`}
                onClick={() => onToggleFavorite(currentMovie.id)}
                type="button"
              >
                <IconHeart filled={isFavorite} size={18} />
                <span>{isFavorite ? '찜 완료' : '찜하기'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
