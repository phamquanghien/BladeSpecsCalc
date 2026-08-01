import { useState } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { Step1Presets } from './components/steps/Step1Presets';
import { Step2 } from './components/steps/step2/Step2';

export default function App() {
    const [activeTab, setActiveTab] = useState<string>('step1');

    return (
        <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
            {activeTab === 'step1' && <Step1Presets />}
            {activeTab === 'step2' && <Step2 />}
        </MainLayout>
    );
}
