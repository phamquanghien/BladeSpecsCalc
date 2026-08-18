import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFanStore } from '../../../store/useFanStore';
import { MathFormula } from '../../common/MathFormula';
import { formatNumber } from '../../../utils/format';
import { TableRowStandard } from './TableRowStandard';
import './Step3Table.css';
import { Step3Image } from './Step3Image';

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
    const colSpanTotal = sections.length + 2;

    const renderSectionHeader = (translationKey: string) => (
        <tr>
            <td
                colSpan={colSpanTotal}
                className="sticky-column sticky-column-1"
            >
                <h6
                    className="text-start mb-0 fw-bold text-primary"
                    dangerouslySetInnerHTML={{ __html: t(translationKey) }}
                />
            </td>
        </tr>
    );

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
                        {/* Hàng D_i */}
                        <TableRowStandard
                            labelHtml={t('step3.diFormula')}
                            formula={`D_i = \\sqrt{D_{i-1}^2 - \\frac{4A_m}{m\\pi}}`}
                            sections={sections}
                            valueKey="di"
                            decimalPlaces={decimalPlaces}
                            textColor="text-success"
                        />

                        {renderSectionHeader(
                            'step3.absoluteVelocityComponents',
                        )}

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
                        <TableRowStandard
                            labelHtml={t('step3.uiFormula')}
                            formula={`u_i = n \\cdot \\pi \\cdot D_i`}
                            sections={sections}
                            valueKey="ui"
                            decimalPlaces={decimalPlaces}
                            textColor="text-success"
                        />
                        {/* Hàng 4: Thành phần tốc độ hướng quay vòng c2ui */}
                        <TableRowStandard
                            labelHtml={t('step3.c2uiFormula')}
                            formula={`c_{2u,i} = \\frac{Y_{lt,\\infty}}{u_i}`}
                            sections={sections}
                            valueKey="c2ui"
                            decimalPlaces={decimalPlaces}
                            textColor="text-primary"
                        />
                        {/* Hàng 5: Thành phần tốc độ c2i */}
                        <TableRowStandard
                            labelHtml={t('step3.c2iFormula')}
                            formula={`c_{2,i} = \\sqrt{c_m^2 + c_{2u,i}^2}`}
                            sections={sections}
                            valueKey="c2i"
                            decimalPlaces={decimalPlaces}
                            textColor="text-success"
                        />
                        {/* Hàng 6: Thành phần tốc độ c_infinity,i */}
                        <TableRowStandard
                            labelHtml={t('step3.cinfiFormula')}
                            formula={`c_{\\infty,i} = \\sqrt{c_m^2 + \\left(\\frac{c_{2u,i}}{2}\\right)^2}`}
                            sections={sections}
                            valueKey="cinfi"
                            decimalPlaces={decimalPlaces}
                            textColor="text-primary"
                        />
                        {renderSectionHeader(
                            'step3.relativeVelocityComponents',
                        )}
                        {/* Hàng 7: Thành phần tốc độ w1i */}
                        <TableRowStandard
                            labelHtml={t('step3.w1iFormula')}
                            formula={`w_{1,i} = \\sqrt{c_m^2 + u_i^2}`}
                            sections={sections}
                            valueKey="w1i"
                            decimalPlaces={decimalPlaces}
                            textColor="text-success"
                        />
                        {/* Hàng 8: Thành phần tốc độ w2i */}
                        <TableRowStandard
                            labelHtml={t('step3.w2iFormula')}
                            formula={`w_{2,i} = \\sqrt{c_m^2 + (u_i - c_{2u,i})^2}`}
                            sections={sections}
                            valueKey="w2i"
                            decimalPlaces={decimalPlaces}
                            textColor="text-primary"
                        />
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
                        <TableRowStandard
                            labelHtml={t('step3.wInfinityFormula')}
                            formula={`w_{\\infty,i} = \\sqrt{c_m^2 + \\left(u_i - \\frac{c_{2u,i}}{2}\\right)^2}`}
                            sections={sections}
                            valueKey="winfi"
                            decimalPlaces={decimalPlaces}
                            textColor="text-primary"
                        />
                        {renderSectionHeader('step3.relativeVelocityAngles')}
                        {/* Hàng 11: Góc nghiêng beta1,i */}
                        <TableRowStandard
                            labelHtml={t('step3.beta1i')}
                            formula={`\\beta_{1,i} = \\arctan\\left(\\frac{c_m}{u_i}\\right)`}
                            sections={sections}
                            valueKey="beta1i"
                            decimalPlaces={decimalPlaces}
                            textColor="text-success"
                        />
                        {/* Hàng 12: Góc nghiêng beta2,i */}
                        <TableRowStandard
                            labelHtml={t('step3.beta2i')}
                            formula={`\\beta_{2,i} = \\arctan\\left(\\frac{c_m}{u_i - c_{2u,i}}\\right)`}
                            sections={sections}
                            valueKey="beta2i"
                            decimalPlaces={decimalPlaces}
                            textColor="text-primary"
                        />
                        {/* Hàng 13: Góc nghiêng betaInfinity,i */}
                        <TableRowStandard
                            labelHtml={t('step3.betaInfinityI')}
                            formula={`\\beta_{\\infty,i} = \\arctan\\left(\\frac{c_m}{u_i - \\frac{c_{2u,i}}{2}}\\right)`}
                            sections={sections}
                            valueKey="betainfi"
                            decimalPlaces={decimalPlaces}
                            textColor="text-success"
                        />
                        {renderSectionHeader('step3.absoluteVelocityAngles')}
                        {/* Hàng 14: Góc nghiêng alpha1,i */}
                        <tr>
                            <td className="sticky-column sticky-column-1 fw-bold text-start">
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: t('step3.alpha1i'),
                                    }}
                                />
                            </td>
                            <td className="sticky-column sticky-column-2">
                                <MathFormula
                                    fontSize="1rem"
                                    formula={`\\alpha_{1,i}`}
                                />
                            </td>
                            <td
                                colSpan={sections.length}
                                className="sticky-column sticky-column-1"
                            ></td>
                        </tr>
                        {/* Hàng 15: Góc nghiêng alpha2,i */}
                        <TableRowStandard
                            labelHtml={t('step3.alpha2i')}
                            formula={`\\alpha_{2,i} = \\arctan\\left(\\frac{c_m}{c_{2u,i}}\\right)`}
                            sections={sections}
                            valueKey="alpha2i"
                            decimalPlaces={decimalPlaces}
                            textColor="text-primary"
                        />
                        {/* Hàng 16: Góc nghiêng alphaInfinity,i */}
                        <TableRowStandard
                            labelHtml={t('step3.alphaInfinityI')}
                            formula={`\\alpha_{\\infty,i} = \\arctan\\left(\\frac{c_m}{c_{2u,i}/2}\\right)`}
                            sections={sections}
                            valueKey="alphainfi"
                            decimalPlaces={decimalPlaces}
                            textColor="text-success"
                        />
                        <tr>
                            <td
                                colSpan={2}
                                className="sticky-column sticky-column-1"
                            >
                                <h6
                                    className="text-start mb-0 fw-bold text-primary"
                                    dangerouslySetInnerHTML={{
                                        __html: t('step3.bladeNumberSelection'),
                                    }}
                                />
                            </td>
                            <td
                                colSpan={sections.length}
                                className="sticky-column sticky-column-1"
                            >
                                <h6
                                    className="text-start mb-0 fw-bold text-primary"
                                    dangerouslySetInnerHTML={{
                                        __html: t(
                                            'step3.bladeNumberSelectionDescription',
                                        ),
                                    }}
                                />
                            </td>
                        </tr>
                        {/* Hàng 17: Góc nghiêng alphaInfinity,i */}
                        <TableRowStandard
                            labelHtml={t('step3.bladePitch')}
                            formula={`t_i = \\frac{\\pi D_i}{z}`}
                            sections={sections}
                            valueKey="ti"
                            decimalPlaces={decimalPlaces}
                            textColor="text-success"
                        />
                        {/* Hàng 18: (l/t)i */}
                        <tr>
                            <td
                                className="sticky-column sticky-column-1 fw-bold text-start"
                                rowSpan={2}
                            >
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: t(
                                            'step3.bladeLengthToPitchRatio',
                                        ),
                                    }}
                                />
                            </td>
                            <td
                                className="sticky-column sticky-column-2"
                                rowSpan={2}
                            >
                                <MathFormula
                                    fontSize="1rem"
                                    formula={`\\left(\\frac{l}{t}\\right)_i = \\frac{\\Delta w_{u,i}}{(0,4..0,5) w_{\\infty,i}}`}
                                />
                            </td>
                            {sections.map((sec) => (
                                <td
                                    key={sec.sectionIndex}
                                    className="fw-bold text-primary"
                                >
                                    {formatNumber(sec.lOverTi04, decimalPlaces)}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            {sections.map((sec) => (
                                <td
                                    key={sec.sectionIndex}
                                    className="fw-bold text-success"
                                >
                                    {formatNumber(sec.lOverTi05, decimalPlaces)}
                                </td>
                            ))}
                        </tr>
                        {/* Hàng 19: li */}
                        <tr>
                            <td
                                className="sticky-column sticky-column-1 fw-bold text-start"
                                rowSpan={2}
                            >
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: t(
                                            'step3.bladeSectionLengthCalculated',
                                        ),
                                    }}
                                />
                            </td>
                            <td
                                className="sticky-column sticky-column-2"
                                rowSpan={2}
                            >
                                <MathFormula
                                    fontSize="1rem"
                                    formula={`l_i = \\left(\\frac{l}{t}\\right)_{i,0.4} \\cdot t_i`}
                                />
                            </td>
                            {sections.map((sec) => (
                                <td
                                    key={sec.sectionIndex}
                                    className="fw-bold text-primary"
                                >
                                    {formatNumber(sec.li04, decimalPlaces)}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            {sections.map((sec) => (
                                <td
                                    key={sec.sectionIndex}
                                    className="fw-bold text-success"
                                >
                                    {formatNumber(sec.li05, decimalPlaces)}
                                </td>
                            ))}
                        </tr>
                        {/* Hàng 20: li */}
                        <TableRowStandard
                            labelHtml={t('step3.bladeSectionLengthSelected')}
                            formula={`l_i = \\left( \\frac{\\Delta w_{u,i}}{\\left(0{,}4 + \\frac{0{,}1}{m} \\cdot (i-1)\\right) \\cdot w_{\\infty,i}} \\right) \\cdot t_i`}
                            sections={sections}
                            valueKey="selectedLi"
                            decimalPlaces={decimalPlaces}
                            textColor="text-primary"
                        />
                        <TableRowStandard
                            labelHtml={t('step3.reynoldsNumber')} // Hoặc: "Hệ số Reynolds Re<sub>i</sub>"
                            formula={`Re_i = \\frac{w_{\\infty,i} \\cdot l_i}{\\nu}`}
                            sections={sections}
                            valueKey="rei" // Thay 'rei' bằng tên key tương ứng trong object section của bạn (vd: 're', 'reynolds')
                            decimalPlaces={0} // Số Re thường lớn, nên để decimalPlaces = 0 hoặc tùy chọn
                            textColor="text-success"
                        />
                        {renderSectionHeader(
                            'step3.caCoefficientDetermination',
                        )}
                        <TableRowStandard
                            labelHtml={t('step3.caLOverTProduct')}
                            formula={`\\left(c_a \\frac{l}{t}\\right)_i = \\frac{2Y_{lt,\\infty}}{u_i w_{\\infty,i}}`}
                            sections={sections}
                            valueKey="calOverTi"
                            decimalPlaces={decimalPlaces}
                            textColor="text-primary"
                        />
                        <TableRowStandard
                            labelHtml={t('step3.caiCoefficient')}
                            formula={`c_{a,i} = \\left(c_a \\frac{l}{t}\\right)_i \\cdot \\frac{t_i}{l_i}`}
                            sections={sections}
                            valueKey="cai"
                            decimalPlaces={decimalPlaces}
                            textColor="text-success"
                        />
                        {renderSectionHeader('step3.bladeProfileSettingAngles')}
                        {/* <tr>
                            <td colSpan={sections.length + 2}>
                                <Step3Image
                                    src="/images/step3/Hinh1112C.png"
                                    alt="Distribution of Blade Sections"
                                    fallbackText="Distribution of Blade Sections"
                                    maxHeight="30em"
                                />
                            </td>
                        </tr> */}
                        <TableRowStandard
                            labelHtml={t('step3.preliminaryBladeSettingAngle')}
                            formula={`\\gamma_{m,i} = \\frac{\\beta_{1,i} + \\beta_{2,i}}{2}`}
                            sections={sections}
                            valueKey="gammaMi"
                            decimalPlaces={decimalPlaces}
                            textColor="text-primary"
                        />
                        {/* 🟢 Hàng hiển thị hình ảnh Giản đồ ε = f(t/l, γ_m) */}
                        <tr>
                            <td
                                colSpan={sections.length + 2}
                                className="text-center py-4 bg-white"
                            >
                                <Step3Image
                                    src="/images/step3/Hinh1113B.png"
                                    alt="Distribution of Blade Sections"
                                    fallbackText="Distribution of Blade Sections"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
