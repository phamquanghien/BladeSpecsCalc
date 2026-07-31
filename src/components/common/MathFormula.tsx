import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathFormulaProps {
    formula: string;
    displayMode?: boolean;
    fontSize?: string; // Default '1.1rem'
    align?: 'left' | 'center' | 'right' | 'responsive';
}

export const MathFormula: React.FC<MathFormulaProps> = ({
    formula,
    displayMode = false,
    fontSize = '1.25rem',
    align = 'responsive',
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        try {
            // KaTeX sẽ tự động ghi đè nội dung cũ mà không cần xóa innerHTML thủ công
            katex.render(formula, container, {
                displayMode,
                throwOnError: false, // Bỏ qua crash khi viết sai cú pháp LaTeX
            });
        } catch (error: unknown) {
            console.error('KaTeX rendering error:', error);
        }
    }, [formula, displayMode]);

    const getAlignClass = () => {
        if (align === 'responsive') return 'text-start text-md-center';
        if (align === 'center') return 'text-center';
        if (align === 'right') return 'text-end';
        return 'text-start';
    };

    return (
        <div
            ref={containerRef}
            className={`my-1 overflow-x-auto overflow-y-hidden ${getAlignClass()}`}
            style={{
                fontSize,
                whiteSpace: 'nowrap',
            }}
        />
    );
};
