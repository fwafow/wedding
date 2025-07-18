import React, { useEffect, useRef } from 'react'

function Modal({ closeModal, who, account, kakaopay }) {
  const contentRef = useRef(null);
  
  console.log('Modal rendered with:', { who, account, kakaopay });

  // 모바일/PC 복사 호환
  const copyToClipboard = (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text)
        .then(() => alert("계좌번호가 복사되었습니다."))
        .catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  };
  function fallbackCopy(text) {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert("계좌번호가 복사되었습니다.");
    } catch (e) {
      alert("복사 기능이 지원되지 않는 브라우저입니다. 직접 복사해 주세요.");
    }
  }

  // ESC 키 닫기
  useEffect(() => {
    console.log('Modal useEffect triggered');
    
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        console.log('Escape key pressed');
        closeModal();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      console.log('Modal useEffect cleanup');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [closeModal]);

  // 오버레이 클릭 시 닫기
  const onOverlayClick = (e) => {
    console.log('Overlay clicked, target:', e.target);
    if (contentRef.current && !contentRef.current.contains(e.target)) {
      console.log('Closing modal from overlay click');
      closeModal();
    }
  };

  return (
    <div className="modal" onClick={onOverlayClick}>
      <div className="modal__content" ref={contentRef} onClick={(e) => {
        console.log('Modal content clicked');
        e.stopPropagation();
      }}>
        <div className='modal__account'>계좌번호</div>
        <div className='atext'>복사 버튼 클릭 시, 복사됩니다.</div>
        <div className='modal__details'>
            <div className='modal_line'>{who}</div>
            <div>{account}</div>
        </div>
        <div className='modal__buttons'>
            <button className='modal__btn-copy' onClick={() => copyToClipboard(account)}>복사</button>
            <button className='modal_btn_close' onClick={closeModal}>닫기</button>
        </div>
      </div>
    </div>
  );
}

export default Modal
