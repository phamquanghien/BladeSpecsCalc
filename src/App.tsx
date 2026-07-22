import { useState } from 'react';
import { MainLayout } from './components/layout/MainLayout';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('step1');

  return (
    <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="card p-4 border-0 shadow-sm">
        <h5 className="fw-bold">Bạn đang chọn: {activeTab.toUpperCase()}</h5>
        <p className="text-muted mb-0">Khung giao diện MainLayout, Header, Sidebar và TypeScript đã sẵn sàng!</p>
      </div>
    </MainLayout>
  );
}