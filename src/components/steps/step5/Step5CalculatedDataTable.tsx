// src/components/steps/step5/Step5CalculatedDataTable.tsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFanStore } from '../../../store/useFanStore';
import { formatNumber } from '../../../utils/format';

export const Step5CalculatedDataTable: React.FC = () => {
    const { t } = useTranslation();

    // Lấy cả step1Output và step2Output từ Zustand Store
    const { step1Output, step2Input, step2Output, step3Output, decimalPlaces } =
        useFanStore();

    if (
        !step1Output &&
        !step2Output &&
        !step2Input &&
        !step3Output?.sections?.length
    )
        return null;

    return (
        <div className="table-responsive shadow-sm rounded mb-4">
            <table className="table table-bordered align-middle mb-0 text-nowrap bg-white">
                <thead className="table-light text-center fw-bold">
                    <tr>
                        <th className="col-1">{t('step5.stt', '#')}</th>
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
                    {/* Mục II */}
                    <tr className="fw-bold bg-light">
                        <td colSpan={5} className="text-start py-2">
                            {t('step5.part2.title')}
                        </td>
                    </tr>

                    {/* Mục A */}
                    <tr className="fw-bold">
                        <td className="text-center">A.</td>
                        <td colSpan={4} className="text-start">
                            {t('step5.part2.fanBladeProfileDesignCalculation')}
                        </td>
                    </tr>

                    {/* 1. Hệ số đặc trưng tối ưu (Lấy từ step1Output) */}
                    {step1Output && (
                        <tr>
                            <td className="text-center fw-bold bg-primary text-white">
                                1.
                            </td>
                            <td className="fw-bold bg-primary text-white">
                                {t(
                                    'step5.part2.optimalCharacteristicCoefficient',
                                )}
                            </td>
                            <td className="text-center fw-bold bg-primary text-white">
                                &sigma;
                            </td>
                            <td className="text-center fw-bold bg-primary text-white">
                                {formatNumber(step1Output.sigma, decimalPlaces)}
                            </td>
                            <td className="text-center fw-bold bg-primary text-white">
                                [/]
                            </td>
                        </tr>
                    )}

                    {/* 2. Tra các hệ số tính toán tối ưu từ giản đồ (Lấy từ step1Output) */}
                    {step1Output && step2Input && (
                        <>
                            <tr>
                                <td className="text-center fw-bold bg-primary text-white">
                                    2.
                                </td>
                                <td
                                    colSpan={4}
                                    className="fw-bold bg-primary text-white"
                                >
                                    {t(
                                        'step5.part2.lookupOptimalCalculationCoefficientsFromDiagram',
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    -{' '}
                                    {t(
                                        'step5.part2.optimalDiameterCoefficient',
                                    )}
                                </td>
                                <td className="text-center">&delta;</td>
                                <td className="text-center fw-bold text-primary">
                                    {formatNumber(
                                        step2Input.delta,
                                        decimalPlaces,
                                    )}
                                </td>
                                <td className="text-center">[/]</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    -{' '}
                                    {t(
                                        'step5.part2.bladeRootToTipDiameterRatio',
                                    )}
                                </td>
                                <td className="text-center">
                                    D<sub>f</sub>/D<sub>a</sub>
                                </td>
                                <td className="text-center fw-bold text-primary">
                                    {formatNumber(
                                        step2Input.dfDaRatio,
                                        decimalPlaces,
                                    )}
                                </td>
                                <td className="text-center">[/]</td>
                            </tr>
                        </>
                    )}

                    {/* 3. Đường kính đỉnh và đường kính chân cánh quạt (Ưu tiên lấy từ step2Output, fallback sang step1Output) */}
                    {step2Output && (
                        <>
                            <tr>
                                <td className="text-center fw-bold bg-primary text-white">
                                    3.
                                </td>
                                <td
                                    colSpan={4}
                                    className="fw-bold bg-primary text-white"
                                >
                                    {t('step5.part2.fanTipAndRootDiameters')}
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>- {t('step5.part2.bladeTipDiameter')}</td>
                                <td className="text-center">
                                    D<sub>a</sub>
                                </td>
                                <td className="text-center fw-bold text-primary">
                                    {formatNumber(
                                        step2Output.da,
                                        decimalPlaces,
                                    )}
                                </td>
                                <td className="text-center">[m]</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>- {t('step5.part2.bladeRootDiameter')}</td>
                                <td className="text-center">
                                    D<sub>f</sub>
                                </td>
                                <td className="text-center fw-bold text-primary">
                                    {formatNumber(
                                        step2Output.df,
                                        decimalPlaces,
                                    )}
                                </td>
                                <td className="text-center">[m]</td>
                            </tr>
                        </>
                    )}

                    {/* 4. Diện tích toàn phần của bánh công tác quạt */}
                    {step2Output && (
                        <>
                            <tr>
                                <td className="text-center fw-bold bg-primary text-white">
                                    4.
                                </td>
                                <td className="fw-bold bg-primary text-white">
                                    {t('step5.part2.totalFanImpellerArea')}
                                </td>
                                <td className="text-center fw-bold bg-primary text-white">
                                    A<sub>m</sub>
                                </td>
                                <td className="text-center fw-bold bg-primary text-white">
                                    {formatNumber(
                                        step2Output.am,
                                        decimalPlaces,
                                    )}
                                </td>
                                <td className="text-center fw-bold bg-primary text-white"></td>
                            </tr>
                        </>
                    )}
                    {/* 5. Phân chia các mặt cắt trụ để tính biên dạng cánh */}
                    {step3Output?.sections &&
                        step3Output.sections.length > 0 && (
                            <>
                                <tr>
                                    <td className="text-center fw-bold bg-primary text-white">
                                        5.
                                    </td>
                                    <td
                                        colSpan={4}
                                        className="fw-bold bg-primary text-white"
                                    >
                                        {t(
                                            'step5.part2.bladeProfileCylindricalSections',
                                        )}
                                    </td>
                                </tr>
                                {step3Output.sections.map((section) => (
                                    <tr key={`ring-di-${section.sectionIndex}`}>
                                        <td></td>
                                        <td>
                                            -{' '}
                                            {t('step5.part2.sectionIDiameter', {
                                                index: section.sectionLabel,
                                            })}
                                        </td>
                                        <td className="text-center">
                                            D<sub>{section.sectionLabel}</sub>
                                        </td>
                                        <td className="text-center fw-bold text-primary">
                                            {formatNumber(
                                                section.Di,
                                                decimalPlaces,
                                            )}
                                        </td>
                                        <td className="text-center">[m]</td>
                                    </tr>
                                ))}
                            </>
                        )}
                </tbody>
            </table>
        </div>
    );
};
