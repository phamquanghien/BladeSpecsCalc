import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFanStore } from '../../../store/useFanStore';
import { MathFormula } from '../../common/MathFormula';
import { formatNumber } from '../../../utils/format';
import './Step3Table.css';

export const Step3Table: React.FC = () => {
    const { t } = useTranslation();
    const { step3Output, decimalPlaces } = useFanStore();

    if (
        !step3Output ||
        !step3Output.sections ||
        step3Output.sections.length === 0
    ) {
        return null;
    }

    const { cm, sections } = step3Output;

    return (
        <div className="card border-0 shadow-sm p-4 mt-4 bg-white">
            <h6 className="fw-bold mb-3 text-primary border-bottom pb-2">
                <i className="bi bi-table me-2"></i>
                {t('step3.title')}
            </h6>

            {/* BẢNG DẠNG NGANG GIỐNG HỆT NHƯ TRONG ẢNH MẪU */}
            <div className="step3-table-wrapper">
                <table className="table table-hover table-bordered align-middle text-center mb-0 step3-table">
                    <thead className="table-light">
                        <tr>
                            <th className="sticky-column sticky-column-1 fw-bold text-start">
                                {t('step3.column1Title')}
                            </th>
                            <th className="sticky-column sticky-column-2">
                                {t('step3.column2Title')}
                            </th>
                            {/* Render tiêu đề các mặt cắt: 1=a, 2, 3... */}
                            {sections.map((sec) => (
                                <th
                                    key={sec.sectionIndex}
                                    className="fw-bold align-middle"
                                >
                                    {sec.sectionLabel}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="text-green">
                            <td className="sticky-column sticky-column-1 fw-bold text-start">
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: t('step3.diFormula'),
                                    }}
                                />
                            </td>
                            <td className="sticky-column sticky-column-2">
                                <MathFormula
                                    fontSize="1rem"
                                    formula={`D_i = \\sqrt{D_{i-1}^2 - \\frac{4A_m}{m\\pi}}`}
                                />
                            </td>
                            {/* Render giá trị D_i tương ứng từng mặt cắt */}
                            {sections.map((sec) => (
                                <td
                                    key={sec.sectionIndex}
                                    className="fw-bold text-success"
                                >
                                    {formatNumber(sec.di, decimalPlaces)}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td
                                colSpan={sections.length + 2}
                                className="sticky-column sticky-column-1"
                            >
                                <h6
                                    className="text-start mb-0 fw-bold text-primary"
                                    dangerouslySetInnerHTML={{
                                        __html: t(
                                            'step3.absoluteVelocityComponents',
                                        ),
                                    }}
                                />
                            </td>
                        </tr>
                        {/* Hàng 2: Thành phần tốc độ cm (Dùng colSpan gộp chung 1 ô) */}
                        <tr>
                            <td className="sticky-column sticky-column-1 fw-bold text-start">
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: t('step3.cmFormula'),
                                    }}
                                />
                            </td>
                            <td className="sticky-column sticky-column-2">
                                <MathFormula
                                    fontSize="1rem"
                                    formula={`c_m = \\frac{Q}{A_m}`}
                                />
                            </td>
                            {/* 🟢 Gộp tất cả các cột mặt cắt làm một */}
                            <td
                                colSpan={sections.length}
                                className="fw-bold text-primary text-start"
                            >
                                {formatNumber(cm, decimalPlaces)}
                            </td>
                        </tr>
                        {/* Hàng 3: Tốc độ vòng ui */}
                        <tr>
                            <td className="sticky-column sticky-column-1 fw-bold text-start">
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: t('step3.uiFormula'),
                                    }}
                                />
                            </td>
                            <td className="sticky-column sticky-column-2">
                                <MathFormula
                                    fontSize="1rem"
                                    formula={`u_i = n \\cdot \\pi \\cdot D_i`}
                                />
                            </td>
                            {sections.map((sec) => (
                                <td
                                    key={sec.sectionIndex}
                                    className="fw-bold text-success"
                                >
                                    {formatNumber(sec.ui, decimalPlaces)}
                                </td>
                            ))}
                        </tr>
                        {/* Hàng 4: Thành phần tốc độ hướng quay vòng c2ui */}
                        <tr>
                            <td className="sticky-column sticky-column-1 fw-bold text-start">
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: t('step3.c2uiFormula'),
                                    }}
                                />
                            </td>
                            <td className="sticky-column sticky-column-2">
                                <MathFormula
                                    fontSize="1rem"
                                    formula={`c_{2u,i} = \\frac{Y_{lt,\\infty}}{u_i}`}
                                />
                            </td>
                            {sections.map((sec) => (
                                <td
                                    key={sec.sectionIndex}
                                    className="fw-bold text-primary"
                                >
                                    {formatNumber(sec.c2ui, decimalPlaces)}
                                </td>
                            ))}
                        </tr>
                        {/* Hàng 5: Thành phần tốc độ c2i */}
                        <tr>
                            <td className="sticky-column sticky-column-1 fw-bold text-start">
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: t('step3.c2iFormula'),
                                    }}
                                />
                            </td>
                            <td className="sticky-column sticky-column-2">
                                <MathFormula
                                    fontSize="1rem"
                                    formula={`c_{2,i} = \\sqrt{c_m^2 + c_{2u,i}^2}`}
                                />
                            </td>
                            {sections.map((sec) => (
                                <td
                                    key={sec.sectionIndex}
                                    className="fw-bold text-success"
                                >
                                    {formatNumber(sec.c2i, decimalPlaces)}
                                </td>
                            ))}
                        </tr>
                        {/* Hàng 6: Thành phần tốc độ c_infinity,i */}
                        <tr>
                            <td className="sticky-column sticky-column-1 fw-bold text-start">
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: t('step3.cinfiFormula'),
                                    }}
                                />
                            </td>
                            <td className="sticky-column sticky-column-2">
                                <MathFormula
                                    fontSize="1rem"
                                    formula={`c_{\\infty,i} = \\sqrt{c_m^2 + \\left(\\frac{c_{2u,i}}{2}\\right)^2}`}
                                />
                            </td>
                            {sections.map((sec) => (
                                <td
                                    key={sec.sectionIndex}
                                    className="fw-bold text-primary"
                                >
                                    {formatNumber(sec.cinfi, decimalPlaces)}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td
                                colSpan={sections.length + 2}
                                className="sticky-column sticky-column-1"
                            >
                                <h6
                                    className="text-start mb-0 fw-bold text-primary"
                                    dangerouslySetInnerHTML={{
                                        __html: t(
                                            'step3.relativeVelocityComponents',
                                        ),
                                    }}
                                />
                            </td>
                        </tr>
                        {/* Hàng 7: Thành phần tốc độ w1i */}
                        <tr>
                            <td className="sticky-column sticky-column-1 fw-bold text-start">
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: t('step3.w1iFormula'),
                                    }}
                                />
                            </td>
                            <td className="sticky-column sticky-column-2">
                                <MathFormula
                                    fontSize="1rem"
                                    formula={`w_{1,i} = \\sqrt{c_m^2 + u_i^2}`}
                                />
                            </td>
                            {sections.map((sec) => (
                                <td
                                    key={sec.sectionIndex}
                                    className="fw-bold text-success"
                                >
                                    {formatNumber(sec.w1i, decimalPlaces)}
                                </td>
                            ))}
                        </tr>
                        {/* Hàng 8: Thành phần tốc độ w2i */}
                        <tr>
                            <td className="sticky-column sticky-column-1 fw-bold text-start">
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: t('step3.w2iFormula'),
                                    }}
                                />
                            </td>
                            <td className="sticky-column sticky-column-2">
                                <MathFormula
                                    fontSize="1rem"
                                    formula={`w_{2,i} = \\sqrt{c_m^2 + (u_i - c_{2u,i})^2}`}
                                />
                            </td>
                            {sections.map((sec) => (
                                <td
                                    key={sec.sectionIndex}
                                    className="fw-bold text-primary"
                                >
                                    {formatNumber(sec.w2i, decimalPlaces)}
                                </td>
                            ))}
                        </tr>
                        {/* Hàng 9: Kiểm tra tỷ số tốc độ (w2i / w1i) */}
                        <tr>
                            <td className="sticky-column sticky-column-1 fw-bold text-start">
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: t('step3.wRatioFormula'),
                                    }}
                                />
                            </td>
                            <td className="sticky-column sticky-column-2">
                                <MathFormula
                                    fontSize="1rem"
                                    formula={`\\left(\\frac{w_{2,i}}{w_{1,i}}\\right) = f(i) > 0{,}75`}
                                />
                            </td>
                            {sections.map((sec) => (
                                <td
                                    key={sec.sectionIndex}
                                    className="align-middle"
                                >
                                    <span
                                        className={`fw-bold me-1 ${sec.isRatioValid ? 'text-success' : 'text-danger'}`}
                                    >
                                        {formatNumber(
                                            sec.wRatio,
                                            decimalPlaces,
                                        )}
                                    </span>
                                    <span
                                        className={`badge ${sec.isRatioValid ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}
                                    >
                                        {sec.isRatioValid ? '✓' : '✗'}
                                    </span>
                                </td>
                            ))}
                        </tr>
                        {/* Hàng 10: Thành phần tốc độ w_infinity,i */}
                        <tr>
                            <td className="sticky-column sticky-column-1 fw-bold text-start">
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: t('step3.wInfinityFormula'),
                                    }}
                                />
                            </td>
                            <td className="sticky-column sticky-column-2">
                                <MathFormula
                                    fontSize="1rem"
                                    formula={`w_{\\infty,i} = \\sqrt{c_m^2 + \\left(u_i - \\frac{c_{2u,i}}{2}\\right)^2}`}
                                />
                            </td>
                            {sections.map((sec) => (
                                <td
                                    key={sec.sectionIndex}
                                    className="fw-bold text-primary"
                                >
                                    {formatNumber(sec.winfi, decimalPlaces)}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
