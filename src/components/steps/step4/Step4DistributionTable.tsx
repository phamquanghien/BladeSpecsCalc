import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFanStore } from '../../../store/useFanStore';
import { X_COEFFICIENTS, Y_COEFFICIENTS } from '../../../config/step4Constants';
import { formatNumber } from '../../../utils/format';

export const Step4DistributionTable: React.FC = () => {
    const { t } = useTranslation();
    const { step3Output, decimalPlaces } = useFanStore();

    if (
        !step3Output ||
        !step3Output.sections ||
        step3Output.sections.length === 0
    ) {
        return (
            <div className="alert alert-warning mt-3">
                Chưa có dữ liệu tính toán từ Bước 3. Vui lòng hoàn thành Bước 3
                trước.
            </div>
        );
    }

    const { sections } = step3Output;

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

            {/* Lặp qua từng mặt cắt i (từ 1 đến số vành khăn m) */}
            {sections.map((sec, idx) => {
                const Li = sec.Li; // Giá trị Li tính từ Step 3
                const varthetaI = sec.varthetaI; // Giá trị vartheta_i tính từ Step 3
                const i = sec.sectionIndex || idx + 1;

                return (
                    <div
                        key={idx}
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
                                        {X_COEFFICIENTS.map((_, k) => (
                                            <th key={k}>
                                                {k === 16 ? `s=${k}` : k}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Hàng 1: x_ik [% Li] */}
                                    <tr>
                                        <th className="fw-bold text-start bg-light">
                                            x<sub>{i}k</sub>
                                        </th>
                                        {X_COEFFICIENTS.map((coeff, k) => {
                                            const val = (coeff * Li) / 100;
                                            return (
                                                <td key={k}>
                                                    <div className="fw-bold text-primary">
                                                        {formatNumber(
                                                            val,
                                                            decimalPlaces,
                                                        )}
                                                    </div>
                                                </td>
                                            );
                                        })}
                                    </tr>

                                    {/* Hàng 2: y_ik [% Li] */}
                                    <tr>
                                        <th className="fw-bold text-start bg-light">
                                            y<sub>{i}k</sub>
                                        </th>
                                        {Y_COEFFICIENTS.map((coeff, k) => {
                                            const val = (coeff * Li) / 100;
                                            return (
                                                <td key={k}>
                                                    <div className="fw-bold text-success">
                                                        {formatNumber(
                                                            val,
                                                            decimalPlaces,
                                                        )}
                                                    </div>
                                                </td>
                                            );
                                        })}
                                    </tr>

                                    {/* Hàng 3: \xi_ij [% \vartheta_i] */}
                                    <tr>
                                        <th className="fw-bold text-start bg-light">
                                            &xi;<sub>{i}j</sub>
                                        </th>
                                        {X_COEFFICIENTS.map((coeff, k) => {
                                            // Tại điểm s=16 (k=16) trong ảnh ghi là L_i
                                            const val =
                                                k === 16
                                                    ? Li
                                                    : (coeff * varthetaI) / 100;
                                            return (
                                                <td key={k}>
                                                    <div className="fw-bold text-dark">
                                                        {formatNumber(
                                                            val,
                                                            decimalPlaces,
                                                        )}
                                                    </div>
                                                </td>
                                            );
                                        })}
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
