import React from 'react';

const X_COEFFICIENTS = [
    0, 1.25, 2.5, 5, 7.5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 95,
];

const Y_COEFFICIENTS = [
    0.33, 1.42, 1.96, 2.67, 3.15, 3.51, 4.01, 4.3, 4.5, 4.35, 3.97, 3.42, 2.75,
    1.97, 1.09, 0.6, 0.1,
];

const renderFormula = (coefficient: number, variable: 'L' | 'theta') => {
    if (coefficient === 0) {
        return '0';
    }

    return (
        <>
            {coefficient}
            {' * '}
            <i>
                {variable === 'L' ? (
                    <>
                        L<sub>i</sub>
                    </>
                ) : (
                    <>
                        ϑ<sub>i</sub>
                    </>
                )}
            </i>
            <br />
            <span className="formula-line">─────────</span>
            <br />
            100
        </>
    );
};

export const Step3DistributionTable: React.FC = () => {
    return (
        <div className="step3-table-wrapper mt-4">
            <table className="table table-hover table-bordered align-middle text-center mb-0 step3-table">
                <thead className="table-light">
                    <tr>
                        <th className="fw-bold text-start">#</th>

                        {Array.from({ length: 16 }, (_, index) => (
                            <th key={index}>{index}</th>
                        ))}

                        <th>s = 16</th>
                    </tr>
                </thead>

                <tbody>
                    {/* xᵢₖ */}
                    <tr>
                        <th className="sticky-column sticky-column-1 fw-bold text-start">
                            x<sub>ik</sub>
                            <br />
                            [%L<sub>i</sub>]
                        </th>

                        {X_COEFFICIENTS.map((coefficient, index) => (
                            <td key={index}>
                                {renderFormula(coefficient, 'L')}
                            </td>
                        ))}

                        <td>
                            <i>
                                L<sub>i</sub>
                            </i>
                        </td>
                    </tr>

                    {/* yᵢₖ */}
                    <tr>
                        <th className="text-start">
                            y<sub>ik</sub>
                            <br />
                            [%L<sub>i</sub>]
                        </th>

                        {Y_COEFFICIENTS.map((coefficient, index) => (
                            <td key={index}>
                                {renderFormula(coefficient, 'L')}
                            </td>
                        ))}
                    </tr>

                    {/* ξᵢⱼ */}
                    <tr>
                        <th className="text-start">
                            ξ<sub>ij</sub>
                            <br />
                            [%ϑ<sub>i</sub>]
                        </th>

                        {X_COEFFICIENTS.map((coefficient, index) => (
                            <td key={index}>
                                {renderFormula(coefficient, 'theta')}
                            </td>
                        ))}

                        <td>
                            <i>
                                L<sub>i</sub>
                            </i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
