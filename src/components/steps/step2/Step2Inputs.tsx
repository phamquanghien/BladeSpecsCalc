import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFanStore } from '../../../store/useFanStore';
import type { Step2Input } from '../../../models/Step2';

export const Step2Inputs: React.FC = () => {
    const { t } = useTranslation();
    const { step2Input, updateStep2Field } = useFanStore();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as keyof Step2Input;
        const val = e.target.value;
        const numericValue = val === '' ? 0 : parseFloat(val);
        updateStep2Field(name, numericValue);
    };

    return (
        <div className="container-fluid p-0">
            {/* Header */}
            <div className="mb-4">
                <h5 className="fw-bold text-dark mb-1">
                    <span
                        dangerouslySetInnerHTML={{ __html: t('step2.title') }}
                    />
                </h5>
                <p className="text-muted small mb-0">{t('step2.subtitle')}</p>
            </div>

            {/* 1. KHU VỰC HIỂN THỊ 3 HÌNH CẦN TRA CỨU */}
            <div className="card border-0 shadow-sm p-3 mb-4">
                <div className="row g-3">
                    {/* Hình 1: Đồ thị / Sơ đồ tra cứu Delta */}
                    <div className="col-12 col-md-4">
                        <div className="border rounded p-2 text-center bg-light h-100 d-flex flex-column justify-content-between">
                            <small className="fw-bold d-block mb-2 text-dark">
                                {t('step2.fig1Title')}
                            </small>
                            <div className="flex-grow-1 d-flex align-items-center justify-content-center bg-white rounded border p-2">
                                <img
                                    src="/images/step2/2CacDangQuat.png"
                                    alt="Đồ thị tra cứu Delta"
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

                    {/* Hình 2: Đồ thị / Sơ đồ tra cứu tỷ số Df/Da */}
                    <div className="col-12 col-md-4">
                        <div className="border rounded p-2 text-center bg-light h-100 d-flex flex-column justify-content-between">
                            <small className="fw-bold d-block mb-2 text-dark">
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: t('step2.fig2Title'),
                                    }}
                                />
                            </small>
                            <div className="flex-grow-1 d-flex align-items-center justify-content-center bg-white rounded border p-2">
                                <img
                                    src="/images/step2/3GianDoChonDelta.png"
                                    alt="Đồ thị tra cứu Df/Da"
                                    className="img-fluid"
                                    style={{
                                        objectFit: 'contain',
                                    }}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src =
                                            'https://via.placeholder.com/300x180?text=Chart+Df/Da';
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Hình 3: Minh họa kết cấu bánh công tác quạt */}
                    <div className="col-12 col-md-4">
                        <div className="border rounded p-2 text-center bg-light h-100 d-flex flex-column justify-content-between">
                            <small className="fw-bold d-block mb-2 text-dark">
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: t('step2.fig3Title'),
                                    }}
                                />
                            </small>
                            <div className="flex-grow-1 d-flex align-items-center justify-content-center bg-white rounded border p-2">
                                <img
                                    src="/images/step2/4QuanHeGiuaCacDaiLuong.png"
                                    alt="Sơ đồ kết cấu bánh công tác"
                                    className="img-fluid"
                                    style={{
                                        objectFit: 'contain',
                                    }}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src =
                                            'https://via.placeholder.com/300x180?text=Fan+Structure';
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. FORM NHẬP / CHỈNH SỬA GIÁ TRỊ DELTA VÀ Df/Da */}
            <div className="card border-0 shadow-sm p-4">
                <h6 className="fw-bold mb-3 text-dark border-bottom pb-2">
                    <i className="bi bi-sliders me-2 text-primary"></i>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: t('step2.sectionTitle2'),
                        }}
                    />
                </h6>

                <div className="row g-3">
                    {/* Ô nhập Delta */}
                    <div className="col-12 col-md-6">
                        <label
                            className="form-label small fw-bold text-muted"
                            title="Hệ số Delta (δ)"
                        >
                            {t('step2.labels.delta', 'Hệ số Delta (δ)')}
                        </label>
                        <div className="input-group input-group-sm flex-nowrap">
                            <span className="input-group-text bg-light text-dark fw-bold">
                                δ
                            </span>
                            <input
                                type="number"
                                className="form-control fw-bold"
                                name="delta"
                                value={step2Input.delta || ''}
                                onChange={handleInputChange}
                                step="0.01"
                            />
                        </div>
                    </div>

                    {/* Ô nhập Tỷ số Df/Da */}
                    <div className="col-12 col-md-6">
                        <label
                            className="form-label small fw-bold text-muted"
                            title="Tỷ số giữa đường kính chân và đỉnh bánh công tác (Df/Da)"
                        >
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: t('step2.labels.dfDaRatio'),
                                }}
                            />
                        </label>
                        <div className="input-group input-group-sm flex-nowrap">
                            <span className="input-group-text bg-light text-dark fw-bold">
                                D<sub>f</sub> / D<sub>a</sub>
                            </span>
                            <input
                                type="number"
                                className="form-control fw-bold"
                                name="dfDaRatio"
                                value={step2Input.dfDaRatio || ''}
                                onChange={handleInputChange}
                                step="0.01"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
