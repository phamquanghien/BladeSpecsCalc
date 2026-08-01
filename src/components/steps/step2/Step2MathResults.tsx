import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFanStore } from '../../../store/useFanStore';
import { MathFormula } from '../../common/MathFormula';

export const Step2MathResults: React.FC = () => {
    const { t } = useTranslation();
    const { step1Input, step2Input, step2Output } = useFanStore();

    if (!step2Output) return null;

    const { airflow: Q, staticPressure: deltaP, gasDensity: rho } = step1Input;
    const { delta, dfDaRatio } = step2Input;
    const { da, df } = step2Output;

    return (
        <div className="card border-0 shadow-sm p-4 mt-4">
            <h6 className="fw-bold mb-3 text-dark border-bottom pb-2">
                <i className="bi bi-calculator me-2 text-success"></i>
                {t(
                    'step2.resultsTitle',
                    'Kết quả tính toán đường kính Da và Df',
                )}
            </h6>

            <div className="row g-3">
                {/* 1. Công thức và kết quả Da */}
                <div className="col-12 col-lg-6">
                    <div className="p-3 bg-light rounded border border-light-subtle h-100">
                        <small className="fw-bold text-primary d-block mb-2">
                            1. Đường kính đỉnh bánh công tác ($D_a$)
                        </small>
                        <div className="bg-white p-2 rounded border overflow-x-auto mb-2">
                            <MathFormula
                                fontSize="1.5rem"
                                formula={`D_a = \\delta \\frac{\\sqrt{Q}}{\\left(2 \\frac{\\Delta p}{\\rho}\\right)^{1/4}} \\frac{2}{\\sqrt{\\pi}} = ${delta} \\cdot \\frac{\\sqrt{${Q}}}{\\left(2 \\cdot \\frac{${deltaP}}{${rho}}\\right)^{1/4}} \\cdot \\frac{2}{\\sqrt{\\pi}} = \\mathbf{${da}} \\quad [m]`}
                            />
                        </div>
                    </div>
                </div>

                {/* 2. Công thức và kết quả Df */}
                <div className="col-12 col-lg-6">
                    <div className="p-3 bg-light rounded border border-light-subtle h-100">
                        <small className="fw-bold text-primary d-block mb-2">
                            2. Đường kính chân bánh công tác ($D_f$)
                        </small>
                        <div className="bg-white p-2 rounded border overflow-x-auto mb-2">
                            <MathFormula
                                fontSize="1.5rem"
                                formula={`D_f = \\left(\\frac{D_f}{D_a}\\right) \\cdot D_a = ${dfDaRatio} \\cdot ${da} = \\mathbf{${df}} \\quad [m]`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
