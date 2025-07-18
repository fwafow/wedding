import React, { useState, useRef, useEffect } from 'react'
import './App.css';

import './css/Cover.css'
import './css/Invitation.css'
import './css/Calendar.css'
import './css/Account.css'
import './css/Gallery.css'
import './css/Location.css'
import './css/Footer.css'
import './css/SurveyModal.css'
import './css/Submit.css'
import './css/Comment.css'
import './css/Guide.css'
import './css/ThemeLayouts.css'

import Cover from './pages/Cover.js'
import Invitation from './pages/Invitation.js';
import Calendar from './pages/Calendar.js';
import Contact from './pages/Account.js';
import Location from './pages/Location.js';
import ImgGallery from './pages/ImgGallery.js';
import ContactModal from './components/ContactModal.js';
//import SurveyModal from './components/SurveyModal.js';
import Comment from './pages/Comment.js';
import Guide from './pages/Guide.js';

function AppContent() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);
  
  // 연락하기 모달을 닫기 위한 함수
  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  const openContactModal = () => {
    setIsContactModalOpen(true);
  }

  // 큰글씨 토글 함수
  const toggleLargeText = () => {
    setIsLargeText(!isLargeText);
  };

  // 음악 토글 함수
  const toggleMusic = () => {
    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      audioRef.current.play();
      setIsMusicPlaying(true);
    }
  };

  // 컴포넌트 마운트 시 오디오 요소 생성
  useEffect(() => {
    // 오디오 객체가 이미 존재하면 정리
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    
    audioRef.current = new Audio('/opening.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3; // 볼륨을 30%로 설정
    
    // 자동 재생 시작
    const playMusic = async () => {
      try {
        if (audioRef.current) {
          await audioRef.current.play();
          setIsMusicPlaying(true);
        }
      } catch (error) {
        console.log('자동 재생이 차단되었습니다. 사용자가 직접 재생해주세요.');
      }
    };
    
    playMusic();
    
    // ESC 키 이벤트 리스너 추가
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        if (audioRef.current) {
          audioRef.current.pause();
          setIsMusicPlaying(false);
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyPress);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className={`App ${isLargeText ? 'large-text' : ''}`}>
      <Cover/>
      <Invitation />
      <Calendar />
      <ImgGallery />
      <Location />
      <Guide />
      <Contact />
      <Comment />
      {/*<Footer />*/}
      
      {/* 음악 컨트롤 버튼 */}
      <button 
        onClick={toggleMusic}
        style={{
          position: 'fixed',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1002,
          width: '50px',
          height: '50px',
          backgroundColor: isMusicPlaying ? '#2c5aa0' : '#4a90e2',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          fontSize: '20px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = isMusicPlaying ? '#1e4a7a' : '#357abd';
          e.target.style.transform = 'translateX(-50%) scale(1.1)';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = isMusicPlaying ? '#2c5aa0' : '#4a90e2';
          e.target.style.transform = 'translateX(-50%) scale(1)';
        }}
      >
        {isMusicPlaying ? '⏸️' : '▶️'}
      </button>
      
      {/* 큰글씨 토글 버튼 */}
      <button 
        onClick={toggleLargeText}
        className={`text-size-toggle ${isLargeText ? 'active' : ''}`}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1001,
          padding: '10px 15px',
          backgroundColor: isLargeText ? '#2c5aa0' : '#4a90e2',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = isLargeText ? '#1e4a7a' : '#357abd';
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = isLargeText ? '#2c5aa0' : '#4a90e2';
          e.target.style.transform = 'scale(1)';
        }}
      >
        {isLargeText ? '글자 작게' : '글자 크게'}
      </button>
      
      {/* 연락하기 버튼 */}
      <button 
        onClick={openContactModal}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          padding: '12px 20px',
          backgroundColor: '#e6c97b',
          color: '#232b3b',
          border: 'none',
          borderRadius: '25px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#d4b86a';
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#e6c97b';
          e.target.style.transform = 'scale(1)';
        }}
      >
        연락하기
      </button>
      
      {/* 연락하기 모달 */}
      {isContactModalOpen && (
        <ContactModal closeModal={closeContactModal} />
      )}
    </div>
  );
}

function App() {
  // return (
  //   <ThemeProvider>
  //     <AppContent />
  //   </ThemeProvider>
  // );
  return <AppContent />;
}

export default App;
