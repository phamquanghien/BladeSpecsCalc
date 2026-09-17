import type { 
    Step4Input, 
    Step4Output, 
    SectionStep4Data, 
    DistributionPointData, 
    BoundaryPointData 
} from '../models/Step4';
import type { Step3Output } from './step3'; 
import { X_COEFFICIENTS, Y_COEFFICIENTS } from '../config/step4Constants';

export const defaultStep4Input: Step4Input = {
    materialName: 'Thép 20Mn GOST 1050-60',
    E: 245000,
    sigmaKcp: 286.7,
    sigmaUcp: 172,
    rhoMaterial: 7800,
};

export const calculateStep4 = (
    _step4Input: Step4Input,
    step3Output: Step3Output | null
): Step4Output => {
    if (!step3Output || !step3Output.sections || step3Output.sections.length === 0) {
        return { sections: [] };
    }

    const sections: SectionStep4Data[] = step3Output.sections.map((sec, idx) => {
        const Li = sec.Li;
        const varthetaI = sec.varthetaI;
        const sectionIndex = sec.sectionIndex || idx + 1;

        // 1. Tính Tọa độ phân bố (17 điểm k từ 0 đến 16)
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

        // 2. Tính Điểm biên Boundary (16 đoạn j từ 1 đến 16) và Cộng dồn diện tích
        const boundaries: BoundaryPointData[] = [];
        let sumAij = 0;

        for (let j = 1; j <= 16; j++) {
            const xiCurrent = points[j - 1].xiIj;
            const xiNext = points[j].xiIj;

            const yCurrent = points[j - 1].yik;
            const yNext = points[j].yik;

            const deltaIj = xiNext - xiCurrent;
            const dij = yCurrent + yNext;

            const Rij = Array.isArray(sec.Ri) ? sec.Ri[j - 1] : sec.Ri;

            // Chuyển deltaIj từ Độ sang Radian để tính sin
            const halfDeltaRad = ((deltaIj / 2) * Math.PI) / 180;
            const sinHalfDelta = Math.sin(halfDeltaRad);

            const aij = 2 * (Rij + dij / 2) * sinHalfDelta;
            const bij = 2 * (Rij - dij / 2) * sinHalfDelta;
            const hij = deltaIj;

            // Tính A_ij và cộng dồn
            const Aij = ((aij + bij) / 2) * hij;
            sumAij += Aij;

            boundaries.push({
                jIndex: j,
                deltaIj,
                dij,
                aij,
                bij,
                hij,
            });
        }

        // 3. Tính Diện tích mặt cắt A_i = Sum(A_ij) / 6
        const Ai = sumAij / 6;

        return {
            sectionIndex,
            Li,
            varthetaI,
            points,
            boundaries,
            Ai,
        };
    });

    return {
        sections,
    };
};