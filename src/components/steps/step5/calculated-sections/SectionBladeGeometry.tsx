import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatNumber } from '../../../../utils/format';
import { CalculatedDataRow } from './CalculatedDataRow';
import { useFanStore } from '../../../../store/useFanStore';

type FanStoreState = ReturnType<typeof useFanStore.getState>;

interface SectionBladeGeometryProps {
    step1Input: FanStoreState['step1Input'];
    step3Output: FanStoreState['step3Output'];
    decimalPlaces: number;
}

export const SectionBladeGeometry: React.FC<SectionBladeGeometryProps> = ({
    step1Input,
    step3Output,
    decimalPlaces,
}) => {
    const { t } = useTranslation();
    const sections = step3Output?.sections || [];

    if (!step3Output || sections.length === 0) return null;

    return (
        <>
            {/* 12. Bước cánh, độ rộng dây cung và bán kính Re */}
            <CalculatedDataRow
                isHeaderRow
                colSpan={4}
                stt="12."
                label={t('step5.part12.title')}
            />
            {step1Input && (
                <CalculatedDataRow
                    label={`- ${t('step5.part12.content1')}`}
                    symbol="Z"
                    value={step1Input.bladeNumber}
                    unit="[Cánh]"
                />
            )}

            <CalculatedDataRow isSubHeader label={`- ${t('step5.part12.content2')}`} />
            {sections.map((section) => (
                <CalculatedDataRow
                    key={`section-ti-${section.sectionIndex}`}
                    symbol={<>t<sub>{section.sectionIndex}</sub></>}
                    value={formatNumber(section.ti, decimalPlaces)}
                    unit="[m/cánh]"
                />
            ))}

            <CalculatedDataRow isSubHeader label={`- ${t('step5.part12.content3')}`} />
            {sections.map((section) => (
                <CalculatedDataRow
                    key={`section-lti-${section.sectionIndex}`}
                    symbol={<>l/t<sub>{section.sectionIndex}</sub></>}
                    value={`${formatNumber(section.lOverTi04, decimalPlaces)}...${formatNumber(section.lOverTi05, decimalPlaces)}`}
                    unit="[/]"
                />
            ))}

            <CalculatedDataRow isSubHeader label={`- ${t('step5.part12.content4')}`} />
            {sections.map((section) => (
                <CalculatedDataRow
                    key={`section-li0405-${section.sectionIndex}`}
                    symbol={<>l<sub>{section.sectionIndex}</sub></>}
                    value={`${formatNumber(section.li04, decimalPlaces)}...${formatNumber(section.li05, decimalPlaces)}`}
                    unit="[m]"
                />
            ))}

            <CalculatedDataRow isSubHeader label={`- ${t('step5.part12.content5')}`} />
            {sections.map((section) => (
                <CalculatedDataRow
                    key={`section-selectedLi-${section.sectionIndex}`}
                    symbol={<>l<sub>{section.sectionIndex}</sub></>}
                    value={formatNumber(section.selectedLi, decimalPlaces)}
                    unit="[m]"
                />
            ))}

            <CalculatedDataRow isSubHeader label={`- ${t('step5.part12.content6')}`} />
            {sections.map((section) => (
                <CalculatedDataRow
                    key={`section-rei-${section.sectionIndex}`}
                    symbol={<>R<sub>e,{section.sectionIndex}</sub></>}
                    value={formatNumber(section.rei, decimalPlaces)}
                    unit="[m]"
                />
            ))}

            {/* 13. Hệ số Ca tại các tiết diện */}
            <CalculatedDataRow
                isHeaderRow
                colSpan={4}
                stt="13."
                label={t('step5.part13.title')}
            />
            <CalculatedDataRow isSubHeader label={`- ${t('step5.part13.content1')}`} />
            {sections.map((section) => (
                <CalculatedDataRow
                    key={`section-calOverTi-${section.sectionIndex}`}
                    symbol={<>(C<sub>a</sub>l/t)<sub>{section.sectionIndex}</sub></>}
                    value={formatNumber(section.calOverTi, decimalPlaces)}
                    unit="[m]"
                />
            ))}

            <CalculatedDataRow isSubHeader label={`- ${t('step5.part13.content2')}`} />
            {sections.map((section) => (
                <CalculatedDataRow
                    key={`section-cai-${section.sectionIndex}`}
                    symbol={<>C<sub>a,{section.sectionIndex}</sub></>}
                    value={formatNumber(section.cai, decimalPlaces)}
                    unit="[/]"
                />
            ))}

            <CalculatedDataRow isSubHeader label={`- ${t('step5.part13.content3')}`} />
            {sections.map((section) => (
                <CalculatedDataRow
                    key={`section-thetaI-${section.sectionIndex}`}
                    symbol={<>&theta;<sub>{section.sectionIndex}</sub></>}
                    value={formatNumber(section.thetaI, decimalPlaces)}
                    unit="[deg]"
                />
            ))}

            {/* 14. Góc công tác & góc xoắn */}
            <CalculatedDataRow
                isHeaderRow
                colSpan={4}
                stt="14."
                label={t('step5.part14.title')}
            />
            <CalculatedDataRow isSubHeader label={`- ${t('step5.part14.content1')}`} />
            {sections.map((section) => (
                <CalculatedDataRow
                    key={`section-gammaMi-${section.sectionIndex}`}
                    symbol={<>&gamma;<sub>m,{section.sectionIndex}</sub></>}
                    value={formatNumber(section.gammaMi, decimalPlaces)}
                    unit="[m]"
                />
            ))}

            <CalculatedDataRow isSubHeader label={`- ${t('step5.part14.content2')}`} />
            {sections.map((section) => (
                <CalculatedDataRow
                    key={`section-epsilonI-${section.sectionIndex}`}
                    symbol={<>&epsilon;<sub>{section.sectionIndex}</sub></>}
                    value={formatNumber(section.epsilonI, decimalPlaces)}
                    unit="[deg]"
                />
            ))}

            <CalculatedDataRow isSubHeader label={`- ${t('step5.part14.content3')}`} />
            {sections.map((section) => (
                <CalculatedDataRow
                    key={`section-varthetaI-${section.sectionIndex}`}
                    symbol={<>ϑ<sub>{section.sectionIndex}</sub></>}
                    value={formatNumber(section.varthetaI, decimalPlaces)}
                    unit="[deg]"
                />
            ))}

            {/* 15. Bán kính cong trắc diện */}
            <CalculatedDataRow
                isHeaderRow
                colSpan={4}
                stt="15."
                label={t('step5.part15.title')}
            />
            {sections.map((section) => (
                <CalculatedDataRow
                    key={`section-Ri-${section.sectionIndex}`}
                    symbol={<>R<sub>{section.sectionIndex}</sub></>}
                    value={formatNumber(section.Ri, decimalPlaces)}
                    unit="[m]"
                />
            ))}

            {/* 16. Góc xác lập biên dạng cánh */}
            <CalculatedDataRow
                isHeaderRow
                colSpan={4}
                stt="16."
                label={t('step5.part16.title')}
            />
            <CalculatedDataRow isSubHeader label={`- ${t('step5.part16.content1')}`} />
            {sections.map((section) => (
                <CalculatedDataRow
                    key={`section-deltaGamma1I-${section.sectionIndex}`}
                    symbol={<>&Delta;&gamma;<sub>1,{section.sectionIndex}</sub></>}
                    value={formatNumber(section.deltaGamma1I, decimalPlaces)}
                    unit="[deg]"
                />
            ))}

            <CalculatedDataRow isSubHeader label={`- ${t('step5.part16.content2')}`} />
            {sections.map((section) => (
                <CalculatedDataRow
                    key={`section-deltaGammaI-${section.sectionIndex}`}
                    symbol={<>&Delta;&gamma;<sub>{section.sectionIndex}</sub></>}
                    value={formatNumber(section.deltaGammaI, decimalPlaces)}
                    unit="[deg]"
                />
            ))}

            <CalculatedDataRow isSubHeader label={`- ${t('step5.part16.content3')}`} />
            {sections.map((section) => (
                <CalculatedDataRow
                    key={`section-gammaI-${section.sectionIndex}`}
                    symbol={<>&gamma;<sub>{section.sectionIndex}</sub></>}
                    value={formatNumber(section.gammaI, decimalPlaces)}
                    unit="[deg]"
                />
            ))}
        </>
    );
};