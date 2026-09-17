import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFanStore } from '../../../store/useFanStore';
import { formatNumber } from '../../../utils/format';

export const Step4AreaTable: React.FC = () => {
    const { t } = useTranslation();
    const { step4Output, decimalPlaces } = useFanStore();

    if (
        !step4Output ||
        !step4Output.sections ||
        step4Output.sections.length === 0
    ) {
        return null;
    }

    const { sections } = step4Output;

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
                                {/* Dòng 1: Cột đầu tiên là A_i, các cột sau chạy từ 1 đến số mặt cắt */}
                                <th className="fw-bold text-start bg-light">
                                    A<sub>i</sub>
                                </th>
                                {sections.map((sec) => (
                                    <th key={sec.sectionIndex}>
                                        {sec.sectionIndex}
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
                                {sections.map((sec) => (
                                    <td key={sec.sectionIndex}>
                                        <div className="fw-bold text-primary">
                                            {formatNumber(
                                                sec.Ai,
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