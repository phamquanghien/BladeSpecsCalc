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
    // Dạng dòng tiêu đề phụ (A., B.) hoặc tiêu đề gộp
    if (isSubHeader) {
        return (
            <tr className="fw-bold">
                <td className="text-center">{stt}</td>
                <td colSpan={colSpan || 4} className="text-start">
                    {label}
                </td>
            </tr>
        );
    }

    // Dạng dòng tiêu đề xanh (Mục 1, 2, 3, 4...)
    if (isHeaderRow) {
        // Nếu có truyền colSpan (ví dụ colSpan={4} cho các mục tiêu đề không có giá trị như Mục 2, 3)
        if (colSpan) {
            return (
                <tr>
                    <td className="text-center fw-bold bg-primary text-white">
                        {stt}
                    </td>
                    <td
                        colSpan={colSpan}
                        className="fw-bold bg-primary text-white text-start"
                    >
                        {label}
                    </td>
                </tr>
            );
        }

        // Nếu không truyền colSpan (như Mục 1, 4 có đầy đủ symbol, value, unit)
        return (
            <tr>
                <td className="text-center fw-bold bg-primary text-white">
                    {stt}
                </td>
                <td className="fw-bold bg-primary text-white text-start">
                    {label}
                </td>
                <td className="text-center fw-bold bg-primary text-white">
                    {symbol}
                </td>
                <td className="text-center fw-bold bg-primary text-white">
                    {value}
                </td>
                <td className="text-center fw-bold bg-primary text-white">
                    {unit}
                </td>
            </tr>
        );
    }

    // Dòng dữ liệu thông thường
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
