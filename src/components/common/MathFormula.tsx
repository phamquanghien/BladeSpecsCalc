import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathFormulaProps {
    formula: string;
    displayMode?: boolean; // true: block, false: inline
    fontSize?: string; // Default '1.25rem'
    align?: 'left' | 'center' | 'right';
}

export const MathFormula: React.FC<MathFormulaProps> = ({
    formula,
    displayMode = true,
    fontSize = '1.25rem',
    align = 'center',
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

    // Alignment handling with Flexbox is more accurate than CSS text-align for KaTeX blocks
    const justifyClass =
        align === 'left'
            ? 'justify-content-start'
            : align === 'right'
              ? 'justify-content-end'
              : 'justify-content-center';

    return (
        <div
            ref={containerRef}
            className={`d-flex align-items-center ${justifyClass} my-2 overflow-auto`}
            style={{ fontSize }}
        />
    );
};
