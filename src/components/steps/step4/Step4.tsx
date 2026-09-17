import React from 'react';
import { useFanStore } from '../../../store/useFanStore';
import { Step4Inputs } from './Step4Inputs';
import { Step4DistributionTable } from './Step4DistributionTable';
import { Step3DistributionTable } from '../step3/Step3DistributionTable';
import { Step4BoundaryTable } from './Step4BoundaryTable';
import { Step4AreaTable } from './Step4AreaTable';

export const Step4: React.FC = () => {
    const { step3Output } = useFanStore();

    const hasStep3Data =
        step3Output && step3Output.sections && step3Output.sections.length > 0;

    return (
        <div className="step4-wrapper space-y-6">
            {/* Form nhập dữ liệu Bước 4 */}
            <Step4Inputs />

            {/* Bảng tham chiếu dữ liệu từ Bước 3 */}
            <Step3DistributionTable />

            {/* Các bảng kết quả tính toán Bước 4 */}
            {hasStep3Data ? (
                <>
                    <Step4DistributionTable />
                    <Step4BoundaryTable />
                    <Step4AreaTable />
                </>
            ) : (
                <div className="alert alert-warning mt-3">
                    Chưa có dữ liệu tính toán từ Bước 3. Vui lòng hoàn thành
                    Bước 3 trước.
                </div>
            )}
        </div>
    );
};
