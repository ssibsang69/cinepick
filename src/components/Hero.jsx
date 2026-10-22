import React from 'react';
import { IconDice, IconSparkles } from './Icons';

export default function Hero({ onOpenRandom }) {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-badge">
          <IconSparkles size={16} />
          <span>오늘의 영화 큐레이션</span>
        </div>
        <h2 className="hero-title">
          오늘 뭐 볼까? <span className="highlight-text">고민될 땐 CINEPICK!</span>
        </h2>
        <p className="hero-desc">
          장르별 인기 명작부터 숨은 명작까지, 버튼 하나로 당신에게 꼭 맞는 영화를 추천받아보세요.
        </p>

        <button
          className="random-recommend-btn"
          onClick={onOpenRandom}
          type="button"
        >
          <IconDice size={22} className="dice-icon" />
          <span>오늘 뭐 볼까? 랜덤 추천</span>
        </button>
      </div>
    </section>
  );
}
