import React from 'react';
import { Step3Image } from './Step3Image';
import { Step3Table } from './Step3Table';

export const Step3: React.FC = () => {
    return (
        <div className="step2-wrapper">
            {/* Phần 1: Ảnh tra cứu */}
            <Step3Image
                src="/images/step3/11PhanBoCacTietDienCanh.png"
                alt="Distribution of Blade Sections"
                fallbackText="Distribution of Blade Sections"
            />
            {/* Phần 2: Hiển thị kết quả tính toán các công thức trên table*/}
            <Step3Table />
            <Step3Image
                src="/images/step3/Hinh1113B.png"
                alt="Distribution of Blade Sections"
                fallbackText="Distribution of Blade Sections"
            />
        </div>
    );
};
