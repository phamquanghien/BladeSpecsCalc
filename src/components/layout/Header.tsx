import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
    onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
    const { t } = useTranslation();

    return (
        <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom flex-wrap gap-2">
            <div className="d-flex align-items-center gap-2">
                {/* Nút Toggle Sidebar chỉ hiện ở Mobile (< 768px) */}
                <button
                    className="btn btn-outline-dark d-md-none p-1 px-2"
                    onClick={onToggleSidebar}
                    aria-label="Toggle Navigation"
                >
                    <i className="bi bi-list fs-4"></i>
                </button>

                <div>
                    <h4 className="fw-bold mb-0 text-dark fs-5 fs-md-4">
                        {t('header.title')}
                    </h4>
                    <p className="text-muted small mb-0 d-none d-sm-block">
                        {t('header.subTitle')}
                    </p>
                </div>
            </div>

            <div className="d-flex align-items-center gap-2">
                <LanguageSwitcher />
                <button
                    className="btn btn-outline-danger btn-sm fw-bold px-2 px-sm-3"
                    onClick={() => window.print()}
                >
                    <i className="bi bi-printer me-0 me-sm-1"></i>
                    <span className="d-none d-sm-inline">
                        {t('header.exportPdf')}
                    </span>
                </button>
            </div>
        </div>
    );
};
