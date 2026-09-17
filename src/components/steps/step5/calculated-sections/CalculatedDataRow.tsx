import React from 'react';

interface CalculatedDataRowProps {
    stt?: string | number;
    label?: React.ReactNode;
    symbol?: React.ReactNode;
    value?: React.ReactNode;
    unit?: React.ReactNode;
    isHeaderRow?: boolean;
    isSubHeader?: boolean;
    colSpan?: number;
}

export const CalculatedDataRow: React.FC<CalculatedDataRowProps> = ({
    stt = '',
    label,
    symbol = '',
    value = '',
    unit = '',
    isHeaderRow = false,
    isSubHeader = false,
    colSpan,
}) => {
    // 1. Dạng dòng tiêu đề phụ (A., B., I., II.)
    if (isSubHeader) {
        return (
            <tr className="fw-bold bg-light">
                <td className="text-center">{stt}</td>
                <td colSpan={colSpan || 4} className="text-start">
                    {label}
                </td>
            </tr>
        );
    }

    // 2. Dạng dòng tiêu đề xanh (Mục 1, 2, 3, 4...)
    if (isHeaderRow) {
        const headerClass = 'fw-bold bg-primary text-white';

        // Nếu có truyền colSpan (ví dụ colSpan={4} kết hợp 1 ô STT = 5 ô)
        if (colSpan) {
            return (
                <tr>
                    <td className={`text-center ${headerClass}`}>{stt}</td>
                    <td
                        colSpan={colSpan}
                        className={`text-start ${headerClass}`}
                    >
                        {label}
                    </td>
                </tr>
            );
        }

        // Nếu không truyền colSpan (đầy đủ 5 cột)
        return (
            <tr>
                <td className={`text-center ${headerClass}`}>{stt}</td>
                <td className={`text-start ${headerClass}`}>{label}</td>
                <td className={`text-center ${headerClass}`}>{symbol}</td>
                <td className={`text-center ${headerClass}`}>{value}</td>
                <td className={`text-center ${headerClass}`}>{unit}</td>
            </tr>
        );
    }

    // 3. Dòng dữ liệu chi tiết thông thường
    return (
        <tr>
            <td className="text-center">{stt}</td>
            <td className="text-start">{label}</td>
            <td className="text-center">{symbol}</td>
            <td className="text-center fw-bold text-primary">{value}</td>
            <td className="text-center">{unit}</td>
        </tr>
    );
};
