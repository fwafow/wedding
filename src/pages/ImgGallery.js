import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';
import '../css/Gallery.css';
import ImagePopup from '../components/ImagePopup';

function ImgGallery() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const thumbnailContainerRef = useRef(null);
  const containerRef = useRef(null);

  // 이미지 배열을 useMemo로 최적화 (메모리 절약을 위해 일부만 로드)
  const images = React.useMemo(() => [
    {
      original: '/images/p1.jpg',
      thumbnail: '/images/s1.jpg',
    },
    {
      original: '/images/p2.jpg',
      thumbnail: '/images/s2.jpg',
    },
    {
      original: '/images/p3.jpg',
      thumbnail: '/images/s3.jpg',
    },
    {
      original: '/images/p4.jpg',
      thumbnail: '/images/s4.jpg',
    },
    {
      original: '/images/p5.jpg',
      thumbnail: '/images/s5.jpg',
    },
    {
      original: '/images/p6.jpg',
      thumbnail: '/images/s6.jpg',
    },
    {
      original: '/images/p7.jpg',
      thumbnail: '/images/s7.jpg',
    },
    {
      original: '/images/p8.jpg',
      thumbnail: '/images/s8.jpg',
    },
    {
      original: '/images/p9.jpg',
      thumbnail: '/images/s9.jpg',
    },
    {
      original: '/images/p10.jpg',
      thumbnail: '/images/s10.jpg',
    },
    {
      original: '/images/p11.jpg',
      thumbnail: '/images/s11.jpg',
    },
    {
      original: '/images/p12.jpg',
      thumbnail: '/images/s12.jpg',
    },
    {
      original: '/images/p13.jpg',
      thumbnail: '/images/s13.jpg',
    },
    {
      original: '/images/p14.jpg',
      thumbnail: '/images/s14.jpg',
    },
    {
      original: '/images/p15.jpg',
      thumbnail: '/images/s15.jpg',
    },
  ], []);

  // IntersectionObserver 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, []);



  // 다음 이미지
  const handleNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, images.length, setCurrentIndex]);

  // 이전 이미지
  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex, setCurrentIndex]);



  // 메인 이미지 스와이프 핸들러
  const mainImageSwipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true,
  });

  // 썸네일 클릭 핸들러
  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  // 이미지 클릭 핸들러
  const handleImageClick = () => {
    setPopupOpen(true);
  };

  // 팝업 닫기
  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (popupOpen) return; // 팝업 열렸을 때는 무시
      switch (e.key) {
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
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [popupOpen, handleNext, handlePrev]);

  return (
    <div className='bc-pink container' ref={containerRef}>
      
      <div className={`title fade-in ${isVisible ? 'visible' : ''}`}>Gallery</div>
      
      {/* 메인 이미지 스크롤 영역 */}
      <div className={`gallery-main-container fade-in ${isVisible ? 'visible' : ''}`}> 
        <div 
          {...mainImageSwipeHandlers}
          className="gallery-image-container"
        >
          <div className="gallery-image-wrapper">
            <img
              src={images[currentIndex].original}
              alt={`Gallery ${currentIndex + 1}`}
              className="gallery-main-image"
              onClick={handleImageClick}
              draggable={false}
              style={{ userSelect: 'none' }}
              loading="eager"
            />
          </div>
        </div>
        
        {/* 이미지 인덱스 표시 */}
        <div className="gallery-index">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* 썸네일 영역 */}
      <div className={`gallery-thumbnails-container fade-in ${isVisible ? 'visible' : ''}`}>
        <div 
          ref={thumbnailContainerRef} 
          className="gallery-thumbnails"
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image.thumbnail}
              alt={`Thumbnail ${index + 1}`}
              className={`gallery-thumbnail ${currentIndex === index ? 'active' : ''}`}
              onClick={() => handleThumbnailClick(index)}
              loading="lazy"
            />
          ))}
        </div>
      </div>
      
      {/* 이미지 팝업 */}
      <ImagePopup
        isOpen={popupOpen}
        currentImage={images[currentIndex]}
        images={images}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        onClose={handlePopupClose}
      />
    </div>
  );
}

export default ImgGallery;