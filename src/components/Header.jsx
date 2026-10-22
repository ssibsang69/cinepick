import React from 'react';
import { IconFilm, IconSearch, IconHeart } from './Icons';

export default function Header({
  searchTerm,
  setSearchTerm,
  showOnlyFavorites,
  setShowOnlyFavorites,
  favoriteCount,
}) {
  return (
    <header className="header">
      <div className="header-container">
        {/* 로고 영역 */}
        <div
          className="logo-wrap"
          onClick={() => {
            setSearchTerm('');
            setShowOnlyFavorites(false);
          }}
          title="처음으로 이동"
        >
          <div className="logo-icon">
            <IconFilm size={26} />
          </div>
          <h1 className="logo-text">
            CINE<span className="logo-point">PICK</span>
          </h1>
        </div>

        {/* 중앙 검색창 */}
        <div className="search-wrap">
          <IconSearch className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="영화 제목을 검색해보세요..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="search-clear-btn"
              onClick={() => setSearchTerm('')}
              title="검색어 지우기"
              type="button"
            >
              ×
            </button>
          )}
        </div>

        {/* 찜한 영화 모아보기 토글 버튼 */}
        <div className="header-actions">
          <button
            className={`fav-toggle-btn ${showOnlyFavorites ? 'active' : ''}`}
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            type="button"
          >
            <IconHeart filled={showOnlyFavorites || favoriteCount > 0} size={18} />
            <span>찜한 영화</span>
            <span className="fav-badge">{favoriteCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
