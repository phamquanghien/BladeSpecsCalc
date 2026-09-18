import type { 
    Step4Input, 
    Step4Output, 
    SectionStep4Data, 
    DistributionPointData, 
    BoundaryPointData 
} from '../models/Step4';
import type { Step3Output } from './step3'; 
import { X_COEFFICIENTS, Y_COEFFICIENTS } from '../config/step4Constants';
import type { Step2Output } from './step2';

export const defaultStep4Input: Step4Input = {
    materialName: 'Thép 20Mn GOST 1050-60',
    E: 245000,
    sigmaKcp: 286.7,
    sigmaUcp: 172,
    rhoMaterial: 7800,
};

export const calculateStep4 = (
    _step4Input: Step4Input,
    step3Output: Step3Output | null,
    step2Output: Step2Output | null,
): Step4Output => {
    if (!step3Output || !step3Output.sections || step3Output.sections.length === 0) {
        return { sections: [] };
    }
    const Da = step2Output?.da ?? 2.4; 
    const Df = step2Output?.df ?? 1.344;
    const h = (Da - Df)/2;

    const sections: SectionStep4Data[] = step3Output.sections.map((sec, idx) => {
        const Li = sec.Li;
        const varthetaI = sec.varthetaI;
        const Ri = sec.Ri;
        const alpha2i = sec.alpha2i;
        const sectionIndex = sec.sectionIndex || idx + 1;
        const phi1iDeg = 90 - varthetaI / 2;
        const etaIDeg = 90 + varthetaI / 2;
        const phi1iRad = (phi1iDeg * Math.PI) / 180;

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
        let sumXpsi = 0;
        let sumYpsi = 0;
        let sumJxpij = 0;
        let sumJYpij = 0;

        for (let j = 1; j <= 16; j++) {
            const xiCurrent = points[j - 1].xiIj;
            const xiNext = points[j].xiIj;

            const yCurrent = points[j - 1].yik;
            const yNext = points[j].yik;

            const deltaIj = xiNext - xiCurrent;
            const dij = yCurrent + yNext;

            // Chuyển deltaIj từ Độ sang Radian để tính sin
            const halfDeltaRad = ((deltaIj / 2) * Math.PI) / 180;
            const sinHalfDelta = Math.sin(halfDeltaRad);

            const aij = 2 * (Ri + dij / 2) * sinHalfDelta;
            const bij = 2 * (Ri - dij / 2) * sinHalfDelta;
            const hij = dij;

            // Tính A_ij và cộng dồn
            const Aij = ((aij + bij) / 2) * hij;
            sumAij += Aij;

            // Khoảng cách e_ij
            const eij = (aij + bij > 0) 
                ? ((aij + 2 * bij) * hij) / (3 * (aij + bij))
                : 0;
            
            // Tính BETA_ij và PHI2_i
            let betaIjDeg = 0;
            let xij = 0
            if (j > 1) {
                const xikCurrent = points[j - 1].xik;
                const xikPrev = points[j - 2].xik;
                xij = (xikCurrent + xikPrev)/2;
                betaIjDeg = Ri > 0 ? ((xikCurrent - xikPrev) / (2 * Ri)) * (180 / Math.PI) : 0;
            }

            const phi2iDeg = etaIDeg - betaIjDeg;
            const phi2iRad = (phi2iDeg * Math.PI) / 180;

            // Tính X'_ij và Y'_ij
            const xpij = (Ri * Math.cos(phi1iRad)) + (Ri + hij / 2 - eij) * Math.cos(phi2iRad);
            const ypij = (Ri * Math.sin(phi1iRad)) + (Ri + hij / 2 - eij) * Math.sin(phi2iRad);

            // Cộng dồn tích khối lượng cho tọa độ trọng tâm
            sumXpsi += Aij * xpij;
            sumYpsi += Aij * ypij;
            const Juij = ((Math.pow(aij,2) + 4 * aij * bij + Math.pow(bij,2))/(aij + bij)) * (Math.pow(hij,3)/36);
            const Jvij = (Math.pow(bij,3) * hij)/12 + ((h *(Math.pow((aij - bij),3)))/36 + ((h * (aij - bij))/4) * Math.pow((aij + 2 * bij)/6,2));
            const Juvij = 2 * (eij - (bij/3)) * ((aij + 2 * bij)/6) * ((h * (aij - bij))/4);

            const voi = Ri * (1 - Math.sin(phi2iRad + ((varthetaI / 2) * Math.PI) / 180 - Math.PI / 2));
            const uoi = xij;
            const Jupij = Juij + Aij * Math.pow(voi,2);
            const Jvpij = Jvij + Aij * Math.pow(uoi,2);
            const Jupvpij = Juvij + Aij * uoi * voi;

            //xem lại trong công thức xem alphai có phải là alpha2i không
            const twoAlphaRad = ((2 * alpha2i) * Math.PI) / 180;
            const Jxpij = (Jupij + Jvpij) / 2 +  ((Jupij - Jvpij) / 2) * Math.cos(twoAlphaRad) - Jupvpij * Math.sin(twoAlphaRad);
            const Jypij = (Jupij + Jvpij) / 2 + ((Jupij - Jvpij) / 2) * Math.cos(twoAlphaRad) + Jupvpij * Math.sin(twoAlphaRad);

            sumJxpij += Jxpij;
            sumJYpij += Jypij;

            boundaries.push({
                jIndex: j, deltaIj, dij, aij, bij, hij, Aij, eij,
                xpij, ypij, Juij, Jvij, Juvij, voi, uoi, Jupij, Jvpij, Jupvpij,
                Jxpij, Jypij
            });
        }

        // 3. Tính Diện tích mặt cắt A_i = Sum(A_ij) / 6
        const Ai = sumAij;
        const xpsi = Ai > 0 ? sumXpsi / Ai : 0;
        const ypsi = Ai > 0 ? sumYpsi / Ai : 0;
        const Jxpi = sumJxpij;
        const Jypi = sumJYpij;
        const Jxi = Jxpi + (Math.pow(ypsi,2) * Ri);
        const Jyi = Jypi + (Math.pow(xpsi, 2) * Ri);

        return {
            sectionIndex,
            Li,
            varthetaI,
            points,
            boundaries,
            Ai, xpsi, ypsi, Jxi, Jyi
        };
    });

    return {
        sections,
    };
};