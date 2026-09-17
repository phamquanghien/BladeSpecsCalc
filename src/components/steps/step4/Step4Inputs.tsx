import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFanStore } from '../../../store/useFanStore';
import type { Step4Input } from '../../../models/Step4';

export const Step4Inputs: React.FC = () => {
    const { t } = useTranslation();
    const { step4Input, updateStep4Field } = useFanStore();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;

        let val: string | number = value;
        if (type === 'number') {
            val = value === '' ? 0 : parseFloat(value);
        }

        updateStep4Field(name as keyof Step4Input, val);
    };

    return (
        <div className="container-fluid p-0">
            {/* Header */}
            <div className="mb-4">
                <h5 className="fw-bold text-dark mb-1">{t('step4.title')}</h5>
            </div>

            {/* FORM NHẬP DỮ LIỆU ĐẦU VÀO */}
            <div className="card border-0 shadow-sm p-4 mb-4">
                <h6 className="fw-bold mb-3 text-dark border-bottom pb-2">
                    <i className="bi bi-sliders me-2 text-primary"></i>
                    {t('step4.inputDataForBladeStrengthCalculation')}
                </h6>

                <div className="row g-3">
                    {/* 1. Tên vật liệu */}
                    <div className="col-12 col-md-6 col-lg-4">
                        <label
                            className="form-label small fw-bold text-muted text-truncate w-100"
                            title="Vật liệu làm cánh quạt"
                        >
                            {t('step4.bladeMaterial')}
                        </label>
                        <div className="input-group input-group-sm flex-nowrap">
                            <span className="input-group-text bg-light text-muted">
                                <i className="bi bi-box-seam"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control fw-bold"
                                name="materialName"
                                value={step4Input.materialName || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    {/* 2. Mô men đàn hồi E */}
                    <div className="col-12 col-md-6 col-lg-4">
                        <label
                            className="form-label small fw-bold text-muted text-truncate w-100"
                            title="Mô men đàn hồi của vật liệu làm cánh quạt (E)"
                        >
                            {t('step4.materialElasticModulus')}
                        </label>
                        <div className="input-group input-group-sm flex-nowrap">
                            <span className="input-group-text bg-light text-dark fw-bold">
                                E
                            </span>
                            <input
                                type="number"
                                className="form-control fw-bold"
                                name="E"
                                value={step4Input.E === 0 ? '' : step4Input.E}
                                onChange={handleInputChange}
                            />
                            <span className="input-group-text bg-light text-muted">
                                MPa
                            </span>
                        </div>
                    </div>

                    {/* 3. Ứng suất kéo cho phép σ_k,cp */}
                    <div className="col-12 col-md-6 col-lg-4">
                        <label
                            className="form-label small fw-bold text-muted text-truncate w-100"
                            title="Ứng suất kéo cho phép (σk,cp)"
                        >
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: t('step4.allowableTensileStress'),
                                }}
                            />
                        </label>
                        <div className="input-group input-group-sm flex-nowrap">
                            <span className="input-group-text bg-light text-dark fw-bold">
                                σ<sub>k,cp</sub>
                            </span>
                            <input
                                type="number"
                                className="form-control fw-bold"
                                name="sigmaKcp"
                                value={
                                    step4Input.sigmaKcp === 0
                                        ? ''
                                        : step4Input.sigmaKcp
                                }
                                onChange={handleInputChange}
                                step="0.1"
                            />
                            <span className="input-group-text bg-light text-muted">
                                MPa
                            </span>
                        </div>
                    </div>

                    {/* 4. Ứng suất uốn cho phép σ_u,cp */}
                    <div className="col-12 col-md-6 col-lg-4">
                        <label
                            className="form-label small fw-bold text-muted text-truncate w-100"
                            title="Ứng suất uốn cho phép (σu,cp)"
                        >
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: t('step4.allowableBendingStress'),
                                }}
                            />
                        </label>
                        <div className="input-group input-group-sm flex-nowrap">
                            <span className="input-group-text bg-light text-dark fw-bold">
                                σ<sub>u,cp</sub>
                            </span>
                            <input
                                type="number"
                                className="form-control fw-bold"
                                name="sigmaUcp"
                                value={
                                    step4Input.sigmaUcp === 0
                                        ? ''
                                        : step4Input.sigmaUcp
                                }
                                onChange={handleInputChange}
                                step="0.1"
                            />
                            <span className="input-group-text bg-light text-muted">
                                MPa
                            </span>
                        </div>
                    </div>

                    {/* 5. Khối lượng riêng P */}
                    <div className="col-12 col-md-6 col-lg-4">
                        <label
                            className="form-label small fw-bold text-muted text-truncate w-100"
                            title="Khối lượng riêng của vật liệu chế tạo cánh (P)"
                        >
                            {t('step4.bladeMaterialDensity')}
                        </label>
                        <div className="input-group input-group-sm flex-nowrap">
                            <span className="input-group-text bg-light text-dark fw-bold">
                                P
                            </span>
                            <input
                                type="number"
                                className="form-control fw-bold"
                                name="rhoMaterial"
                                value={
                                    step4Input.rhoMaterial === 0
                                        ? ''
                                        : step4Input.rhoMaterial
                                }
                                onChange={handleInputChange}
                            />
                            <span className="input-group-text bg-light text-muted">
                                kg/m³
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
