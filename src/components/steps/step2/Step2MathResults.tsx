import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFanStore } from '../../../store/useFanStore';
import { MathFormula } from '../../common/MathFormula';
import { formatNumber } from '../../../utils/format';

export const Step2MathResults: React.FC = () => {
    const { t } = useTranslation();
    const { step1Input, step2Input, step2Output, decimalPlaces } =
        useFanStore();

    if (!step2Output) return null;

    const { airflow: Q, staticPressure: deltaP, gasDensity: rho } = step1Input;
    const { delta, dfDaRatio } = step2Input;
    const { da, df, am, omega } = step2Output;

    return (
        <div className="card border-0 shadow-sm p-4 mt-4">
            <h6 className="fw-bold mb-3 text-dark border-bottom pb-2">
                <i className="bi bi-calculator me-2 text-success"></i>
                {t('step2.resultsTitle')}
            </h6>

            <div className="row g-3">
                {/* 1. Công thức và kết quả Da */}
                <div className="col-12 col-lg-6">
                    <div className="p-3 bg-light rounded border border-light-subtle h-100">
                        <small className="fw-bold text-primary d-block mb-2">
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: t('step2.tipDiameter'),
                                }}
                            />
                        </small>
                        <div className="bg-white p-2 rounded border overflow-x-auto mb-2">
                            <MathFormula
                                fontSize="1.5rem"
                                formula={`D_a = \\delta \\frac{\\sqrt{Q}}{\\left(2 \\frac{\\Delta p}{\\rho}\\right)^{1/4}} \\frac{2}{\\sqrt{\\pi}} = ${delta} \\cdot \\frac{\\sqrt{${Q}}}{\\left(2 \\cdot \\frac{${deltaP}}{${rho}}\\right)^{1/4}} \\cdot \\frac{2}{\\sqrt{\\pi}} = \\mathbf{${formatNumber(da, decimalPlaces)}} \\quad [m]`}
                            />
                        </div>
                    </div>
                </div>

                {/* 2. Công thức và kết quả Df */}
                <div className="col-12 col-lg-6">
                    <div className="p-3 bg-light rounded border border-light-subtle h-100">
                        <small className="fw-bold text-primary d-block mb-2">
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: t('step2.hubDiameter'),
                                }}
                            />
                        </small>
                        <div className="bg-white p-2 rounded border overflow-x-auto mb-2">
                            <MathFormula
                                fontSize="1.5rem"
                                formula={`D_f = \\left(\\frac{D_f}{D_a}\\right) \\cdot D_a = ${dfDaRatio} \\cdot ${formatNumber(da, decimalPlaces)} = \\mathbf{${formatNumber(df, decimalPlaces)}} \\quad [m]`}
                            />
                        </div>
                    </div>
                </div>

                {/* 3. Công thức và kết quả Am */}
                <div className="col-12 col-lg-6">
                    <div className="p-3 bg-light rounded border border-light-subtle h-100">
                        <small className="fw-bold text-primary d-block mb-2">
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: t('step2.am'),
                                }}
                            />
                        </small>
                        <div className="bg-white p-2 rounded border overflow-x-auto mb-2">
                            <MathFormula
                                fontSize="1.5rem"
                                formula={`A_m = \\frac{\\pi}{4} D_a^2 \\left[ 1 - \\left(\\frac{D_f}{D_a}\\right)^2 \\right] = A_m = \\frac{\\pi}{4} \\cdot (${formatNumber(da, decimalPlaces)})^2 \\cdot \\left[ 1 - (${dfDaRatio})^2 \\right] = \\mathbf{${formatNumber(am, decimalPlaces)}} \\quad [m^2]`}
                            />
                        </div>
                    </div>
                </div>

                {/* 4. Công thức và kết quả Omega */}
                <div className="col-12 col-lg-6">
                    <div className="p-3 bg-light rounded border border-light-subtle h-100">
                        <small className="fw-bold text-primary d-block mb-2">
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: t('step2.omega'),
                                }}
                            />
                        </small>
                        <div className="bg-white p-2 rounded border overflow-x-auto mb-2">
                            <MathFormula
                                fontSize="1.5rem"
                                formula={`\\Omega = \\frac{1}{\\delta^2 \\sqrt{1 - \\left(\\frac{D_f}{D_a}\\right)^2}} = \\Omega = \\frac{1}{${delta}^2 \\cdot \\sqrt{1 - (${dfDaRatio})^2}} = \\mathbf{${formatNumber(omega, decimalPlaces)}} \\quad [/]`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
