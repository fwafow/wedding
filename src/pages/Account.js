import React, {useState, useCallback} from 'react'
import { FaMoneyCheck } from "react-icons/fa6";
import Modal from '../components/Modal';
import '../css/Modal.css'
// import { MdOutlinePhoneIphone } from "react-icons/md";

function ContactButton({ person, account, kakaopay }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = useCallback(() => {
      console.log('Modal opening for:', person);
      setIsModalOpen(true);
    }, [person]);
  
    const closeModal = useCallback(() => {
      console.log('Modal closing for:', person);
      setIsModalOpen(false);
    }, [person]);
  
    return (
      <>
        <div className="contact__box">
          <span>{person}</span>
          <div className="contact__icons">
            <button onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openModal();
            }} className="contact__btn"><FaMoneyCheck size="1.5em"/></button>
          </div>
        </div>
        {isModalOpen && (
          <Modal closeModal={closeModal} who={person} account={account} kakaopay={kakaopay}/>
        )}
      </>
    );
  }


  function Account() {
    const [selectedSide, setSelectedSide] = useState(null);
    const groom_contact = [
      { person: "신랑 김일도", account: "국민은행 08370104059132" },
      { person: "아버지 김계웅", account: "농협 68602056951" },
      { person: "어머니 이송자", account: "농협은행 20503056069290" },
    ];

    const bride_contact = [
        { person: "신부 임성하", account: "국민은행53880101507091 " },
        { person: "아버지 임환택", account: "기업은행 0000"},
        { person: "어머니 심미옥", account: "기업은행 21402819802019" },
      ];
  
    return (
      <div className="container">
        <img src="/images/flower.png" className="flower" alt="flower"/>
        <div className='contact__title'>마음 전하는 곳</div>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', margin: '16px 0' }}>
          <button
            className={`contact__side-btn${selectedSide === 'groom' ? ' active' : ''}`}
            onClick={() => setSelectedSide('groom')}
          >신랑 측</button>
          <button
            className={`contact__side-btn${selectedSide === 'bride' ? ' active' : ''}`}
            onClick={() => setSelectedSide('bride')}
          >신부 측</button>
        </div>
        {selectedSide === 'groom' && (
          <div className="contact__boxes">
            {groom_contact.map((contact, index) => (
              <ContactButton key={index} {...contact} />
            ))}
          </div>
        )}
        {selectedSide === 'bride' && (
          <div className="contact__boxes">
            {bride_contact.map((contact, index) => (
              <ContactButton key={index} {...contact} />
            ))}
          </div>
        )}
        <div className="contact__guide-text">아이콘을 클릭하시면 계좌번호를 확인할 수 있습니다.</div>
      </div>
    );
  }

 

export default Account
