import React, { useState } from 'react';
import '../css/ThemeSelector.css';

const themes = [
  {
    id: 'classic',
    name: '클래식 & 포멀',
    description: '우아하고 정갈한 클래식한 분위기',
    color: '#8B4513',
    bgColor: '#F5F5DC',
    accentColor: '#D2691E',
    icon: '👑'
  },
  {
    id: 'modern',
    name: '모던 & 심플',
    description: '깔끔하고 미니멀한 현대적 감성',
    color: '#2C3E50',
    bgColor: '#ECF0F1',
    accentColor: '#3498DB',
    icon: '⚡'
  },
  {
    id: 'romantic',
    name: '로맨틱 & 감성',
    description: '따뜻하고 로맨틱한 분위기',
    color: '#E91E63',
    bgColor: '#FFF0F5',
    accentColor: '#FF69B4',
    icon: '💕'
  },
  {
    id: 'nature',
    name: '자연 & 보태니컬',
    description: '자연스럽고 생동감 있는 분위기',
    color: '#2E7D32',
    bgColor: '#F1F8E9',
    accentColor: '#4CAF50',
    icon: '🌿'
  },
  {
    id: 'travel',
    name: '여행 & 해외 감성',
    description: '세계적인 여행 감성',
    color: '#1565C0',
    bgColor: '#E3F2FD',
    accentColor: '#2196F3',
    icon: '✈️'
  },
  {
    id: 'film',
    name: '필름 & 시네마틱',
    description: '영화같은 드라마틱한 분위기',
    color: '#424242',
    bgColor: '#FAFAFA',
    accentColor: '#9C27B0',
    icon: '🎬'
  },
  {
    id: 'oddones',
    name: '오드원스 스타일',
    description: '깔끔하고 세련된 모던 디자인',
    color: '#333333',
    bgColor: '#FFFFFF',
    accentColor: '#666666',
    icon: '✨'
  },
  {
    id: 'pwinvitation',
    name: 'PW 청첩장 스타일',
    description: '깔끔하고 우아한 모던 청첩장',
    color: '#2C2C2C',
    bgColor: '#FAFAFA',
    accentColor: '#8B8B8B',
    icon: '💒'
  },
  {
    id: 'classicletter',
    name: '오드원스 클래식레터',
    description: '우아한 레터 스타일 청첩장',
    color: '#2C2C2C',
    bgColor: '#FFFFFF',
    accentColor: '#8B8B8B',
    icon: '📜'
  },
  {
    id: 'basicgreen',
    name: '오드원스 베이직그린',
    description: '자연스러운 그린 베이직 스타일',
    color: '#2E7D32',
    bgColor: '#FFFFFF',
    accentColor: '#4CAF50',
    icon: '🌱'
  }
];

function ThemeSelector({ onThemeChange, currentTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeSelect = (theme) => {
    onThemeChange(theme);
    setIsOpen(false);
  };

  const currentThemeData = themes.find(theme => theme.id === currentTheme) || themes[0];

  return (
    <div className="theme-selector">
      <div className="theme-selector__current" onClick={() => setIsOpen(!isOpen)}>
        <span className="theme-selector__icon">{currentThemeData.icon}</span>
        <span className="theme-selector__name">{currentThemeData.name}</span>
        <span className="theme-selector__arrow">{isOpen ? '▲' : '▼'}</span>
      </div>
      
      {isOpen && (
        <div className="theme-selector__dropdown">
          {themes.map((theme) => (
            <div
              key={theme.id}
              className={`theme-selector__option ${currentTheme === theme.id ? 'active' : ''}`}
              onClick={() => handleThemeSelect(theme.id)}
            >
              <span className="theme-selector__option-icon">{theme.icon}</span>
              <div className="theme-selector__option-content">
                <div className="theme-selector__option-name">{theme.name}</div>
                <div className="theme-selector__option-description">{theme.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ThemeSelector; 