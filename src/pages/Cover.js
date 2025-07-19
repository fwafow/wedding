import React, { useEffect, useState } from 'react';

export default function Cover({ onFinish }) {
  const [showCard, setShowCard] = useState(true);

  // 카드 24초 후 onFinish 호출 (3배 느리게)
  useEffect(() => {
    if (showCard) {
      const t = setTimeout(() => {
        if (onFinish) onFinish();
      }, 24000); // 카드 24초 노출 후 다음 단계 (8000 * 3)
      return () => clearTimeout(t);
    }
  }, [showCard, onFinish]);

  return (
    <div className="cover-root">
      {/* 1. 하트 (제거) */}
      {/* {step === 0 && (
        <div className="cover-heart-anim">
          <span role="img" aria-label="heart" className="cover-heart">❤️</span>
        </div>
      )} */}

      {/* 2. 이름 타이핑 */}
      {/* step === 1 && (
        <div className="cover-names">
          <Typewriter text="일도" speed={1080} />
          <span className="cover-heart cover-heart-names">❤️</span>
          <Typewriter text="성하" speed={1080} onDone={handleNameDone} />
        </div>
      ) */}

      {/* 3. 네이비 카드 */}
      {showCard && (
        <div className="cover-card fade-in" style={{transitionDuration: '4.8s'}}> {/* 1.6s * 3 */}
          <div className="cover-card-top">
            <div className="cover-card-script">Wedding Invitation</div>
            <div className="cover-card-sub">We're getting married</div>
          </div>
          <div className="cover-card-names">
            <span className="cover-card-mainname">김일도</span>
            <span className="cover-card-and"> and </span>
            <span className="cover-card-mainname">임성하</span>
          </div>
          <div className="cover-card-info">
            2025년 12월 20일 토요일 오후 4시 50분<br />
            웨딩시티 아모르홀
          </div>
          <div className="cover-card-bottom">Wedding invitation letter</div>
        </div>
      )}

      {/* 4. 사진 + 상단 문구 (주석처리) */}
      {/* {showPhoto && (
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          {showPhotoTitle && (
            <div style={{marginBottom: '18px', textAlign: 'center'}}>
              <div className="cover-card-script">Wedding Invitation</div>
              <div className="cover-card-sub">김일도 and 임성하</div>
              <div className="cover-card-sub">2025년 12월 20일 토요일 오후 4시 50분</div>
              <div className="cover-card-sub">웨딩시티 아모르홀</div>
            </div>
          )}
          <img
            src={mainPhoto}
            alt="우리 사진"
            className="cover-main-photo cover-photo-fadein"
          />
        </div>
      )} */}
    </div>
  );
}
