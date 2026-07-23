// src/components/common/MathFormula.tsx
import React, { useEffect, useRef } from 'react';
import katex from 'katex';

interface MathFormulaProps {
    formula: string;
    displayMode?: boolean; // true: hiển thị dòng riêng (block), false: nằm chung trên dòng chữ (inline)
    fontSize?: string; // Chỉnh kích thước chữ (mặc định '1.25rem')
    align?: 'left' | 'center' | 'right'; // Căn lề cho công thức
}

export const MathFormula: React.FC<MathFormulaProps> = ({
    formula,
    displayMode = true,
    fontSize = '1.25rem',
    align = 'center',
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            katex.render(formula, containerRef.current, {
                displayMode,
                throwOnError: false, // Tránh crash ứng dụng nếu lỡ viết sai cú pháp LaTeX
            });
        }
    }, [formula, displayMode]);

    // Xác định class căn lề
    const alignClass =
        align === 'left'
            ? 'text-start'
            : align === 'right'
              ? 'text-end'
              : 'text-center';

    return (
        <div
            ref={containerRef}
            className={`my-2 overflow-auto ${alignClass}`}
            style={{ fontSize }}
        />
    );
};
