// src/components/steps/step5/Step5InitialDataTable.tsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFanStore } from '../../../store/useFanStore';
import { formatNumber } from '../../../utils/format';

export const Step5InitialDataTable: React.FC = () => {
    const { t } = useTranslation();
    const { step1Input, step4Input } = useFanStore();

    if (!step1Input) return null;

    // Xử lý dịch tên kiểu quạt (FanType): nếu nameKey là 1 i18n key thì dịch qua t(), nếu không thì dùng trực tiếp
    const fanTypeName = step1Input.nameKey
        ? t(step1Input.nameKey, { defaultValue: step1Input.nameKey })
        : '2K60-N°18';

    return (
        <div className="table-responsive shadow-sm rounded mb-4">
            <table className="table table-bordered align-middle mb-0 text-nowrap bg-white">
                <thead className="table-light text-center fw-bold">
                    <tr>
                        <th className="col-1">#</th>
                        <th className="text-start">
                            {t('step5.parameter', 'Thông số')}
                        </th>
                        <th className="col-2">
                            {t('step5.symbol', 'Ký hiệu')}
                        </th>
                        <th className="col-2">{t('step5.value', 'Giá trị')}</th>
                        <th className="col-2">{t('step5.unit', 'Đơn vị')}</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mục I */}
                    <tr className="fw-bold bg-light">
                        <td colSpan={5} className="text-start py-2">
                            {t('step5.part1.designCalculationInputData')}
                        </td>
                    </tr>

                    {/* Mục A */}
                    <tr className="fw-bold">
                        <td className="text-center">A.</td>
                        <td colSpan={4} className="text-start">
                            {t('step5.part1.fanBladeProfileDesignCalculation')}
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>- {t('step5.part1.axialFanType')}</td>
                        <td className="text-center">FanType</td>
                        <td className="text-center fw-bold text-primary">
                            {fanTypeName}
                        </td>
                        <td className="text-center"></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>- {t('step1.labels.airflow')}</td>
                        <td className="text-center">Q</td>
                        <td className="text-center fw-bold text-primary">
                            {formatNumber(step1Input.airflow, 0)}
                        </td>
                        <td className="text-center">[m^3/s]</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>- {t('step1.labels.staticPressure')}</td>
                        <td className="text-center">&Delta;p</td>
                        <td className="text-center fw-bold text-primary">
                            {formatNumber(step1Input.staticPressure, 0)}
                        </td>
                        <td className="text-center">[mmH2O]</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>- {t('step1.labels.rotationSpeed')}</td>
                        <td className="text-center">n</td>
                        <td className="text-center fw-bold text-primary">
                            {formatNumber(step1Input.rotationSpeed, 0)}
                        </td>
                        <td className="text-center">[rot/min]</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>- {t('step1.labels.gasDensity')}</td>
                        <td className="text-center">ro</td>
                        <td className="text-center fw-bold text-primary">
                            {formatNumber(step1Input.gasDensity || 1.2, 2)}
                        </td>
                        <td className="text-center">[kg/m^3]</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>- {t('step1.labels.bladeRingCount')}</td>
                        <td className="text-center">m</td>
                        <td className="text-center fw-bold text-primary">
                            {step1Input.bladeRingCount || 2}
                        </td>
                        <td className="text-center">
                            [{t('step5.part1.annular')}]
                        </td>
                    </tr>

                    {/* Mục B */}
                    <tr className="fw-bold">
                        <td className="text-center">B.</td>
                        <td colSpan={4} className="text-start">
                            {t('step5.part1.fanBladeStrengthCalculation')}
                        </td>
                    </tr>
                    {step4Input && (
                        <>
                            <tr>
                                <td></td>
                                <td>- {t('step5.part1.bladeMaterial')}</td>
                                <td className="text-center">Material</td>
                                <td className="text-center fw-bold text-primary">
                                    {step4Input.materialName}
                                </td>
                                <td className="text-center"></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    - {t('step5.part1.materialElasticModulus')}
                                </td>
                                <td className="text-center">E</td>
                                <td className="text-center fw-bold text-primary">
                                    {formatNumber(step4Input.E, 0)}
                                </td>
                                <td className="text-center">[MPa]</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    - {t('step5.part1.allowableTensileStress')}
                                </td>
                                <td className="text-center">[&sigma;k]</td>
                                <td className="text-center fw-bold text-primary">
                                    {formatNumber(step4Input.sigmaKcp, 2)}
                                </td>
                                <td className="text-center">[MPa]</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>- {t('step5.part1.materialDensity')}</td>
                                <td className="text-center">&rho;</td>
                                <td className="text-center fw-bold text-primary">
                                    {formatNumber(step4Input.rhoMaterial, 0)}
                                </td>
                                <td className="text-center">[kg/m^3]</td>
                            </tr>
                        </>
                    )}
                </tbody>
            </table>
        </div>
    );
};
