import React, { useState } from 'react';
import '../css/Guide.css';

const guideInfo = [
  {
    title: '주차안내',
    content: `주차권은 별도로 없으며 무료주차는 3시간 입니다.

여유로운 식사를 위해 대중교통 이용을 추천드립니다.

*무료주차 3시간 이후 

🚗 차량 이용 시 안내
테크노마트 지하주차장 이용(B3~B7)
주차요원의 안내를 받으세요.

네비에 이마트 신도림점을 검색해주세요.
테크노마트에 이마트가 있어서 길안내가 수월합니다.`
  },
  {
    title: '식사안내',
    content: `식사는 예식 30분 전부터 이용이 가능하며
8층 연회장에서 뷔페식으로 운영됩니다.

음료와 주류도 무제한 이용 가능하오니
즐거운 식사 시간 되시길 바랍니다.`
  },
  {
    title: '신부대기실',
    content: `8층 로비에서 홀 왼편에 위치해 있습니다.
조금 일찍 오시어 함께 소중한 사진을 남겨주세요.
예식 시작 전 신부대기실에서 촬영 가능합니다.
`
  }
];

function Guide() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className='container'>
      <div className='title'>안내사항</div>
      
      <div className='guide-section'>
        {/* 탭 버튼들 */}
        <div className='guide-tabs'>
          {guideInfo.map((info, index) => (
            <button
              key={index}
              className={`guide-tab ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {info.title}
            </button>
          ))}
        </div>

        {/* 선택된 탭의 내용 */}
        <div className='guide-content'>
          <div className='guide-content-inner'>
            {guideInfo[activeTab].content.split('\n').map((line, lineIndex) => (
              <div key={lineIndex} className='guide-line'>
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Guide;