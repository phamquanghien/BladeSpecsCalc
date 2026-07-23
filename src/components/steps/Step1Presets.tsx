import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { FanPreset } from '../../models/FanPreset';
import { fanPresets } from '../../config/fanPresets';
import { MathFormula } from '../common/MathFormula';

interface Step1Props {
    formData: FanPreset;
    setFormData: React.Dispatch<React.SetStateAction<FanPreset>>;
}

export const Step1Presets: React.FC<Step1Props> = ({
    formData,
    setFormData,
}) => {
    const { t } = useTranslation();
    const [sigmaResult, setSigmaResult] = useState<number | null>(null);

    // Hàm tính Hệ số đặc trưng Sigma (σ)
    const calculateSigma = () => {
        const { rotationSpeed, airflow, staticPressure, gasDensity } = formData;

        if (staticPressure <= 0 || gasDensity <= 0) {
            alert('Áp suất và Khối lượng riêng phải lớn hơn 0!');
            return;
        }

        // Chuyển n từ vòng/phút (rpm) sang vòng/giây (rps)
        const n_rps = rotationSpeed / 60;

        // Tử số: sqrt(Q)
        const numerator = Math.sqrt(airflow);

        // Mẫu số: (2 * DeltaP / rho)^(3/4)
        const denominator = Math.pow((2 * staticPressure) / gasDensity, 0.75);

        // Công thức: sigma = n_rps * (sqrt(Q) / denominator) * 2 * sqrt(pi)
        const sigma =
            n_rps * (numerator / denominator) * 2 * Math.sqrt(Math.PI);

        setSigmaResult(Number(sigma.toFixed(4)));
    };
    // Hàm chọn Preset -> Cập nhật toàn bộ Form
    const handleSelectPreset = (preset: FanPreset) => {
        setFormData(preset);
        setSigmaResult(null); // Reset kết quả tính khi chọn preset mới
    };

    // Hàm thay đổi giá trị trong Input Form
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: parseFloat(value) || 0,
        }));
        setSigmaResult(null); // Reset kết quả tính khi thay đổi số
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
                    const isSelected = formData.id === preset.id;
                    return (
                        <div key={preset.id} className="col-md-4">
                            <div
                                className={`card h-100 shadow-sm cursor-pointer transition-all ${
                                    isSelected
                                        ? 'border-primary border-2 bg-primary bg-opacity-10'
                                        : 'border-light-subtle'
                                }`}
                                style={{
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease-in-out',
                                }}
                                onClick={() => handleSelectPreset(preset)}
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

                                    {/* Quick specs preview */}
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
                <div className="row g-3 mb-4">
                    <div className="col-md-2">
                        <label className="form-label small fw-bold text-muted">
                            {t('step1.labels.airflow')}
                        </label>
                        <div className="input-group">
                            <input
                                type="number"
                                className="form-control fw-bold"
                                name="airflow"
                                value={formData.airflow}
                                onChange={handleInputChange}
                                step="0.1"
                            />
                            <span className="input-group-text bg-light text-muted">
                                m³/s
                            </span>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <label className="form-label small fw-bold text-muted">
                            {t('step1.labels.staticPressure')}
                        </label>
                        <div className="input-group">
                            <input
                                type="number"
                                className="form-control fw-bold"
                                name="staticPressure"
                                value={formData.staticPressure}
                                onChange={handleInputChange}
                            />
                            <span className="input-group-text bg-light text-muted">
                                Pa
                            </span>
                        </div>
                    </div>

                    <div className="col-md-2">
                        <label className="form-label small fw-bold text-muted">
                            {t('step1.labels.rotationSpeed')}
                        </label>
                        <div className="input-group">
                            <input
                                type="number"
                                className="form-control fw-bold"
                                name="rotationSpeed"
                                value={formData.rotationSpeed}
                                onChange={handleInputChange}
                            />
                            <span className="input-group-text bg-light text-muted">
                                rot/min
                            </span>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <label className="form-label small fw-bold text-muted">
                            {t('step1.labels.gasDensity')}
                        </label>
                        <div className="input-group">
                            <input
                                type="number"
                                className="form-control fw-bold"
                                name="gasDensity"
                                value={formData.gasDensity}
                                onChange={handleInputChange}
                                step="0.01"
                            />
                            <span className="input-group-text bg-light text-muted">
                                kg/m³
                            </span>
                        </div>
                    </div>

                    <div className="col-md-2">
                        <label className="form-label small fw-bold text-muted">
                            {t('step1.labels.bladeRingCount')}
                        </label>
                        <div className="input-group">
                            <input
                                type="number"
                                className="form-control fw-bold"
                                name="bladeRingCount"
                                value={formData.bladeRingCount}
                                onChange={handleInputChange}
                            />
                            <span className="input-group-text bg-light text-muted">
                                m
                            </span>
                        </div>
                    </div>
                </div>
                {/* ACTION BUTTON & RESULT DISPLAY */}
                <div className="border-top pt-3 d-flex flex-column align-items-start gap-3">
                    <button
                        className="btn btn-primary fw-bold px-4 shadow-sm"
                        onClick={calculateSigma}
                    >
                        <i className="bi bi-calculator-fill me-2"></i>
                        {t('step1.calcSigmaBtn')}
                    </button>
                    {/* Khung hiển thị công thức và kết quả */}
                    {sigmaResult !== null && (
                        <div className="alert alert-success w-100 mb-0 border-0 shadow-sm rounded-3 p-3">
                            <small className="text-uppercase fw-bold text-success d-block mb-2">
                                <i className="bi bi-check-circle-fill me-1"></i>
                                {t('step1.sigmaResultTitle')}
                            </small>

                            <div className="bg-white p-3 rounded border border-success-subtle overflow-auto">
                                <MathFormula
                                    fontSize="1.5rem"
                                    formula={`\\sigma = n * \\frac{\\sqrt{Q}}{\\left(2 \\frac{\\Delta p}{\\rho}\\right)^{3/4}} * 2\\sqrt{\\pi} = \\left(\\frac{${formData.rotationSpeed}}{60}\\right) * \\frac{\\sqrt{${formData.airflow}}}{\\left(2 * \\frac{${formData.staticPressure}}{${formData.gasDensity}}\\right)^{3/4}} * 2\\sqrt{\\pi} = \\mathbf{${sigmaResult}} \\quad [/]`}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
