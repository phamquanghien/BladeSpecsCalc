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
                            symbol=""
                            value={formatNumber(sec.Ai, decimalPlaces)}
                            unit="[cm²]"
                        />
                    </React.Fragment>
                );
            })}
        </>
    );
};
