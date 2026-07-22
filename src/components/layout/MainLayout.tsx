import React, { type ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface MainLayoutProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ activeTab, setActiveTab, children }) => {
  return (
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-grow-1 p-4 overflow-auto">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
};