import React, { useEffect, useState } from 'react';

const InvitationIntro = () => {
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // 진입 시 편지지 열기
    setShowEnvelope(true);

    // 일정 시간 후 메시지 fade in/out
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-[#fdf6e3] font-[Nanum Pen Script]">
      <div
        className={`relative w-[400px] h-[250px] bg-white border-2 border-gray-300 rounded-xl shadow-xl transform transition-all duration-700 ${
          showEnvelope ? 'scale-100 rotate-x-0 opacity-100' : 'scale-90 rotate-x-90 opacity-0'
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className={`absolute w-full h-full text-center text-2xl text-gray-800 leading-[250px] transition-opacity duration-[4000ms] delay-[1300ms] ${
            showMessage ? 'opacity-0 animate-fadeInOut' : 'opacity-0'
          }`}
        >
          김일도 ♥ 임성하 결혼식에 초대합니다.
        </div>
      </div>

      {/* Tailwind 커스텀 애니메이션 */}
      <style jsx>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        .animate-fadeInOut {
          animation: fadeInOut 4s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default InvitationIntro;