import React, { useEffect, useState } from 'react';


function Typewriter({ text, onDone, speed = 720, className = '' }) { // speed 3배 느리게 (240 * 3)
  const [display, setDisplay] = useState('');
  useEffect(() => {
    if (display.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplay(text.slice(0, display.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else if (onDone) {
      onDone();
    }
  }, [display, text, speed, onDone]);
  return <span className={className}>{display}</span>;
}

export default function Cover({ onFinish }) {
  const [step, setStep] = useState(1); // 0에서 1로 변경 - 바로 이름 타이핑부터 시작
  const [showCard, setShowCard] = useState(false);
  // const [cardFade, setCardFade] = useState(false); // fade-out 제거
  // const [showPhoto, setShowPhoto] = useState(false);
  // const [showPhotoTitle, setShowPhotoTitle] = useState(false);

  // 이름 타이핑 끝나면 카드 등장
  const handleNameDone = () => {
    setTimeout(() => {
      setShowCard(true);
      setStep(2);
    }, 2400); // 3배 느리게 (800 * 3)
  };

  // 카드 24초 후 onFinish 호출 (3배 느리게)
  useEffect(() => {
    if (showCard && step === 2) {
      const t = setTimeout(() => {
        if (onFinish) onFinish();
      }, 24000); // 카드 24초 노출 후 다음 단계 (8000 * 3)
      return () => clearTimeout(t);
    }
  }, [showCard, step, onFinish]);

  return (
    <div className="cover-root">
      {/* 1. 하트 (제거) */}
      {/* {step === 0 && (
        <div className="cover-heart-anim">
          <span role="img" aria-label="heart" className="cover-heart">❤️</span>
        </div>
      )} */}

      {/* 2. 이름 타이핑 */}
      {step === 1 && (
        <div className="cover-names">
          <Typewriter text="일도" speed={1080} /> {/* 360 * 3 */}
          <span className="cover-heart cover-heart-names">❤️</span>
          <Typewriter text="성하" speed={1080} onDone={handleNameDone} /> {/* 360 * 3 */}
        </div>
      )}

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
