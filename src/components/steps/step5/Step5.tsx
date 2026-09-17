// src/components/steps/step5/Step5.tsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Step5InitialDataTable } from './Step5InitialDataTable';
import { Step5CalculatedDataTable } from './Step5CalculatedDataTable';

export const Step5: React.FC = () => {
    const { t } = useTranslation();

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="step5-wrapper p-3">
            <div className="d-flex justify-content-between align-items-center mb-4 no-print">
                <h5 className="fw-bold text-primary mb-0">
                    <i className="bi bi-file-earmark-check me-2"></i>
                    {t('step5.title')}
                </h5>
                <button
                    type="button"
                    className="btn btn-primary btn-sm shadow-sm"
                    onClick={handlePrint}
                >
                    <i className="bi bi-printer me-1"></i>
                    {t('step5.printExportReport')}
                </button>
            </div>

            {/* Mục I: Bảng dữ liệu đầu vào & thông số bền */}
            <Step5InitialDataTable />

            {/* Mục II: Bảng dữ liệu tổng hợp theo mặt cắt */}
            <Step5CalculatedDataTable />
        </div>
    );
};
