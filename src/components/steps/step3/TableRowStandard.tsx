import { MathFormula } from '../../common/MathFormula';
import { formatNumber } from '../../../utils/format';

interface TableRowStandardProps<T extends { sectionIndex: number | string }> {
    labelHtml: string;
    formula: string;
    sections: T[];
    valueKey: keyof T;
    decimalPlaces: number;
    textColor?: 'text-success' | 'text-primary';
}

export const TableRowStandard = <T extends { sectionIndex: number | string }>({
    labelHtml,
    formula,
    sections,
    valueKey,
    decimalPlaces,
    textColor = 'text-primary',
}: TableRowStandardProps<T>) => (
    <tr>
        <td className="sticky-column sticky-column-1 fw-bold text-start">
            <span dangerouslySetInnerHTML={{ __html: labelHtml }} />
        </td>
        <td className="sticky-column sticky-column-2">
            <MathFormula fontSize="1rem" formula={formula} />
        </td>
        {sections.map((sec) => (
            <td key={sec.sectionIndex} className={`fw-bold ${textColor}`}>
                {formatNumber(Number(sec[valueKey]), decimalPlaces)}
            </td>
        ))}
    </tr>
);
