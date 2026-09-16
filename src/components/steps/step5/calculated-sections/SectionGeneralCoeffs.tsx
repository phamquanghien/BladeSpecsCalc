import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatNumber } from '../../../../utils/format';
import { CalculatedDataRow } from './CalculatedDataRow';
// Import hook/store trực tiếp từ store của bạn
import { useFanStore } from '../../../../store/useFanStore';

// Lấy kiểu dữ liệu trực tiếp từ Zustand Store
type FanStoreState = ReturnType<typeof useFanStore.getState>;

interface SectionGeneralCoeffsProps {
    step1Output: FanStoreState['step1Output'];
    step2Input: FanStoreState['step2Input'];
    step2Output: FanStoreState['step2Output'];
    decimalPlaces: number;
}

export const SectionGeneralCoeffs: React.FC<SectionGeneralCoeffsProps> = ({
    step1Output,
    step2Input,
    step2Output,
    decimalPlaces,
}) => {
    const { t } = useTranslation();

    return (
        <>
            {/* Mục A */}
            <CalculatedDataRow
                isSubHeader
                stt="A."
                label={t('step5.part2.fanBladeProfileDesignCalculation')}
            />

            {/* 1. Hệ số đặc trưng tối ưu */}
            {step1Output && (
                <CalculatedDataRow
                    isHeaderRow
                    stt="1."
                    label={t('step5.part2.optimalCharacteristicCoefficient')}
                    symbol="&sigma;"
                    value={formatNumber(step1Output.sigma, decimalPlaces)}
                    unit="[/]"
                />
            )}

            {/* 2. Tra các hệ số tính toán tối ưu từ giản đồ */}
            {step1Output && step2Input && (
                <>
                    <CalculatedDataRow
                        isHeaderRow
                        stt="2."
                        label={t(
                            'step5.part2.lookupOptimalCalculationCoefficientsFromDiagram',
                        )}
                    />
                    <CalculatedDataRow
                        label={`- ${t('step5.part2.optimalDiameterCoefficient')}`}
                        symbol="&delta;"
                        value={formatNumber(step2Input.delta, decimalPlaces)}
                        unit="[/]"
                    />
                    <CalculatedDataRow
                        label={`- ${t('step5.part2.bladeRootToTipDiameterRatio')}`}
                        symbol={
                            <>
                                D<sub>f</sub>/D<sub>a</sub>
                            </>
                        }
                        value={formatNumber(
                            step2Input.dfDaRatio,
                            decimalPlaces,
                        )}
                        unit="[/]"
                    />
                </>
            )}

            {/* 3. Đường kính đỉnh và đường kính chân cánh quạt */}
            {step2Output && (
                <>
                    <CalculatedDataRow
                        isHeaderRow
                        stt="3."
                        label={t('step5.part2.fanTipAndRootDiameters')}
                    />
                    <CalculatedDataRow
                        label={`- ${t('step5.part2.bladeTipDiameter')}`}
                        symbol={
                            <>
                                D<sub>a</sub>
                            </>
                        }
                        value={formatNumber(step2Output.da, decimalPlaces)}
                        unit="[m]"
                    />
                    <CalculatedDataRow
                        label={`- ${t('step5.part2.bladeRootDiameter')}`}
                        symbol={
                            <>
                                D<sub>f</sub>
                            </>
                        }
                        value={formatNumber(step2Output.df, decimalPlaces)}
                        unit="[m]"
                    />
                </>
            )}

            {/* 4. Diện tích toàn phần của bánh công tác quạt */}
            {step2Output && (
                <CalculatedDataRow
                    isHeaderRow
                    stt="4."
                    label={t('step5.part2.totalFanImpellerArea')}
                    symbol={
                        <>
                            A<sub>m</sub>
                        </>
                    }
                    value={formatNumber(step2Output.am, decimalPlaces)}
                    unit=""
                />
            )}
        </>
    );
};
