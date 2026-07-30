import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="btn-group btn-group-sm" role="group">
            <button
                type="button"
                className={`btn px-2 px-sm-3 ${i18n.language === 'vi' ? 'btn-primary fw-bold' : 'btn-outline-secondary'}`}
                onClick={() => changeLanguage('vi')}
            >
                🇻🇳 <span className="d-none d-sm-inline ms-1">VN</span>
            </button>
            <button
                type="button"
                className={`btn px-2 px-sm-3 ${i18n.language === 'en' ? 'btn-primary fw-bold' : 'btn-outline-secondary'}`}
                onClick={() => changeLanguage('en')}
            >
                🇬🇧 <span className="d-none d-sm-inline ms-1">EN</span>
            </button>
        </div>
    );
};
