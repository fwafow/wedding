import React, { useRef, useEffect } from 'react'

function CalendarDay({ day, isWeddingDay, isHoliday, isSelected }) {
  // 요일 계산 (2025년 12월 1일은 월요일)
  const dayOfWeek = (day + 0) % 7; // 1일이 월요일이므로 0을 더함
  const isSunday = dayOfWeek === 0; // 일요일
  const isSaturday = dayOfWeek === 6; // 토요일
  const isChristmas = day === 25; // 크리스마스
  
  const dayOfWeekClass = isSunday ? 'red' : isSaturday ? 'blue' : '';
  const holidayClass = isHoliday || isChristmas ? 'red' : '';
  const selectedClass = isSelected ? 'selected' : '';
  
  return (
    <div className={`calendar__day ${dayOfWeekClass} ${holidayClass} ${selectedClass}`}>
      {isWeddingDay ? (
        <div className="wedding-day">
          <div className="wedding-heart">❤️</div>
          <div className="wedding-date">{day}</div>
        </div>
      ) : day}
    </div>
  );
}

export default function Calendar() {
  const videoRef = useRef(null);

  // 2025년 12월 기준
  const daysInMonth = 31;
  const firstDayOfWeek = 1; // 2025년 12월 1일은 월요일(1) - 일월화수목금토 순서
  const emptyDays = Array.from({ length: firstDayOfWeek }, () => null);
  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  // 요일 헤더
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  // D-day 계산 (2025-12-20)
  const weddingDate = new Date('2025-12-20T16:50:00+0900');
  const today = new Date();
  // 오늘 0시 기준으로 D-day 계산
  const todayZero = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const weddingZero = new Date(weddingDate.getFullYear(), weddingDate.getMonth(), weddingDate.getDate());
  const dDay = Math.floor((weddingZero - todayZero) / (1000 * 60 * 60 * 24));
  const dDayText = dDay === 0 ? 'D day' : dDay > 0 ? `D day - ${dDay}` : `D day + ${Math.abs(dDay)}`;

  // 비디오 자동 재생 설정
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('비디오 자동 재생 실패:', error);
      });
    }
  }, []);

  // 비디오 로딩 상태 확인
  const handleVideoLoad = () => {
    console.log('비디오 로딩 완료');
  };

  const handleVideoError = (error) => {
    console.log('비디오 로딩 에러:', error);
  };

  return (
    <div className='calendar-page'>
      <div className='calendar__month-title'>
        <span className='calendar__month'>2025.12</span>
        {/*span className='calendar__month-corner'>
          <span className='calendar__month-corner-bg'></span>
        </span*/}
      </div>
      <div className="calendar__body">
        {/* 요일 헤더 */}
        <div className="calendar__weekdays">
          {weekDays.map((weekday, index) => (
            <div 
              key={weekday} 
              className={`calendar__weekday ${index === 0 ? 'red' : index === 6 ? 'blue' : ''}`}
            >
              {weekday}
            </div>
          ))}
        </div>
        
        <div className="calendar__days-grid">
          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`}></div>
          ))}
          {days.map((day) => (
            <CalendarDay
              key={day}
              day={day}
              isWeddingDay={day === 20}
              isHoliday={[7,14,21,28].includes(day)}
              isSelected={day === 20}
            />
          ))}
        </div>
      </div>
      
      {/* D-day 표기 */}
      <div className='calendar__d-day-box'>
        <div className='calendar__d-day-bg'></div>
        <div className='calendar__d-day-content'>
          <div className='calendar__d-day-main'>{dDayText}</div>
        </div>
      </div>
      
      {/* 비디오 재생 */}
      <div className='calendar__video-container'>
        <video
          ref={videoRef}
          className='calendar__video'
          autoPlay
          muted
          loop
          playsInline
          onLoadedMetadata={handleVideoLoad}
          onError={handleVideoError}
        >
          <source src="/20250602_114141.mp4" type="video/mp4" />
          브라우저가 비디오를 지원하지 않습니다.
        </video>
      </div>
    </div>
  );
}
