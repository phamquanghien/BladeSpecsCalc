import React from 'react';
import { useTranslation } from 'react-i18next';
import { NAV_ITEMS } from '../../config/navigation';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tabId: string) => void;
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
    activeTab,
    setActiveTab,
    isOpen,
    onClose,
}) => {
    const { t } = useTranslation();

    const handleSelectTab = (tabId: string) => {
        setActiveTab(tabId);
        onClose(); // Tự đóng trên mobile khi click chọn
    };

    return (
        <>
            {/* 1. Lớp phủ mờ (chỉ hiện trên Mobile khi Sidebar mở) */}
            {isOpen && (
                <div
                    className="d-md-none position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50"
                    style={{ zIndex: 1040 }}
                    onClick={onClose}
                />
            )}

            {/* 2. Style CSS tối ưu chuẩn Responsive */}
            <style>{`
        /* Style mặc định cho Mobile (< 768px): Dạng Drawer Fixed trượt ra */
        .app-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 280px;
          z-index: 1050;
          transition: transform 0.3s ease-in-out;
          transform: translateX(-100%);
        }

        /* Khi mở trên Mobile */
        .app-sidebar.show-mobile {
          transform: translateX(0);
        }

        /* Style cho Màn hình lớn (≥ 768px): Đứng tĩnh cạnh Content, không che chữ */
        @media (min-width: 768px) {
          .app-sidebar {
            position: sticky !important;
            top: 0;
            transform: none !important;
            height: 100vh;
            z-index: 1;
          }
        }
      `}</style>

            {/* 3. Sidebar Container */}
            <div
                className={`app-sidebar bg-dark text-white p-3 d-flex flex-column justify-content-between flex-shrink-0 ${isOpen ? 'show-mobile' : ''}`}
            >
                <div>
                    {/* Header Sidebar */}
                    <div className="d-flex justify-content-between align-items-center mb-3 d-md-block text-center">
                        <div className="w-100">
                            <div className="d-inline-flex align-items-center justify-content-center bg-primary rounded-3 p-2 mb-2">
                                <i className="bi bi-fan fs-3 text-white"></i>
                            </div>
                            <h6 className="fw-bold mb-0 text-white">
                                HUMG - T26-06
                            </h6>
                            <small
                                className="text-secondary"
                                style={{ fontSize: '0.75rem' }}
                            >
                                {t('sidebar.subTitle')}
                            </small>
                        </div>

                        {/* Nút X đóng menu (Chỉ hiện ở Mobile) */}
                        <button
                            type="button"
                            className="btn-close btn-close-white d-md-none align-self-start"
                            onClick={onClose}
                        />
                    </div>

                    <hr className="border-secondary opacity-25" />

                    {/* Nav Links */}
                    <div className="nav nav-pills flex-column gap-2">
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item.id}
                                className={`nav-link text-start text-white-50 border-0 ${
                                    activeTab === item.id
                                        ? 'active bg-primary text-white fw-bold shadow-sm'
                                        : ''
                                }`}
                                onClick={() => handleSelectTab(item.id)}
                            >
                                <i className={`bi ${item.icon} me-2`}></i>
                                {t(item.translationKey)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
