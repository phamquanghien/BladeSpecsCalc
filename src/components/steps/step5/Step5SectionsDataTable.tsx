import React from 'react';
import { useFanStore } from '../../../store/useFanStore';
import { generateStep5Report } from '../../../math/step5';
import { formatNumber } from '../../../utils/format';

export const Step5SectionsDataTable: React.FC = () => {
    const { step1Input, step2Output, step3Output, step4Input, decimalPlaces } =
        useFanStore();

    const report = React.useMemo(() => {
        return generateStep5Report(
            step1Input,
            step2Output,
            step3Output,
            step4Input,
        );
    }, [step1Input, step2Output, step3Output, step4Input]);

    if (!report || report.sectionsSummary.length === 0) return null;

    return (
        <div className="mt-4">
            <h6 className="fw-bold text-primary mb-3">
                <i className="bi bi-table me-2"></i>
                <span>II/ Kết quả tính toán tổng hợp các mặt cắt cánh</span>
            </h6>

            <div className="table-responsive shadow-sm rounded">
                <table className="table table-bordered align-middle text-center mb-0 text-nowrap bg-white small">
                    <thead className="table-light fw-bold">
                        <tr>
                            <th>Mặt cắt (i)</th>
                            <th>
                                D<sub>i</sub> [m]
                            </th>
                            <th>
                                u<sub>i</sub> [m/s]
                            </th>
                            <th>
                                w<sub>1i</sub> [m/s]
                            </th>
                            <th>
                                w<sub>2i</sub> [m/s]
                            </th>
                            <th>
                                &beta;<sub>1i</sub> [°]
                            </th>
                            <th>
                                &beta;<sub>2i</sub> [°]
                            </th>
                            <th>
                                &gamma;<sub>i</sub> [°]
                            </th>
                            <th>
                                L<sub>i</sub> [mm]
                            </th>
                            <th>
                                A<sub>i</sub> [mm²]
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {report.sectionsSummary.map((sec) => (
                            <tr key={sec.sectionIndex}>
                                <td className="fw-bold bg-light">
                                    {sec.sectionIndex}
                                </td>
                                <td>{formatNumber(sec.Di, decimalPlaces)}</td>
                                <td>{formatNumber(sec.ui, decimalPlaces)}</td>
                                <td>{formatNumber(sec.w1i, decimalPlaces)}</td>
                                <td>{formatNumber(sec.w2i, decimalPlaces)}</td>
                                <td>
                                    {formatNumber(sec.beta1i, decimalPlaces)}
                                </td>
                                <td>
                                    {formatNumber(sec.beta2i, decimalPlaces)}
                                </td>
                                <td>
                                    {formatNumber(sec.gammaI, decimalPlaces)}
                                </td>
                                <td className="fw-bold text-primary">
                                    {formatNumber(sec.Li, decimalPlaces)}
                                </td>
                                <td className="fw-bold text-success">
                                    {formatNumber(sec.Ai, decimalPlaces)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
