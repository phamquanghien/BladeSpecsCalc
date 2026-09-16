import type { Step4Input, Step4Output, SectionDistributionData, DistributionPointData } from '../models/Step4';
// 🟢 Import trực tiếp kiểu Step3Output từ math/step3 (nơi chứa trường `sections`)
import type { Step3Output } from './step3'; 
import { X_COEFFICIENTS, Y_COEFFICIENTS } from '../config/step4Constants';

export const defaultStep4Input: Step4Input = {
    materialName: 'Thép 20Mn GOST 1050-60',
    E: 245000,
    sigmaKcp: 286.7,
    sigmaUcp: 172,
    rhoMaterial: 7800,
};

// Interface cho bảng biên Boundary (j từ 1 đến 16)
export interface BoundaryPointData {
    jIndex: number; // Chỉ số j (từ 1 đến 16)
    dij: number;    // d_ij = y_i,j + y_i,j+1 (tương ứng với y_ik[j-1] + y_ik[j])
    deltaIj: number; // \delta_ij = \xi_i,j+1 - \xi_i,j (tương ứng với xiIj[j] - xiIj[j-1])
    aij: number; // a_ij = 2 * (Ri + (d_ij / 2) * sin(delta_ij / 2))
    bij: number; // b_ij = 2 * (Ri - (d_ij / 2) * sin(delta_ij / 2))
    hij: number;     // h_ij = delta_ij
}

export interface SectionBoundaryData {
    sectionIndex: number;
    boundaries: BoundaryPointData[];
}

export interface SectionAreaOutput {
    sectionIndex: number;
    Ai: number; // A_i = (Tổng A_ij từ j=1 đến 16) / 6
}

export const calculateStep4 = (
    _step4Input: Step4Input,
    step3Output: Step3Output | null
): Step4Output => {
    if (!step3Output || !step3Output.sections || step3Output.sections.length === 0) {
        return { sectionsDistribution: [] };
    }

    const sectionsDistribution: SectionDistributionData[] = step3Output.sections.map((sec, idx) => {
        const Li = sec.Li;
        const varthetaI = sec.varthetaI;
        const sectionIndex = sec.sectionIndex || idx + 1;

        const points: DistributionPointData[] = X_COEFFICIENTS.map((xCoeff, k) => {
            const yCoeff = Y_COEFFICIENTS[k] || 0;
            const xik = (xCoeff * Li) / 100;
            const yik = (yCoeff * Li) / 100;
            const xiIj = k === 16 ? Li : (xCoeff * varthetaI) / 100;

            return {
                sIndex: k,
                xCoeff,
                yCoeff,
                xik,
                yik,
                xiIj,
            };
        });

        return {
            sectionIndex,
            Li,
            varthetaI,
            points,
        };
    });

    return {
        sectionsDistribution,
    };
};
export const calculateStep4Boundary = (
    step3Output: Step3Output | null
): SectionBoundaryData[] => {
    if (!step3Output || !step3Output.sections || step3Output.sections.length === 0) {
        return [];
    }

    return step3Output.sections.map((sec, idx) => {
        const Li = sec.Li;
        const varthetaI = sec.varthetaI;
        const sectionIndex = sec.sectionIndex || idx + 1;

        // 1. Mảng giá trị \xi_ij (17 điểm từ k = 0 đến 16)
        const xiIjValues = X_COEFFICIENTS.map((xCoeff, k) =>
            k === 16 ? Li : (xCoeff * varthetaI) / 100
        );

        // 2. Mảng chứa các giá trị y_ik (từ k = 0 đến 16, tổng cộng 17 điểm)
        const yikValues = Y_COEFFICIENTS.map((yCoeff) => (yCoeff * Li) / 100);

        // Tính d_ij cho j chạy từ 1 đến 16 (tương ứng chỉ số mảng k từ 0 đến 15)
        // d_ij = y_ik[j-1] + y_ik[j] (với j = k + 1)
        const boundaries: BoundaryPointData[] = [];
        for (let j = 1; j <= 16; j++) {
            const xiCurrent = xiIjValues[j - 1]; // \xi_i,j (k = j-1)
            const xiNext = xiIjValues[j];         // \xi_i,j+1 (k = j)

            const yCurrent = yikValues[j - 1]; // y_i,j (k = j-1)
            const yNext = yikValues[j];         // y_i,j+1 (k = j)

            const deltaIj = xiNext - xiCurrent;
            const dij = yCurrent + yNext;

            const Rij = Array.isArray(sec.Ri) ? sec.Ri[j - 1] : sec.Ri;

            // Chuyển deltaIj từ Độ sang Radian để tính sin
            const halfDeltaRad = ((deltaIj / 2) * Math.PI) / 180;
            const sinHalfDelta = Math.sin(halfDeltaRad);
            
            const aij = 2 * (Rij + (dij / 2)) * sinHalfDelta;
            const bij = 2 * (Rij - (dij / 2)) * sinHalfDelta;
            const hij = deltaIj;

            boundaries.push({
                jIndex: j,
                deltaIj,
                dij,
                aij,
                bij,
                hij
            });
        }

        return {
            sectionIndex,
            boundaries,
        };
    });
};

export const calculateStep4Area = (
    step3Output: Step3Output | null
): SectionAreaOutput[] => {
    if (!step3Output || !step3Output.sections || step3Output.sections.length === 0) {
        return [];
    }

    const boundariesData = calculateStep4Boundary(step3Output);

    return boundariesData.map((secBound) => {
        // Tính A_ij cho từng j từ 1 đến 16 và cộng tổng lại
        const sumAij = secBound.boundaries.reduce((sum, b) => {
            const Aij = ((b.aij + b.bij) / 2) * b.hij;
            return sum + Aij;
        }, 0);

        // Ai[i] = Sum(Aij[i,j]) / 6
        const Ai = sumAij / 6;

        return {
            sectionIndex: secBound.sectionIndex,
            Ai,
        };
    });
};