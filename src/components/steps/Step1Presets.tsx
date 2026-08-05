import React from 'react';
import { useTranslation } from 'react-i18next';
import { fanPresets } from '../../config/fanPresets';
import { MathFormula } from '../common/MathFormula';
import { useFanStore } from '../../store/useFanStore';
import type { FanPreset } from '../../models/FanPreset';
import { formatNumber } from '../../utils/format';

export const Step1Presets: React.FC = () => {
    const { t } = useTranslation();

    // Lấy dữ liệu và hàm từ Zustand store
    const {
        step1Input,
        step1Output,
        setStep1Input,
        updateStep1Field,
        decimalPlaces,
        setDecimalPlaces,
    } = useFanStore();

    // Bắt sự kiện thay đổi input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as keyof FanPreset;
        const val = e.target.value;

        // Tránh lỗi gõ số 0 hoặc xóa trống input làm gõ số tiếp theo bị đè/lỗi
        const numericValue = val === '' ? 0 : parseFloat(val);
        updateStep1Field(name, numericValue);
    };

    return (
        <div className="container-fluid p-0">
            {/* Page Title */}
            <div className="mb-4">
                <h5 className="fw-bold text-dark mb-1">{t('step1.title')}</h5>
                <p className="text-muted small">{t('step1.subtitle')}</p>
            </div>

            {/* 1. SELECTION CARDS */}
            <h6 className="fw-bold mb-3 text-secondary">
                <i className="bi bi-collection-play me-2"></i>
                {t('step1.presetTitle')}
            </h6>

            <div className="row g-3 mb-4">
                {fanPresets.map((preset) => {
                    const isSelected = step1Input.id === preset.id;
                    return (
                        <div
                            key={preset.id}
                            className="col-12 col-sm-6 col-lg-4"
                        >
                            <div
                                className={`card h-100 shadow-sm transition-all ${
                                    isSelected
                                        ? 'border-primary border-2 bg-primary bg-opacity-10'
                                        : 'border-light-subtle'
                                }`}
                                style={{
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease-in-out',
                                }}
                                onClick={() => setStep1Input(preset)}
                            >
                                <div className="card-body d-flex flex-column justify-content-between p-3">
                                    <div>
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span
                                                className={`badge ${isSelected ? 'bg-primary' : 'bg-secondary'}`}
                                            >
                                                ID: #{preset.id}
                                            </span>
                                            {isSelected && (
                                                <span className="badge bg-success">
                                                    <i className="bi bi-check-lg me-1"></i>
                                                    {t('step1.selected')}
                                                </span>
                                            )}
                                        </div>
                                        <h6 className="fw-bold text-dark">
                                            {t(preset.nameKey)}
                                        </h6>
                                        <p className="text-muted small mb-3">
                                            {t(preset.descriptionKey)}
                                        </p>
                                    </div>

                                    <div className="bg-white p-2 rounded border border-light-subtle small mb-3">
                                        <div className="d-flex justify-content-between">
                                            <span className="text-muted">
                                                Q:
                                            </span>
                                            <strong className="text-dark">
                                                {preset.airflow} m³/s
                                            </strong>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span className="text-muted">
                                                Δp:
                                            </span>
                                            <strong className="text-dark">
                                                {preset.staticPressure} Pa
                                            </strong>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span className="text-muted">
                                                n:
                                            </span>
                                            <strong className="text-dark">
                                                {preset.rotationSpeed} v/p
                                            </strong>
                                        </div>
                                    </div>

                                    <button
                                        className={`btn btn-sm w-100 fw-bold ${
                                            isSelected
                                                ? 'btn-primary'
                                                : 'btn-outline-primary'
                                        }`}
                                    >
                                        {isSelected
                                            ? t('step1.selected')
                                            : t('step1.selectBtn')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 2. CUSTOMIZABLE FORM */}
            <div className="card border-0 shadow-sm p-4">
                <h6 className="fw-bold mb-3 text-dark border-bottom pb-2">
                    <i className="bi bi-sliders me-2 text-primary"></i>
                    {t('step1.customTitle')}
                </h6>
                {/* Ô nhập số chữ số thập phân */}
                <div className="d-flex align-items-center gap-2">
                    <label
                        htmlFor="decimalInput"
                        className="form-label small fw-bold text-muted mb-0 text-nowrap"
                    >
                        {t('step1.numberOfDecimal')}
                    </label>
                    <input
                        id="decimalInput"
                        type="number"
                        className="form-control form-control-sm fw-bold text-primary text-center border-primary-subtle"
                        style={{ width: '65px' }}
                        min={0}
                        max={10}
                        value={decimalPlaces}
                        onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            if (isNaN(val)) {
                                setDecimalPlaces(0);
                            } else {
                                // Khống chế người dùng chỉ nhập từ 0 đến 10
                                const clamped = Math.min(Math.max(val, 0), 10);
                                setDecimalPlaces(clamped);
                            }
                        }}
                    />
                </div>
                <div className="row g-3 mb-4">
                    <div className="col-12 col-sm-6 col-lg-4 col-xl-2">
                        <label
                            className="form-label small fw-bold text-muted text-truncate w-100"
                            title={t('step1.labels.airflow')}
                        >
                            {t('step1.labels.airflow')}
                        </label>
                        <div className="input-group input-group-sm flex-nowrap">
                            <input
                                type="number"
                                className="form-control fw-bold"
                                name="airflow"
                                value={step1Input.airflow || ''}
                                onChange={handleInputChange}
                                step="0.1"
                            />
                            <span className="input-group-text bg-light text-muted">
                                m³/s
                            </span>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
                        <label
                            className="form-label small fw-bold text-muted text-truncate w-100"
                            title={t('step1.labels.staticPressure')}
                        >
                            {t('step1.labels.staticPressure')}
                        </label>
                        <div className="input-group input-group-sm flex-nowrap">
                            <input
                                type="number"
                                className="form-control fw-bold"
                                name="staticPressure"
                                value={step1Input.staticPressure || ''}
                                onChange={handleInputChange}
                            />
                            <span className="input-group-text bg-light text-muted">
                                Pa
                            </span>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-4 col-xl-2">
                        <label
                            className="form-label small fw-bold text-muted text-truncate w-100"
                            title={t('step1.labels.rotationSpeed')}
                        >
                            {t('step1.labels.rotationSpeed')}
                        </label>
                        <div className="input-group input-group-sm flex-nowrap">
                            <input
                                type="number"
                                className="form-control fw-bold"
                                name="rotationSpeed"
                                value={step1Input.rotationSpeed || ''}
                                onChange={handleInputChange}
                            />
                            <span className="input-group-text bg-light text-muted">
                                rot/min
                            </span>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-6 col-xl-3">
                        <label
                            className="form-label small fw-bold text-muted text-truncate w-100"
                            title={t('step1.labels.gasDensity')}
                        >
                            {t('step1.labels.gasDensity')}
                        </label>
                        <div className="input-group input-group-sm flex-nowrap">
                            <input
                                type="number"
                                className="form-control fw-bold"
                                name="gasDensity"
                                value={step1Input.gasDensity || ''}
                                onChange={handleInputChange}
                                step="0.01"
                            />
                            <span className="input-group-text bg-light text-muted">
                                kg/m³
                            </span>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-6 col-xl-2">
                        <label
                            className="form-label small fw-bold text-muted text-truncate w-100"
                            title={t('step1.labels.bladeRingCount')}
                        >
                            {t('step1.labels.bladeRingCount')}
                        </label>
                        <div className="input-group input-group-sm flex-nowrap">
                            <input
                                type="number"
                                className="form-control fw-bold"
                                name="bladeRingCount"
                                value={step1Input.bladeRingCount || ''}
                                onChange={handleInputChange}
                            />
                            <span className="input-group-text bg-light text-muted">
                                m
                            </span>
                        </div>
                    </div>
                </div>

                {/* RESULT DISPLAY (Đã bỏ nút bấm thủ công, tự động cập nhật ngay khi sửa input) */}
                {step1Output !== null && (
                    <div className="alert alert-success w-100 mb-0 border-0 shadow-sm rounded-3 p-3 transition-all">
                        <small className="fw-bold text-success d-block mb-2">
                            <i className="bi bi-check-circle-fill me-1"></i>
                            {t('step1.sigmaResultTitle')}
                        </small>

                        <div className="bg-white p-3 rounded border border-success-subtle overflow-x-auto">
                            <MathFormula
                                fontSize="1.5rem"
                                formula={`\\sigma = n * \\frac{\\sqrt{Q}}{\\left(2 \\frac{\\Delta p}{\\rho}\\right)^{3/4}} * 2\\sqrt{\\pi} = \\left(\\frac{${step1Input.rotationSpeed}}{60}\\right) * \\frac{\\sqrt{${step1Input.airflow}}}{\\left(2 * \\frac{${step1Input.staticPressure}}{${step1Input.gasDensity}}\\right)^{3/4}} * 2\\sqrt{\\pi} = \\mathbf{${formatNumber(step1Output.sigma, decimalPlaces)}} \\quad [/]`}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
