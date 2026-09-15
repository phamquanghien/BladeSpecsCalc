import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useFanStore } from '../../../store/useFanStore';
import { formatNumber } from '../../../utils/format';
import { calculateStep4Area } from '../../../math/step4';

export const Step4AreaTable: React.FC = () => {
    const { t } = useTranslation();
    const { step3Output, decimalPlaces } = useFanStore();

    const areaData = useMemo(() => {
        return calculateStep4Area(step3Output);
    }, [step3Output]);

    if (
        !step3Output ||
        !step3Output.sections ||
        step3Output.sections.length === 0
    ) {
        return null;
    }

    return (
        <div className="mt-4">
            <h6 className="fw-bold text-primary mb-3">
                <i className="bi bi-grid-3x3-gap-fill me-2"></i>
                <span
                    dangerouslySetInnerHTML={{
                        __html: t('step4.bladeSectionArea'),
                    }}
                />
            </h6>

            <div className="card border-0 shadow-sm p-3 mb-4 bg-white">
                <div className="table-responsive">
                    <table className="table table-bordered align-middle text-center mb-0 text-nowrap small">
                        <thead className="table-light">
                            <tr>
                                {/* Dòng 1: Cột đầu tiên là A_i, các cột sau chạy từ 1 đến số vành khăn */}
                                <th className="fw-bold text-start bg-light">
                                    A<sub>i</sub>
                                </th>
                                {areaData.map((item) => (
                                    <th key={item.sectionIndex}>
                                        {item.sectionIndex}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* Dòng 2: Cột đầu tiên là "Giá trị", các cột sau chứa giá trị Ai */}
                            <tr>
                                <td className="fw-bold text-start bg-light">
                                    <span>{t('step4.value')}</span>
                                </td>
                                {areaData.map((item) => (
                                    <td key={item.sectionIndex}>
                                        <div className="fw-bold text-primary">
                                            {formatNumber(
                                                item.Ai,
                                                decimalPlaces,
                                            )}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
