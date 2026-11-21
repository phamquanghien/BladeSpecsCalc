import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatNumber } from '../../../../utils/format';
import { CalculatedDataRow } from './CalculatedDataRow';
import { useFanStore } from '../../../../store/useFanStore';

export const SectionStrengthCheck: React.FC = () => {
    const { t } = useTranslation();
    const { step3Output, step4Output, decimalPlaces } = useFanStore();

    const step3Sections = step3Output?.sections || [];
    const step4Sections = step4Output?.sections || [];

    if (
        !step3Output ||
        step3Sections.length === 0 ||
        step4Sections.length === 0
    ) {
        return null;
    }

    return (
        <>
            {/* Mục A */}
            <tr className="fw-bold">
                <td className="text-center">B.</td>
                <td colSpan={4} className="text-start">
                    {t('step5.part18.title')}
                </td>
            </tr>
            {/* 17. Tiêu đề chính Mục 17 */}
            <CalculatedDataRow
                isHeaderRow
                colSpan={4}
                stt="1."
                label={t('step5.part19.title')}
            />

            {/* Vòng lặp 1: Chạy qua các biên dạng cánh i */}
            {step4Sections.map((sec) => {
                const i = sec.sectionIndex;

                return (
                    <React.Fragment key={`section-strength-check-${i}`}>
                        {/* Dòng tiêu đề phụ (Biên dạng cánh thứ i) */}
                        <CalculatedDataRow
                            label={`- ${t('step5.part19.content1', {
                                index: i,
                            })}`}
                            symbol={`Profile ${i}`}
                            value=""
                            unit=""
                        />
                        <CalculatedDataRow
                            key=""
                            symbol="A"
                            value={formatNumber(sec.Ai, decimalPlaces)}
                            unit="[cm²]"
                        />
                        <CalculatedDataRow
                            key=""
                            symbol="S"
                            value={`(${formatNumber(sec.xpsi, decimalPlaces)},${formatNumber(sec.ypsi, decimalPlaces)})`}
                            unit="[mm]"
                        />
                        <CalculatedDataRow
                            key=""
                            symbol={
                                <>
                                    J<sub>x</sub>
                                </>
                            }
                            value={formatNumber(sec.Jxi, decimalPlaces)}
                            unit="[cm⁴]"
                        />
                        <CalculatedDataRow
                            key=""
                            symbol={
                                <>
                                    J<sub>y</sub>
                                </>
                            }
                            value={formatNumber(sec.Jyi, decimalPlaces)}
                            unit="[cm⁴]"
                        />
                        <CalculatedDataRow
                            key=""
                            symbol={
                                <>
                                    W<sub>x</sub>
                                </>
                            }
                            value={formatNumber(sec.Wxi, decimalPlaces)}
                            unit="[cm³]"
                        />
                        <CalculatedDataRow
                            key=""
                            symbol={
                                <>
                                    W<sub>y</sub>
                                </>
                            }
                            value={formatNumber(sec.Wyi, decimalPlaces)}
                            unit="[cm³]"
                        />
                    </React.Fragment>
                );
            })}
            <CalculatedDataRow
                isHeaderRow
                colSpan={4}
                stt="2."
                label={t('step5.part20.title')}
            />
            <CalculatedDataRow
                label={t('step5.part20.content1')}
                symbol={
                    <>
                        F<sub>c</sub>
                    </>
                }
                value="2.321171E+09"
                unit="[N]"
            />
            <CalculatedDataRow
                label={t('step5.part20.content2')}
                symbol={
                    <>
                        σ<sub>kf</sub>
                    </>
                }
                value="15.036"
                unit="[MPa]"
            />
            <CalculatedDataRow
                label={t('step5.part20.content3')}
                symbol={
                    <>
                        &Delta;<sub>b</sub>
                    </>
                }
                value="0.014"
                unit="[mm]"
            />
            <CalculatedDataRow
                label={t('step5.part20.content4')}
                symbol="-"
                value="Đạt"
                unit=""
            />
            <CalculatedDataRow
                isHeaderRow
                colSpan={4}
                stt="3."
                label={t('step5.part21.title')}
            />
            <CalculatedDataRow
                label={t('step5.part21.content1')}
                symbol={
                    <>
                        M<sub>uu</sub>
                    </>
                }
                value="83.15194"
                unit="[Nm]"
            />
            <CalculatedDataRow
                label={t('step5.part21.content2')}
                symbol={
                    <>
                        M<sub>ua</sub>
                    </>
                }
                value="18.68428"
                unit="[Nm]"
            />
            <CalculatedDataRow
                label={t('step5.part21.content3')}
                symbol={
                    <>
                        M<sub>u</sub>
                    </>
                }
                value="85.22527"
                unit="[Nm]"
            />
            <CalculatedDataRow
                label={t('step5.part21.content4')}
                symbol={
                    <>
                        M<sub>ux</sub>
                    </>
                }
                value="66.38669"
                unit="[Nm]"
            />
            <CalculatedDataRow
                label={t('step5.part21.content5')}
                symbol={
                    <>
                        M<sub>uy</sub>
                    </>
                }
                value="-53.443"
                unit="[Nm]"
            />
            <CalculatedDataRow
                label={t('step5.part21.content6')}
                symbol={
                    <>
                        σ<sub>kf</sub>
                    </>
                }
                value="65.06"
                unit="[MPa]"
            />
            <CalculatedDataRow
                label={t('step5.part21.content7')}
                symbol="-"
                value="Đạt"
                unit=""
            />
        </>
    );
};
