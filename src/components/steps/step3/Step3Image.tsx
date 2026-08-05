import React from 'react';

export const Step3Image: React.FC = () => {
    return (
        <div className="container-fluid p-0">
            {/* 1. KHU VỰC HIỂN THỊ HÌNH CẦN TRA CỨU */}
            <div className="card border-0 shadow-sm p-3 mb-4">
                <div className="row g-3">
                    {/* Hình 1: Đồ thị / Sơ đồ tra cứu Delta */}
                    <div className="col-12 col-md-6 mx-auto">
                        <div className="flex-grow-1 d-flex align-items-center justify-content-center bg-white rounded border p-2">
                            <img
                                src="/images/step3/11PhanBoCacTietDienCanh.png"
                                alt="Distribution of Blade Sections"
                                className="img-fluid"
                                style={{
                                    objectFit: 'contain',
                                }}
                                onError={(e) => {
                                    // Fallback hiển thị placeholder nếu chưa có file ảnh
                                    (e.target as HTMLImageElement).src =
                                        'https://via.placeholder.com/300x180?text=Chart+Delta+(δ)';
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
