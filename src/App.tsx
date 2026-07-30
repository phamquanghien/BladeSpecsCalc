import { useState } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { Step1Presets } from './components/steps/Step1Presets';

export default function App() {
    const [activeTab, setActiveTab] = useState<string>('step1');

    return (
        <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
            {activeTab === 'step1' && <Step1Presets />}
        </MainLayout>
    );
}
