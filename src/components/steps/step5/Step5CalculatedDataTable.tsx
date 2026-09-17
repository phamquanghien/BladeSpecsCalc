import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFanStore } from '../../../store/useFanStore';
import { SectionGeneralCoeffs } from './calculated-sections/SectionGeneralCoeffs';
import { SectionVelocitiesAndPressure } from './calculated-sections/SectionVelocitiesAndPressure';
import { SectionAngles } from './calculated-sections/SectionAngles';
import { SectionBladeGeometry } from './calculated-sections/SectionBladeGeometry';
import { SectionBladeThickness } from './calculated-sections/SectionBladeThickness';
import { SectionStrengthCheck } from './calculated-sections/SectionStrengthCheck';

export const Step5CalculatedDataTable: React.FC = () => {
    const { t } = useTranslation();

    const { step1Input, step1Output, step2Input, step2Output, step3Output } =
        useFanStore();

    if (
        !step1Input &&
        !step1Output &&
        !step2Output &&
        !step2Input &&
        !step3Output?.sections?.length
    ) {
        return null;
    }

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
                    <SectionGeneralCoeffs />

                    {/* Mục 5 -> Mục 9 */}
                    <SectionVelocitiesAndPressure />

                    {/* Mục 10 -> Mục 11 */}
                    <SectionAngles />

                    {/* Mục 12 -> Mục 16 */}
                    <SectionBladeGeometry />

                    {/* Mục 17: Phân bố chiều dầy */}
                    <SectionBladeThickness />

                    <SectionStrengthCheck />
                </tbody>
            </table>
        </div>
    );
};
