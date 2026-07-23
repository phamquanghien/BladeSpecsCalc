import { useState } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { Step1Presets } from './components/steps/Step1Presets';
import type { FanPreset } from './models/FanPreset';
import { fanPresets } from './config/fanPresets';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('step1');

  // Khởi tạo state dữ liệu quạt với mẫu số 1 làm mặc định
  const [fanData, setFanData] = useState<FanPreset>(fanPresets[0]);

  return (
    <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'step1' && (
        <Step1Presets formData={fanData} setFormData={setFanData} />
      )}

      {activeTab !== 'step1' && (
        <div className="card p-4 border-0 shadow-sm text-center py-5">
          <i className="bi bi-tools fs-1 text-primary mb-2"></i>
          <h5 className="fw-bold">Nội dung của {activeTab.toUpperCase()} đang được thiết kế...</h5>
          <p className="text-muted">Dữ liệu từ Bước 1 sẽ được truyền tiếp sang bước này.</p>
        </div>
      )}
    </MainLayout>
  );
}