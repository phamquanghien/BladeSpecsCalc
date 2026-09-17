import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFanStore } from '../../../store/useFanStore';
import { formatNumber } from '../../../utils/format';

export const Step4DistributionTable: React.FC = () => {
    const { t } = useTranslation();
    const { step4Output, decimalPlaces } = useFanStore();

    if (
        !step4Output ||
        !step4Output.sections ||
        step4Output.sections.length === 0
    ) {
        return (
            <div className="alert alert-warning mt-3">
                Chưa có dữ liệu tính toán từ Bước 3. Vui lòng hoàn thành Bước 3
                trước.
            </div>
        );
    }

    const { sections } = step4Output;

    return (
        <div className="mt-4">
            <h6 className="fw-bold text-primary mb-3">
                <i className="bi bi-grid-3x3-gap-fill me-2"></i>
                <span
                    dangerouslySetInnerHTML={{
                        __html: t('step4.parametersXikYikXiIj'),
                    }}
                />
            </h6>

            {sections.map((sec) => {
                const i = sec.sectionIndex;

                return (
                    <div
                        key={i}
                        className="card border-0 shadow-sm p-3 mb-4 bg-white"
                    >
                        <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                            <span className="fw-bold text-dark">
                                {t('step4.bladeSection', { index: i })}
                            </span>
                        </div>

                        <div className="table-responsive">
                            <table className="table table-bordered align-middle text-center mb-0 text-nowrap small">
                                <thead className="table-light">
                                    <tr>
                                        <th className="fw-bold text-start">
                                            STT
                                        </th>
                                        {sec.points.map((pt) => (
                                            <th key={pt.sIndex}>
                                                {pt.sIndex === 16
                                                    ? `s=${pt.sIndex}`
                                                    : pt.sIndex}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Hàng 1: x_ik */}
                                    <tr>
                                        <th className="fw-bold text-start bg-light">
                                            x<sub>{i}k</sub>
                                        </th>
                                        {sec.points.map((pt) => (
                                            <td key={pt.sIndex}>
                                                <div className="fw-bold text-primary">
                                                    {formatNumber(
                                                        pt.xik,
                                                        decimalPlaces,
                                                    )}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>

                                    {/* Hàng 2: y_ik */}
                                    <tr>
                                        <th className="fw-bold text-start bg-light">
                                            y<sub>{i}k</sub>
                                        </th>
                                        {sec.points.map((pt) => (
                                            <td key={pt.sIndex}>
                                                <div className="fw-bold text-success">
                                                    {formatNumber(
                                                        pt.yik,
                                                        decimalPlaces,
                                                    )}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>

                                    {/* Hàng 3: \xi_ij */}
                                    <tr>
                                        <th className="fw-bold text-start bg-light">
                                            &xi;<sub>{i}j</sub>
                                        </th>
                                        {sec.points.map((pt) => (
                                            <td key={pt.sIndex}>
                                                <div className="fw-bold text-dark">
                                                    {formatNumber(
                                                        pt.xiIj,
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
                );
            })}
        </div>
    );
};
