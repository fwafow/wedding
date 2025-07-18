import React, { useEffect, useRef, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';

function ImagePopup({ isOpen, currentImage, images, currentIndex, setCurrentIndex, onClose }) {
  const scrollContainerRef = useRef(null);

  const handleNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, images.length, setCurrentIndex]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex, setCurrentIndex]);

  // 스와이프 핸들러
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true,
  });

  // 현재 인덱스에 맞춰 스크롤 컨테이너 스크롤
  useEffect(() => {
    if (scrollContainerRef.current && isOpen) {
      const container = scrollContainerRef.current;
      const imageWidth = container.offsetWidth;
      container.scrollTo({
        left: currentIndex * imageWidth,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          handlePrev();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        default:
          break;
      }
    };

    // 캡처 방지 이벤트 핸들러들
    const preventCapture = (e) => {
      e.preventDefault();
      return false;
    };

    const preventContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    const preventDrag = (e) => {
      e.preventDefault();
      return false;
    };

    const preventSelect = (e) => {
      e.preventDefault();
      return false;
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      
      // 캡처 방지 이벤트 리스너 추가
      document.addEventListener('contextmenu', preventContextMenu);
      document.addEventListener('selectstart', preventSelect);
      document.addEventListener('dragstart', preventDrag);
      
      // 개발자 도구 단축키 방지
      document.addEventListener('keydown', (e) => {
        // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U 방지
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.shiftKey && e.key === 'J') ||
            (e.ctrlKey && e.key === 'u')) {
          e.preventDefault();
          return false;
        }
      });
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      
      // 캡처 방지 이벤트 리스너 제거
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('selectstart', preventSelect);
      document.removeEventListener('dragstart', preventDrag);
    };
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen || !currentImage) return null;

  return (
    <div 
      className={`image-popup-overlay ${isOpen ? 'active' : ''}`}
      onClick={onClose}
    >
      <div className="image-popup-container" onClick={e => e.stopPropagation()}>
        {/* 닫기 버튼 아래 중앙 */}
        <button className="image-popup-close" onClick={onClose} style={{left: '50%', bottom: 'unset', top: '30px', right: 'unset', transform: 'translateX(-50%)'}}>
          ✕
        </button>
        {/* 스와이프 지원 */}
        <div 
          {...swipeHandlers}
          ref={scrollContainerRef}
          className="image-popup-scroll-container"
        >
          {images.map((image, index) => (
            <div key={index} className="image-popup-image-wrapper">
              <img 
                src={image.original} 
                alt={`Gallery ${index + 1}`}
                className="image-popup-image"
                draggable={false}
                style={{ userSelect: 'none' }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
        {/* 썸네일 영역 */}
        <div className="image-popup-thumbnails">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.thumbnail}
              alt={`Thumbnail ${index + 1}`}
              className={`image-popup-thumbnail ${currentIndex === index ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              draggable={false}
              style={{ userSelect: 'none' }}
              loading="lazy"
            />
          ))}
        </div>
        <div className="image-popup-counter">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}

export default ImagePopup; 