import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import GenreFilter from './components/GenreFilter';
import MovieList from './components/MovieList';
import MovieModal from './components/MovieModal';
import RandomModal from './components/RandomModal';
import { MOVIES, GENRES } from './data/movies';
import './App.css';

const FAVORITES_STORAGE_KEY = 'cinepick_favorites';

export default function App() {
  // 1. 검색어 상태
  const [searchTerm, setSearchTerm] = useState('');

  // 2. 선택된 장르 상태 (기본값: '전체')
  const [activeGenre, setActiveGenre] = useState('전체');

  // 3. 찜한 영화만 보기 모드 상태
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // 4. 상세 모달로 열 영화 객체
  const [selectedMovie, setSelectedMovie] = useState(null);

  // 5. '오늘 뭐 볼까?' 랜덤 추천 모달 상태
  const [isRandomOpen, setIsRandomOpen] = useState(false);

  // 6. 찜한 영화 ID 목록 (새로고침해도 유지되도록 localStorage에서 불러오기)
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('로컬 스토리지 읽기 오류:', e);
      return [];
    }
  });

  // 찜 목록이 변경될 때마다 localStorage에 자동 저장
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error('로컬 스토리지 저장 오류:', e);
    }
  }, [favorites]);

  // 찜하기 추가 / 삭제 토글 함수
  const handleToggleFavorite = (movieId) => {
    setFavorites((prev) => {
      if (prev.includes(movieId)) {
        return prev.filter((id) => id !== movieId);
      } else {
        return [...prev, movieId];
      }
    });
  };

  // 장르별 영화 개수 계산 (장르 버튼에 표시할 개수)
  const genreCounts = useMemo(() => {
    const baseList = showOnlyFavorites
      ? MOVIES.filter((m) => favorites.includes(m.id))
      : MOVIES;

    const counts = { 전체: baseList.length };
    GENRES.forEach((g) => {
      if (g !== '전체') {
        counts[g] = baseList.filter((m) => m.genre === g).length;
      }
    });
    return counts;
  }, [favorites, showOnlyFavorites]);

  // 검색어 + 장르 필터 + 찜 목록 동시 적용 필터링 로직
  const filteredMovies = useMemo(() => {
    return MOVIES.filter((movie) => {
      // 찜한 영화만 보기 모드인 경우
      if (showOnlyFavorites && !favorites.includes(movie.id)) {
        return false;
      }

      // 장르 필터
      if (activeGenre !== '전체' && movie.genre !== activeGenre) {
        return false;
      }

      // 검색어 필터 (한국어 제목 및 영문 원제 검색 지원)
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase().trim();
        const matchTitle = movie.title.toLowerCase().includes(query);
        const matchOriginal = movie.originalTitle
          ? movie.originalTitle.toLowerCase().includes(query)
          : false;
        if (!matchTitle && !matchOriginal) {
          return false;
        }
      }

      return true;
    });
  }, [searchTerm, activeGenre, showOnlyFavorites, favorites]);

  // 검색/필터 초기화
  const handleResetFilters = () => {
    setSearchTerm('');
    setActiveGenre('전체');
    setShowOnlyFavorites(false);
  };

  return (
    <div className="app-container">
      {/* 1. 상단 네비게이션 헤더 */}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showOnlyFavorites={showOnlyFavorites}
        setShowOnlyFavorites={setShowOnlyFavorites}
        favoriteCount={favorites.length}
      />

      <main className="main-content">
        {/* 2. '오늘 뭐 볼까?' 히어로 배너 */}
        <Hero onOpenRandom={() => setIsRandomOpen(true)} />

        {/* 3. 장르별 필터 버튼 영역 */}
        <div className="filter-wrapper">
          <GenreFilter
            activeGenre={activeGenre}
            onSelectGenre={setActiveGenre}
            genreCounts={genreCounts}
          />
        </div>

        {/* 4. 영화 카드 그리드 목록 */}
        <MovieList
          movies={filteredMovies}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onClickMovie={(movie) => setSelectedMovie(movie)}
          showOnlyFavorites={showOnlyFavorites}
          searchTerm={searchTerm}
          activeGenre={activeGenre}
          onResetFilters={handleResetFilters}
        />
      </main>

      {/* 5. 푸터 */}
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-logo">CINEPICK</p>
          <p className="footer-desc">
            당신의 취향을 저격하는 감성 영화 추천 플랫폼
          </p>
          <p className="footer-copy">
            © 2026 CINEPICK. All rights reserved.
          </p>
        </div>
      </footer>

      {/* 6. 영화 상세 정보 모달 */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          isFavorite={favorites.includes(selectedMovie.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* 7. '오늘 뭐 볼까?' 랜덤 추천 모달 */}
      {isRandomOpen && (
        <RandomModal
          allMovies={MOVIES}
          onClose={() => setIsRandomOpen(false)}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectMovie={(movie) => {
            setIsRandomOpen(false);
            setSelectedMovie(movie);
          }}
        />
      )}
    </div>
  );
}
