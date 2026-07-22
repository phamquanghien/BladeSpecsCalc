import React, { type ReactNode, Suspense } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface MainLayoutProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  children: ReactNode;
}

// Component hiển thị tạm khi đang tải file dịch JSON
const LoadingFallback = () => (
  <div className="d-flex justify-content-center align-items-center vh-100 w-100 bg-light">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading translations...</span>
    </div>
  </div>
);

export const MainLayout: React.FC<MainLayoutProps> = ({ activeTab, setActiveTab, children }) => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-grow-1 p-4 overflow-auto">
          <Header />
          <main>{children}</main>
        </div>
      </div>
    </Suspense>
  );
};