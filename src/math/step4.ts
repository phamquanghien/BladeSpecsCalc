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
}

export interface SectionBoundaryData {
    sectionIndex: number;
    boundaries: BoundaryPointData[];
}

export const calculateStep4 = (
    step4Input: Step4Input,
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
        const sectionIndex = sec.sectionIndex || idx + 1;

        // Mảng chứa các giá trị y_ik (từ k = 0 đến 16, tổng cộng 17 điểm)
        const yikValues = Y_COEFFICIENTS.map((yCoeff) => (yCoeff * Li) / 100);

        // Tính d_ij cho j chạy từ 1 đến 16 (tương ứng chỉ số mảng k từ 0 đến 15)
        // d_ij = y_ik[j-1] + y_ik[j] (với j = k + 1)
        const boundaries: BoundaryPointData[] = [];
        for (let j = 1; j <= 16; j++) {
            const yCurrent = yikValues[j - 1]; // y_i,j-1 (ví dụ j=1 -> k=0)
            const yNext = yikValues[j];         // y_i,j   (ví dụ j=1 -> k=1)
            boundaries.push({
                jIndex: j,
                dij: yCurrent + yNext,
            });
        }

        return {
            sectionIndex,
            boundaries,
        };
    });
};