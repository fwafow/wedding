import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const themes = {
  classic: {
    id: 'classic',
    name: '클래식 & 포멀',
    colors: {
      primary: '#8B4513',
      secondary: '#D2691E',
      background: '#F5F5DC',
      text: '#2F2F2F',
      accent: '#CD853F',
      border: '#DEB887'
    },
    fonts: {
      heading: 'BookkMyungjo-Bd, serif',
      body: 'BookkMyungjo, serif'
    }
  },
  modern: {
    id: 'modern',
    name: '모던 & 심플',
    colors: {
      primary: '#2C3E50',
      secondary: '#3498DB',
      background: '#ECF0F1',
      text: '#2C3E50',
      accent: '#E74C3C',
      border: '#BDC3C7'
    },
    fonts: {
      heading: 'Pretendard, sans-serif',
      body: 'Pretendard, sans-serif'
    }
  },
  romantic: {
    id: 'romantic',
    name: '로맨틱 & 감성',
    colors: {
      primary: '#E91E63',
      secondary: '#FF69B4',
      background: '#FFF0F5',
      text: '#4A4A4A',
      accent: '#FF1493',
      border: '#FFB6C1'
    },
    fonts: {
      heading: 'GangwonEdu_OTFBoldA, cursive',
      body: 'GangwonEdu, cursive'
    }
  },
  nature: {
    id: 'nature',
    name: '자연 & 보태니컬',
    colors: {
      primary: '#2E7D32',
      secondary: '#4CAF50',
      background: '#F1F8E9',
      text: '#1B5E20',
      accent: '#8BC34A',
      border: '#A5D6A7'
    },
    fonts: {
      heading: 'GangwonEdu_Strong, cursive',
      body: 'GangwonEdu_New, cursive'
    }
  },
  travel: {
    id: 'travel',
    name: '여행 & 해외 감성',
    colors: {
      primary: '#1565C0',
      secondary: '#2196F3',
      background: '#E3F2FD',
      text: '#0D47A1',
      accent: '#42A5F5',
      border: '#90CAF9'
    },
    fonts: {
      heading: 'Pretendard, sans-serif',
      body: 'Pretendard, sans-serif'
    }
  },
  film: {
    id: 'film',
    name: '필름 & 시네마틱',
    colors: {
      primary: '#424242',
      secondary: '#9C27B0',
      background: '#FAFAFA',
      text: '#212121',
      accent: '#E1BEE7',
      border: '#BDBDBD'
    },
    fonts: {
      heading: 'BookkMyungjo-Bd, serif',
      body: 'BookkMyungjo, serif'
    }
  },
  oddones: {
    id: 'oddones',
    name: '오드원스 스타일',
    colors: {
      primary: '#333333',
      secondary: '#666666',
      background: '#FFFFFF',
      text: '#333333',
      accent: '#999999',
      border: '#E5E5E5'
    },
    fonts: {
      heading: 'Pretendard, sans-serif',
      body: 'Pretendard, sans-serif'
    }
  },
  pwinvitation: {
    id: 'pwinvitation',
    name: 'PW 청첩장 스타일',
    colors: {
      primary: '#2C2C2C',
      secondary: '#8B8B8B',
      background: '#FAFAFA',
      text: '#2C2C2C',
      accent: '#D4D4D4',
      border: '#E0E0E0'
    },
    fonts: {
      heading: 'NanumMyeongjo, serif',
      body: 'NanumMyeongjo, serif'
    }
  },
  classicletter: {
    id: 'classicletter',
    name: '오드원스 클래식레터',
    colors: {
      primary: '#2C2C2C',
      secondary: '#8B8B8B',
      background: '#FFFFFF',
      text: '#2C2C2C',
      accent: '#D4D4D4',
      border: '#E0E0E0'
    },
    fonts: {
      heading: 'NanumMyeongjo, serif',
      body: 'NanumMyeongjo, serif'
    }
  },
  basicgreen: {
    id: 'basicgreen',
    name: '오드원스 베이직그린',
    colors: {
      primary: '#2E7D32',
      secondary: '#4CAF50',
      background: '#FFFFFF',
      text: '#2E7D32',
      accent: '#81C784',
      border: '#C8E6C9'
    },
    fonts: {
      heading: 'NanumMyeongjo, serif',
      body: 'NanumMyeongjo, serif'
    }
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('romantic'); // 기본값은 로맨틱

  useEffect(() => {
    // 로컬 스토리지에서 테마 불러오기
    const savedTheme = localStorage.getItem('wedding-theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme('romantic');
    }
  }, []);

  const applyTheme = (themeId) => {
    if (themes[themeId]) {
      const theme = themes[themeId];
      const root = document.documentElement;
      const body = document.body;
      
      // CSS 변수로 테마 적용
      root.style.setProperty('--primary-color', theme.colors.primary);
      root.style.setProperty('--secondary-color', theme.colors.secondary);
      root.style.setProperty('--background-color', theme.colors.background);
      root.style.setProperty('--text-color', theme.colors.text);
      root.style.setProperty('--accent-color', theme.colors.accent);
      root.style.setProperty('--border-color', theme.colors.border);
      root.style.setProperty('--heading-font', theme.fonts.heading);
      root.style.setProperty('--body-font', theme.fonts.body);
      
      // data-theme 속성 추가 (레이아웃 CSS용)
      body.setAttribute('data-theme', themeId);
    }
  };

  const changeTheme = (themeId) => {
    if (themes[themeId]) {
      setCurrentTheme(themeId);
      localStorage.setItem('wedding-theme', themeId);
      applyTheme(themeId);
    }
  };

  const getCurrentTheme = () => themes[currentTheme];

  const value = {
    currentTheme,
    changeTheme,
    getCurrentTheme,
    themes: Object.values(themes)
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 