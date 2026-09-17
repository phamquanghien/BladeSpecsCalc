import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatNumber } from '../../../../utils/format';
import { CalculatedDataRow } from './CalculatedDataRow';
import { useFanStore } from '../../../../store/useFanStore';

export const SectionVelocitiesAndPressure: React.FC = () => {
    const { t } = useTranslation();
    const { step2Output, step3Output, decimalPlaces } = useFanStore();

    const sections = step3Output?.sections || [];

    return (
        <>
            {/* 5. Phân chia các mặt cắt trụ để tính biên dạng cánh */}
            {sections.length > 0 && (
                <>
                    <CalculatedDataRow
                        isHeaderRow
                        colSpan={4}
                        stt="5."
                        label={t('step5.part2.bladeProfileCylindricalSections')}
                    />
                    {sections.map((section) => (
                        <CalculatedDataRow
                            key={`section-di-${section.sectionIndex}`}
                            label={`- ${t('step5.part2.sectionIDiameter', {
                                index: section.sectionIndex,
                            })}`}
                            symbol={
                                <>
                                    D<sub>{section.sectionIndex}</sub>
                                </>
                            }
                            value={formatNumber(section.Di, decimalPlaces)}
                            unit="[m]"
                        />
                    ))}
                </>
            )}

            {/* 6. Tốc độ vòng tại các mặt cắt đã chia */}
            {sections.length > 0 && (
                <>
                    <CalculatedDataRow
                        isHeaderRow
                        colSpan={4}
                        stt="6."
                        label={t('step5.part6.title')}
                    />
                    {sections.map((section) => (
                        <CalculatedDataRow
                            key={`section-ui-${section.sectionIndex}`}
                            label={`- ${t('step5.part6.content', {
                                index: section.sectionIndex,
                            })}`}
                            symbol={
                                <>
                                    u<sub>{section.sectionIndex}</sub>
                                </>
                            }
                            value={formatNumber(section.ui, decimalPlaces)}
                            unit="[m/s]"
                        />
                    ))}
                </>
            )}

            {/* 7. Công riêng lý thuyết và áp suất lý thuyết khi số cánh là vô cùng */}
            {step2Output && (
                <>
                    <CalculatedDataRow
                        isHeaderRow
                        colSpan={4}
                        stt="7."
                        label={t('step5.part7.title')}
                    />
                    <CalculatedDataRow
                        label={`- ${t('step5.part7.content1')}`}
                        symbol={
                            <>
                                Y<sub>lt,∞</sub>
                            </>
                        }
                        value={formatNumber(
                            step2Output.yLtInfinity,
                            decimalPlaces,
                        )}
                        unit="[J/kg]"
                    />
                    <CalculatedDataRow
                        label={`- ${t('step5.part7.content2')}`}
                        symbol={
                            <>
                                &Delta;p<sub>lt,∞</sub>
                            </>
                        }
                        value={formatNumber(
                            step2Output.pLtInfinity,
                            decimalPlaces,
                        )}
                        unit="[Pa]"
                    />
                </>
            )}

            {/* 8. Các thành phần tốc độ tuyệt đối của quạt */}
            {step3Output && (
                <>
                    <CalculatedDataRow
                        isHeaderRow
                        colSpan={4}
                        stt="8."
                        label={t('step5.part8.title')}
                    />
                    {/* Cm = C1 */}
                    <CalculatedDataRow
                        label={`- ${t('step5.part8.content1')}`}
                        symbol={
                            <>
                                C<sub>m</sub>=C<sub>1</sub>
                            </>
                        }
                        value={formatNumber(step3Output.cm, decimalPlaces)}
                        unit="[m/s]"
                    />

                    {/* C2ui */}
                    <CalculatedDataRow
                        isSubHeader
                        label={`- ${t('step5.part8.content2')}`}
                    />
                    {sections.map((section) => (
                        <CalculatedDataRow
                            key={`section-c2ui-${section.sectionIndex}`}
                            label=""
                            symbol={
                                <>
                                    C<sub>2u,{section.sectionIndex}</sub>
                                </>
                            }
                            value={formatNumber(section.c2ui, decimalPlaces)}
                            unit="[m/s]"
                        />
                    ))}

                    {/* C2i */}
                    <CalculatedDataRow
                        isSubHeader
                        label={`- ${t('step5.part8.content3')}`}
                    />
                    {sections.map((section) => (
                        <CalculatedDataRow
                            key={`section-c2i-${section.sectionIndex}`}
                            label=""
                            symbol={
                                <>
                                    C<sub>2,{section.sectionIndex}</sub>
                                </>
                            }
                            value={formatNumber(section.c2i, decimalPlaces)}
                            unit="[m/s]"
                        />
                    ))}

                    {/* Cinfi */}
                    <CalculatedDataRow
                        isSubHeader
                        label={`- ${t('step5.part8.content4')}`}
                    />
                    {sections.map((section) => (
                        <CalculatedDataRow
                            key={`section-cinfi-${section.sectionIndex}`}
                            label=""
                            symbol={
                                <>
                                    C<sub>∞,{section.sectionIndex}</sub>
                                </>
                            }
                            value={formatNumber(section.cinfi, decimalPlaces)}
                            unit="[m/s]"
                        />
                    ))}
                </>
            )}

            {/* 9. Các thành phần tốc độ tương đối của quạt */}
            {step3Output && (
                <>
                    <CalculatedDataRow
                        isHeaderRow
                        colSpan={4}
                        stt="9."
                        label={t('step5.part9.title')}
                    />

                    {/* W1i */}
                    <CalculatedDataRow
                        isSubHeader
                        label={`- ${t('step5.part9.content1')}`}
                    />
                    {sections.map((section) => (
                        <CalculatedDataRow
                            key={`section-w1i-${section.sectionIndex}`}
                            label=""
                            symbol={
                                <>
                                    W<sub>1,{section.sectionIndex}</sub>
                                </>
                            }
                            value={formatNumber(section.w1i, decimalPlaces)}
                            unit="[m/s]"
                        />
                    ))}

                    {/* W2i */}
                    <CalculatedDataRow
                        isSubHeader
                        label={`- ${t('step5.part9.content2')}`}
                    />
                    {sections.map((section) => (
                        <CalculatedDataRow
                            key={`section-w2i-${section.sectionIndex}`}
                            label=""
                            symbol={
                                <>
                                    W<sub>2,{section.sectionIndex}</sub>
                                </>
                            }
                            value={formatNumber(section.w2i, decimalPlaces)}
                            unit="[m/s]"
                        />
                    ))}

                    {/* Winfi */}
                    <CalculatedDataRow
                        isSubHeader
                        label={`- ${t('step5.part9.content3')}`}
                    />
                    {sections.map((section) => (
                        <CalculatedDataRow
                            key={`section-winfi-${section.sectionIndex}`}
                            label=""
                            symbol={
                                <>
                                    W<sub>∞,{section.sectionIndex}</sub>
                                </>
                            }
                            value={formatNumber(section.winfi, decimalPlaces)}
                            unit="[m/s]"
                        />
                    ))}
                </>
            )}
        </>
    );
};
