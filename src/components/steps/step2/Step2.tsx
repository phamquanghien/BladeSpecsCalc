import React from 'react';
import { Step2Inputs } from './Step2Inputs';
import { Step2MathResults } from './Step2MathResults';

export const Step2: React.FC = () => {
    return (
        <div className="step2-wrapper">
            {/* Phần 1: Ảnh tra cứu + Form chọn/sửa Delta & Df/Da */}
            <Step2Inputs />

            {/* Các phần tiếp theo (Tính toán công thức Da, Df, Am, Omega, Y_lt, P_lt...) sẽ được gắn ở đây */}
            <Step2MathResults />
        </div>
    );
};
