// src/components/steps/step4/Step4BoundaryTable.tsx

import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useFanStore } from '../../../store/useFanStore';
import { formatNumber } from '../../../utils/format';
import { calculateStep4Boundary } from '../../../math/step4';

export const Step4BoundaryTable: React.FC = () => {
    const { t } = useTranslation();
    const { step3Output, decimalPlaces } = useFanStore();

    // Tính toán dữ liệu d_ij độc lập qua hàm math
    const boundaryData = useMemo(() => {
        return calculateStep4Boundary(step3Output);
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
                <i className="bi bi-grid-3x3-gap me-2"></i>
                <span>
                    Bảng giá trị d<sub>ij</sub> cho từng mặt cắt
                </span>
            </h6>

            {boundaryData.map((secBound) => {
                const i = secBound.sectionIndex;
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
                                        {/* Cột đầu tiên là # */}
                                        <th className="fw-bold text-start">
                                            #
                                        </th>
                                        {/* Các cột sau từ 1 đến 16 */}
                                        {secBound.boundaries.map((b) => (
                                            <th key={b.jIndex}>{b.jIndex}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Hàng 2: \delta_ij */}
                                    <tr>
                                        <th className="fw-bold text-start bg-light">
                                            &delta;<sub>{i}j</sub>
                                        </th>
                                        {secBound.boundaries.map((b) => (
                                            <td key={b.jIndex}>
                                                <div className="fw-bold text-primary">
                                                    {formatNumber(
                                                        b.deltaIj,
                                                        decimalPlaces,
                                                    )}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                    {/* Hàng 3: d_ij */}
                                    <tr>
                                        <th className="fw-bold text-start bg-light">
                                            d<sub>{i}j</sub>
                                        </th>
                                        {secBound.boundaries.map((b) => (
                                            <td key={b.jIndex}>
                                                <div className="fw-bold text-success">
                                                    {formatNumber(
                                                        b.dij,
                                                        decimalPlaces,
                                                    )}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                    {/* Hàng 4: a_ij */}
                                    <tr>
                                        <th className="fw-bold text-start bg-light">
                                            a<sub>{i}j</sub>
                                        </th>
                                        {secBound.boundaries.map((b) => (
                                            <td key={b.jIndex}>
                                                <div className="fw-bold text-dark">
                                                    {formatNumber(
                                                        b.aij,
                                                        decimalPlaces,
                                                    )}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                    {/* Hàng 5: b_ij */}
                                    <tr>
                                        <th className="fw-bold text-start bg-light">
                                            b<sub>{i}j</sub>
                                        </th>
                                        {secBound.boundaries.map((b) => (
                                            <td key={b.jIndex}>
                                                <div className="fw-bold text-danger">
                                                    {formatNumber(
                                                        b.bij,
                                                        decimalPlaces,
                                                    )}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                    {/* Hàng 6: h_ij */}
                                    <tr>
                                        <th className="fw-bold text-start bg-light">
                                            h<sub>{i}j</sub>
                                        </th>
                                        {secBound.boundaries.map((b) => (
                                            <td key={b.jIndex}>
                                                <div className="fw-bold text-info">
                                                    {formatNumber(
                                                        b.hij,
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
