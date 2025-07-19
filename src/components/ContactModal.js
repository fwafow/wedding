import React, { useRef, useEffect } from 'react';
import { BsFillTelephoneFill } from "react-icons/bs";
import { HiMail } from "react-icons/hi";

function ContactModal({closeModal}) {
  const contentRef = useRef(null);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  // 모달 밖 클릭 시 닫기
  const handleOverlayClick = (e) => {
    if (contentRef.current && !contentRef.current.contains(e.target)) {
      closeModal();
    }
  };

  const groomContact = [
    { person: "신랑 김일도", phone: "01037138896" },
    { person: "아버지 김계웅", phone: "01067542338" },
    { person: "어머니 이송자", phone: "01090172337" },
  ];

  /*const brideContact = [
    { person: "신부 임성하", phone: "01074871259" },
    { person: "아버지 임환택", phone: "01050698285" },
    { person: "어머니 심미옥", phone: "01043000060" },
  ];*/


  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="contact__content" ref={contentRef} onClick={(e) => e.stopPropagation()}>
        <button onClick={closeModal} className="survey__btn-close">&times;</button>
        <div className='modal__account'>연락하기</div>
        <div className="contact__boxes">
          {[...groomContact].map((contact, index) => (
            <div key={index} className="contact__box">
              <span>{contact.person}</span>
              <div className="contact__icons">
                <a href={`tel:${contact.phone}`}>
                  <BsFillTelephoneFill size="1em" className='contact__icon-phone'/>
                </a>
                <a href={`sms:${contact.phone}`}>
                  <HiMail size="1.5em"/>
                </a>
              </div>
            </div>
          ))}
        </div>
        {/* 신부 측 연락처 (주석 처리됨)
        <div className="contact__boxes">
          {[...brideContact].map((contact, index) => (
            <div key={index} className="contact__box">
              <span>{contact.person}</span>
              <div className="contact__icons">
                <a href={`tel:${contact.phone}`}>
                    <BsFillTelephoneFill size="1em" className='contact__icon-phone'/>
                </a>
                <a href={`sms:${contact.phone}`}>
                  <HiMail size="1.5em"/>
                </a>
              </div>
            </div>
          ))}
        </div>
        */}
        
        {/* 닫기 버튼 */}
        <div style={{ 
          marginTop: '20px', 
          display: 'flex', 
          justifyContent: 'center' 
        }}>
          <button 
            onClick={closeModal}
            style={{
              padding: '10px 24px',
              backgroundColor: '#e6e6e6',
              color: '#333',
              border: 'none',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#d1d1d1';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#e6e6e6';
            }}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactModal;
