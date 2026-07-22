import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="btn-group btn-group-sm me-2" role="group">
      <button
        type="button"
        className={`btn ${i18n.language === 'vi' ? 'btn-primary fw-bold' : 'btn-outline-secondary'}`}
        onClick={() => changeLanguage('vi')}
      >
        🇻🇳 VN
      </button>
      <button
        type="button"
        className={`btn ${i18n.language === 'en' ? 'btn-primary fw-bold' : 'btn-outline-secondary'}`}
        onClick={() => changeLanguage('en')}
      >
        🇬🇧 EN
      </button>
    </div>
  );
};