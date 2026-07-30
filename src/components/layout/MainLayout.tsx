import React, { type ReactNode, Suspense, useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface MainLayoutProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  children: ReactNode;
}

const LoadingFallback = () => (
  <div className="d-flex justify-content-center align-items-center vh-100 w-100 bg-light">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading translations...</span>
    </div>
  </div>
);

export const MainLayout: React.FC<MainLayoutProps> = ({ activeTab, setActiveTab, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
        {/* Sidebar Responsive */}
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Nội dung chính */}
        <div className="flex-grow-1 p-3 p-md-4 overflow-auto min-vh-100">
          <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <main>{children}</main>
        </div>
      </div>
    </Suspense>
  );
};