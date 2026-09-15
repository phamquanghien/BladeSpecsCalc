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