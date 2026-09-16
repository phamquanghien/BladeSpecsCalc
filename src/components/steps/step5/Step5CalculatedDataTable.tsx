import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFanStore } from '../../../store/useFanStore';
import { SectionGeneralCoeffs } from './calculated-sections/SectionGeneralCoeffs';
import { SectionVelocitiesAndPressure } from './calculated-sections/SectionVelocitiesAndPressure';
import { SectionAngles } from './calculated-sections/SectionAngles';
import { SectionBladeGeometry } from './calculated-sections/SectionBladeGeometry';
import { SectionBladeThickness } from './calculated-sections/SectionBladeThickness';
import {
    calculateStep4,
    calculateStep4Boundary,
    defaultStep4Input,
} from '../../../math/step4';

export const Step5CalculatedDataTable: React.FC = () => {
    const { t } = useTranslation();

    const {
        step1Input,
        step1Output,
        step2Input,
        step2Output,
        step3Output,
        decimalPlaces,
    } = useFanStore();

    // 🟢 Tính toán step4Output & step4Boundary trực tiếp bằng useMemo
    const step4Output = React.useMemo(() => {
        return calculateStep4(defaultStep4Input, step3Output);
    }, [step3Output]);

    const step4Boundary = React.useMemo(() => {
        return calculateStep4Boundary(step3Output);
    }, [step3Output]);

    if (
        !step1Input &&
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
                    {/* Mục II: Tiêu đề chính */}
                    <tr className="fw-bold bg-light">
                        <td colSpan={5} className="text-start py-2">
                            {t('step5.part2.title')}
                        </td>
                    </tr>

                    {/* Mục 1 -> Mục 4 */}
                    <SectionGeneralCoeffs
                        step1Output={step1Output}
                        step2Input={step2Input}
                        step2Output={step2Output}
                        decimalPlaces={decimalPlaces}
                    />
                    {/* Mục 5 -> Mục 9 */}
                    <SectionVelocitiesAndPressure
                        step2Output={step2Output}
                        step3Output={step3Output}
                        decimalPlaces={decimalPlaces}
                    />
                    {/* Mục 10 -> Mục 11 */}
                    <SectionAngles
                        step3Output={step3Output}
                        decimalPlaces={decimalPlaces}
                    />
                    {/* Mục 12 -> Mục 16 */}
                    <SectionBladeGeometry
                        step1Input={step1Input}
                        step3Output={step3Output}
                        decimalPlaces={decimalPlaces}
                    />

                    <SectionBladeThickness
                        step3Output={step3Output}
                        step4Output={step4Output}
                        step4Boundary={step4Boundary}
                        decimalPlaces={decimalPlaces}
                    />
                </tbody>
            </table>
        </div>
    );
};
