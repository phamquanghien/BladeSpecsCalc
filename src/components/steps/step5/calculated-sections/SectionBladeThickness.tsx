// src/components/steps/step5/calculated-sections/SectionBladeThickness.tsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatNumber } from '../../../../utils/format';
import { CalculatedDataRow } from './CalculatedDataRow';
import { useFanStore } from '../../../../store/useFanStore';

export const SectionBladeThickness: React.FC = () => {
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
            {/* 17. Tiêu đề chính Mục 17 */}
            <CalculatedDataRow
                isHeaderRow
                colSpan={4}
                stt="17."
                label={t(
                    'step5.part17.title',
                    'Phân bố chiều dầy của các biên dạng cánh',
                )}
            />

            {/* Vòng lặp 1: Chạy qua các biên dạng cánh i */}
            {step4Sections.map((sec) => {
                const i = sec.sectionIndex;
                const points = sec.points || [];
                const boundaries = sec.boundaries || [];

                return (
                    <React.Fragment key={`section-thickness-${i}`}>
                        {/* Dòng tiêu đề phụ (Biên dạng cánh thứ i) */}
                        <CalculatedDataRow
                            label={`- ${t('step5.part17.content1', {
                                index: i,
                            })}`}
                            symbol={`Profile ${i}`}
                            value="(x,d)"
                            unit="[mm]"
                        />

                        {/* Vòng lặp 2: Chạy qua 16 điểm (k từ 1 đến 16) */}
                        {Array.from(
                            { length: 16 },
                            (_, index) => index + 1,
                        ).map((k) => {
                            const xik = points[k - 1]?.xik ?? 0;
                            const dij = boundaries[k - 1]?.dij ?? 0;

                            return (
                                <CalculatedDataRow
                                    key={`section-${i}-point-${k}`}
                                    stt=""
                                    label=""
                                    symbol={k}
                                    value={
                                        <>
                                            ({formatNumber(xik, decimalPlaces)},{' '}
                                            {formatNumber(dij, decimalPlaces)})
                                        </>
                                    }
                                    unit="[mm]"
                                />
                            );
                        })}
                    </React.Fragment>
                );
            })}
        </>
    );
};
