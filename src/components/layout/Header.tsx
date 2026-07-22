import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
      <div>
        <h4 className="fw-bold mb-0 text-dark">
          {t('header.title')}
        </h4>
        <p className="text-muted small mb-0">
          {t('header.subTitle')}
        </p>
      </div>

      <div className="d-flex align-items-center">
        <LanguageSwitcher />
        <button className="btn btn-outline-danger btn-sm fw-bold px-3" onClick={() => window.print()}>
          <i className="bi bi-printer me-1"></i> {t('header.exportPdf')}
        </button>
      </div>
    </div>
  );
};