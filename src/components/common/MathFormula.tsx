import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathFormulaProps {
    formula: string;
    displayMode?: boolean;
    fontSize?: string; // Default '1.1rem'
    align?: 'left' | 'center' | 'right' | 'responsive'; // Thêm option 'responsive'
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
            // Rendering KaTeX formulas
            katex.render(formula, container, {
                displayMode,
                throwOnError: false, // Avoid app crashes if you write LaTeX syntax incorrectly
            });
        } catch (error: unknown) {
            console.error('KaTeX rendering error:', error);
        }

        // Cleanup function: Remove DOM content when unmounting or re-rendering.
        return () => {
            if (container) {
                container.innerHTML = '';
            }
        };
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
