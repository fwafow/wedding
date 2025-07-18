import React, {useRef, useEffect, useState} from 'react'
import { FiCopy } from "react-icons/fi";

function Location() {

  const address = "서울 구로구 새말로 97";
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('ktx');
  const containerRef = useRef(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    alert("주소가 복사되었습니다!");
  };

  const mapRef = useRef(null);
  const lat = 37.507273; // 새로운 위도
  const lng = 126.890208; // 새로운 경도

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

  useEffect(() => {
    const { naver } = window;
    if (mapRef.current && naver) {
      const location = new naver.maps.LatLng(lat, lng);
      const map = new naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 15, // 지도 확대 정도
      });
      new naver.maps.Marker({
        position: location,
        map,
      });
    }
  }, []);

  const gotoNavermap = () => {
    // 네이버지도 URL (위도, 경도 기반)
    const naverMapUrl = `https://map.naver.com/v5/search/신도림테크노마트웨딩시티?c=${lng},${lat},15,0,0,0,dh`;
    window.open(naverMapUrl, '_blank');
  }

  const gotoKakaomap = () => {
    // 카카오지도 URL (위도, 경도 기반)
    const kakaoMapUrl = `https://map.kakao.com/link/search/신도림테크노마트웨딩시티?c=${lng},${lat},15,0,0,0,dh`;
    window.open(kakaoMapUrl, '_blank');
  }

  const gotoTmap = () => {
    // Tmap 길찾기 URL (목적지 위도, 경도 기반)
    const tmapUrl = `tmap://route?goal=37.507273,126.890208&name=신도림테크노마트웨딩시티`;
    window.open(tmapUrl, '_blank');
  };

  // 공통 승강장 안내 컴포넌트
  /*const PlatformNote = () => (
    <div className="location__ktx-note">
      <p><strong>📌 승강장 표시:</strong></p>
      <p>1호선 "인천행", "신창행" 또는 "서동탄행" 탑승</p>
      <p style={{fontSize: '0.9em', color: '#d32f2f'}}>(반대편 "청량리행"은 타지 마세요)</p>
    </div>
  );*/

  // KTX 경로 컴포넌트
  const KTXRoute = ({ title, stationCount, duration }) => (
    <div className="location__ktx-stop">
      <p><strong>{title}</strong></p>
      <div className="location__ktx-route">
        <p>→ {stationCount}번째 역: 신도림역 하차 ({duration})</p>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch(activeTab) {
      case 'ktx':
        return (
          <div className="location__ktx">
            <div className="location__ktx-common">
              <p><strong>🚇 지하철 1호선 이용</strong></p>
              <p>→ 인천/신창행/서동탄행 열차 탑승</p>
              <p style={{fontSize: '0.9em', color: '#d32f2f'}}>(반대편 "청량리행"은 타지 마세요)</p>
            </div>
            <KTXRoute 
              title="① 서울역 도착 시 (경부선 KTX)"
              stationCount="7"
              duration="약 18~20분 소요"
            />
            <KTXRoute 
              title="② 용산역 도착 시 (호남선 KTX)"
              stationCount="5"
              duration="약 10~15분 소요"
            />
            <KTXRoute 
              title="③ 영등포역 도착 시"
              stationCount="1"
              duration="바로 다음역 신도림역 하차"
            />
            {/*<PlatformNote />*/}
          </div>
        );
      case 'subway':
        return (
          <div className="location__subway">
            <p><strong>1호선, 2호선 신도림역</strong></p>
            <p>신도림역 ③번출구 테크노마트 판매동 지하1층과 직접 연결되어 있습니다.</p>
          </div>
        );
      case 'bus':
        return (
          <div className="location__bus">
            <div className="location__bus-stop">
              <p><strong>신도림역 (17-102)정류장 하차</strong></p>
              <p>지하철 신도림역 3번출구 쪽</p>
              <div className="location__bus-routes">
                <p><strong>지선:</strong> 5619, 6411, 6511, 6611</p>
                <p><strong>직행:</strong> 5200</p>
                <p><strong>마을:</strong> 영등포09, 영등포12, 영등포13</p>
              </div>
            </div>
            
            <div className="location__bus-stop">
              <p><strong>신도림역 (17-001)정류장 하차</strong></p>
              <p>지하철 신도림역 1번출구 쪽</p>
              <p style={{fontSize: '0.9em', color: '#666'}}>(하차 후 지하보도 이용, 지하철 3번출구 방면으로 이동 후 테크노마트 판매동 지하 1층 통로 이용)</p>
              <div className="location__bus-routes">
                <p><strong>간선:</strong> 160, 503, 600, 660, 662</p>
                <p><strong>지선:</strong> 5615, 5714, 6512, 6515, 6516, 6637, 6640A, 6713</p>
                <p><strong>직행:</strong> 301, 320</p>
                <p><strong>일반:</strong> 10, 11-1, 11-2, 83, 88, 530</p>
                <p><strong>공항:</strong> 6018</p>
              </div>
            </div>
          </div>
        );
      /* 주차 케이스 주석처리
      case 'parking':
        return (
          <div className="location__parking">
            <div className="location__parking-info">
              <p><strong>테크노마트 지하주차장 이용(B3~B7)</strong></p>
              <p>주차요원의 안내를 받으세요.</p>
            </div>
            <div className="location__parking-alternative">
              <p><strong>🚗 차량 이용 시 안내</strong></p>
              <p><strong>네비에 이마트 신도림점</strong></p>
              <p>테크노마트에 이마트가 있어서 길안내가 수월합니다. 네비에 이마트 신도림점을 검색해주세요.</p>
            </div>
          </div>
        );
      */
      default:
        return null;
    }
  };

  return (
    <div className='container' ref={containerRef}>
    <div className={`title fade-in ${isVisible ? 'visible' : ''}`}>오시는 길</div>
    <div className={`location__details fade-in ${isVisible ? 'visible' : ''}`}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>서울 구로구 새말로 97</span>
        <button onClick={handleCopy} style={{ fontSize: 12, padding: '2px 8px', borderRadius: 4, border: '1px solid #C8E6C9', background: '#000', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
          <FiCopy size={14} />
          주소 복사
        </button>
      </div>
      <div>신도림테크노마트 웨딩시티 8층 아모르홀</div>
    </div>
    <div ref={mapRef} className={`location__map fade-in ${isVisible ? 'visible' : ''}`}></div>
    <div className={`location__map-icon-box fade-in ${isVisible ? 'visible' : ''}`}>
        <div className='location__map-item' onClick={gotoNavermap}>
          <img src="/images/naver.webp" className='location__map-icon' alt="naverMap"/>
          <span>네이버맵</span>
        </div>
        <div className='location__map-item' onClick={gotoKakaomap}>
          <img src="/images/kakao.png" className='location__map-icon' alt='kakaoMap'/>
          <span>카카오맵</span>
        </div>
        <div className='location__map-item' onClick={gotoTmap}>
        <img src="/images/Tmap.png" className='location__map-icon' alt="tmap"/>
          <span>Tmap</span>
        </div>
    </div>

    {/* 찾아오시는 길 정보 */}
    <div className={`location__transport-info fade-in ${isVisible ? 'visible' : ''}`}>
      {/* 탭 버튼들 */}
      <div className="location__tabs">
        <button 
          className={`location__tab ${activeTab === 'ktx' ? 'active' : ''}`}
          onClick={() => setActiveTab('ktx')}
        >
          🚅 <br/>KTX
        </button>
        <button 
          className={`location__tab ${activeTab === 'subway' ? 'active' : ''}`}
          onClick={() => setActiveTab('subway')}
        >
          🚇 <br/>지하철
        </button>
        <button 
          className={`location__tab ${activeTab === 'bus' ? 'active' : ''}`}
          onClick={() => setActiveTab('bus')}
        >
          🚌 <br/>버스
        </button>
        {/* 주차 탭 주석처리
        <button 
          className={`location__tab ${activeTab === 'parking' ? 'active' : ''}`}
          onClick={() => setActiveTab('parking')}
        >
          🚗 <br/>주차
        </button>
        */}
      </div>

      {/* 탭 콘텐츠 */}
      <div className="location__section">
        <h3>{activeTab === 'ktx' ? '🚅 KTX 이용 시' : 
             activeTab === 'subway' ? '🚇 지하철 이용 시' :
             activeTab === 'bus' ? '🚌 버스 이용 시' :
             ''}</h3>
        {renderTabContent()}
      </div>
    </div>
    </div>
  );
}

export default Location;
