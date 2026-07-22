import React from 'react';
import { useTranslation } from 'react-i18next';
import { NAV_ITEMS } from '../../config/navigation';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-dark text-white p-3 d-flex flex-column justify-content-between" style={{ width: '280px', flexShrink: 0, minHeight: '100vh' }}>
      <div>
        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center justify-content-center bg-primary rounded-3 p-2 mb-2">
            <i className="bi bi-fan fs-3 text-white"></i>
          </div>
          <h6 className="fw-bold mb-0 text-white">VINACOMIN</h6>
          <small className="text-secondary" style={{ fontSize: '0.75rem' }}>
            {t('sidebar.subTitle', 'Thiết Kế Quạt Hướng Trục')}
          </small>
        </div>
        <hr className="border-secondary opacity-25" />

        <div className="nav nav-pills flex-column gap-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`nav-link text-start text-white-50 border-0 ${
                activeTab === item.id ? 'active bg-primary text-white fw-bold shadow-sm' : ''
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <i className={`bi ${item.icon} me-2`}></i>
              {t(item.translationKey, item.id)}
            </button>
          ))}
        </div>
      </div>

      <div className="p-2 bg-secondary bg-opacity-10 rounded text-center border border-secondary border-opacity-25">
        <small className="text-success d-block">
          <i className="bi bi-check-circle-fill me-1"></i> System Ready
        </small>
        <small className="text-muted" style={{ fontSize: '0.7rem' }}>v2.5 • CAD Studio</small>
      </div>
    </div>
  );
};