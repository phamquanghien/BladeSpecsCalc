import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatNumber } from '../../../../utils/format';
import { CalculatedDataRow } from './CalculatedDataRow';
import { useFanStore } from '../../../../store/useFanStore';

type FanStoreState = ReturnType<typeof useFanStore.getState>;

interface SectionAnglesProps {
    step3Output: FanStoreState['step3Output'];
    decimalPlaces: number;
}

export const SectionAngles: React.FC<SectionAnglesProps> = ({
    step3Output,
    decimalPlaces,
}) => {
    const { t } = useTranslation();
    const sections = step3Output?.sections || [];

    if (!step3Output || sections.length === 0) return null;

    return (
        <>
            {/* 10. Góc của các véc tơ tốc độ tương đối của quạt */}
            <CalculatedDataRow
                isHeaderRow
                colSpan={4}
                stt="10."
                label={t('step5.part10.title')}
            />

            {/* beta1i */}
            <CalculatedDataRow
                isSubHeader
                label={`- ${t('step5.part10.content1')}`}
            />
            {sections.map((section) => (
                <CalculatedDataRow
                    key={`section-beta1i-${section.sectionIndex}`}
                    label=""
                    symbol={
                        <>
                            &beta;<sub>1,{section.sectionIndex}</sub>
                        </>
                    }
                    value={formatNumber(section.beta1i, decimalPlaces)}
                    unit="[deg]"
                />
            ))}

            {/* beta2i */}
            <CalculatedDataRow
                isSubHeader
                label={`- ${t('step5.part10.content2')}`}
            />
            {sections.map((section) => (
                <CalculatedDataRow
                    key={`section-beta2i-${section.sectionIndex}`}
                    label=""
                    symbol={
                        <>
                            &beta;<sub>2,{section.sectionIndex}</sub>
                        </>
                    }
                    value={formatNumber(section.beta2i, decimalPlaces)}
                    unit="[deg]"
                />
            ))}

            {/* betainfi */}
            <CalculatedDataRow
                isSubHeader
                label={`- ${t('step5.part10.content3')}`}
            />
            {sections.map((section) => (
                <CalculatedDataRow
                    key={`section-betainfi-${section.sectionIndex}`}
                    label=""
                    symbol={
                        <>
                            &beta;<sub>∞,{section.sectionIndex}</sub>
                        </>
                    }
                    value={formatNumber(section.betainfi, decimalPlaces)}
                    unit="[deg]"
                />
            ))}

            {/* 11. Góc của các véc tơ tốc độ tuyệt đối của quạt */}
            <CalculatedDataRow
                isHeaderRow
                colSpan={4}
                stt="11."
                label={t('step5.part11.title')}
            />

            {/* alpha1 = 90 */}
            <CalculatedDataRow
                label={`- ${t('step5.part11.content1')}`}
                symbol={
                    <>
                        &alpha;<sub>1</sub>
                    </>
                }
                value="90"
                unit="[deg]"
            />

            {/* alpha2i */}
            <CalculatedDataRow
                isSubHeader
                label={`- ${t('step5.part11.content2')}`}
            />
            {sections.map((section) => (
                <CalculatedDataRow
                    key={`section-alpha2i-${section.sectionIndex}`}
                    label=""
                    symbol={
                        <>
                            &alpha;<sub>2,{section.sectionIndex}</sub>
                        </>
                    }
                    value={formatNumber(section.alpha2i, decimalPlaces)}
                    unit="[deg]"
                />
            ))}

            {/* alphainfi */}
            <CalculatedDataRow
                isSubHeader
                label={`- ${t('step5.part11.content3')}`}
            />
            {sections.map((section) => (
                <CalculatedDataRow
                    key={`section-alphainfi-${section.sectionIndex}`}
                    label=""
                    symbol={
                        <>
                            &alpha;<sub>∞,{section.sectionIndex}</sub>
                        </>
                    }
                    value={formatNumber(section.alphainfi, decimalPlaces)}
                    unit="[deg]"
                />
            ))}
        </>
    );
};
