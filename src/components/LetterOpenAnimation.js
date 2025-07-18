import React, { useEffect, useState, useRef } from 'react';
import '../css/LetterOpenAnimation.css';

function LetterOpenAnimation({ onFinish }) {
  const [opened, setOpened] = useState(false);
  const envelopeRef = useRef(null);

  useEffect(() => {
    if (!opened && envelopeRef.current) {
      const observer = new window.IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setOpened(true);
            observer.disconnect();
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(envelopeRef.current);
      return () => observer.disconnect();
    }
  }, [opened]);

  useEffect(() => {
    if (opened) {
      // 펼쳐지는 애니메이션 시간(1.2s) 후 메인 페이지로 전환
      const timer = setTimeout(() => {
        onFinish();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [opened, onFinish]);

  return (
    <div className="letter-overlay">
      <div ref={envelopeRef} className={`letter-envelope scroll-open${opened ? ' opened' : ''}`}> 
        <div className="envelope-flap-top" />
        <div className="envelope-flap-bottom" />
        <div className="envelope-flap-left" />
        <div className="envelope-flap-right" />
        <div className="letter-paper-body center-text">
          {!opened && (
            <div className="letter-scroll-guide">초대장이 보이면 펼쳐집니다</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LetterOpenAnimation; 