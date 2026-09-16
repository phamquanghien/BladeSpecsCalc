// src/components/steps/step5/calculated-sections/SectionBladeThickness.tsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatNumber } from '../../../../utils/format';
import { CalculatedDataRow } from './CalculatedDataRow';
import { useFanStore } from '../../../../store/useFanStore';
import type { SectionBoundaryData } from '../../../../math/step4';
import type { Step4Output } from '../../../../models/Step4';

type FanStoreState = ReturnType<typeof useFanStore.getState>;

interface SectionBladeThicknessProps {
    step3Output: FanStoreState['step3Output'];
    step4Output?: Step4Output | null; // 🟢 Dùng trực tiếp type Step4Output
    step4Boundary?: SectionBoundaryData[];
    decimalPlaces: number;
}

export const SectionBladeThickness: React.FC<SectionBladeThicknessProps> = ({
    step3Output,
    step4Output,
    step4Boundary,
    decimalPlaces,
}) => {
    const { t } = useTranslation();
    const sections = step3Output?.sections || [];

    if (!step3Output || sections.length === 0) return null;

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

            {/* Vòng lặp 1: Chạy qua các biên dạng cánh i (Cột 2) */}
            {sections.map((section, idx) => {
                // Lấy mảng points chứa xik từ step4Output tương ứng với mặt cắt i
                const sectionDist = step4Output?.sectionsDistribution?.[idx];
                const points = sectionDist?.points || [];

                // Lấy mảng boundaries chứa dij từ step4Boundary tương ứng với mặt cắt i
                const sectionBound = step4Boundary?.[idx];
                const boundaries = sectionBound?.boundaries || [];

                return (
                    <React.Fragment
                        key={`section-thickness-${section.sectionIndex}`}
                    >
                        {/* Dòng tiêu đề phụ (Biên dạng cánh thứ i) */}
                        <CalculatedDataRow
                            label={`- ${t('step5.part17.content1', {
                                index: section.sectionIndex,
                            })}`}
                            symbol={`Profile ${section.sectionIndex}`}
                            value="(x,d)"
                            unit="[mm]"
                        />

                        {/* Vòng lặp 2: Chạy cố định 16 điểm (Cột 3: k từ 1 đến 16) */}
                        {Array.from(
                            { length: 16 },
                            (_, index) => index + 1,
                        ).map((k) => {
                            // Cột 4: Giá trị Xik (lấy điểm k-1 từ points) và Dij (lấy điểm k-1 từ boundaries)
                            const xik = points[k - 1]?.xik ?? 0;
                            const dij = boundaries[k - 1]?.dij ?? 0;

                            return (
                                <CalculatedDataRow
                                    key={`section-${section.sectionIndex}-point-${k}`}
                                    stt=""
                                    label=""
                                    symbol={k}
                                    value={
                                        <>
                                            ({formatNumber(xik, decimalPlaces)}{' '}
                                            , {formatNumber(dij, decimalPlaces)}
                                            )
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
