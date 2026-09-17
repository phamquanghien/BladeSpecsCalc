import type { FanPreset } from '../models/FanPreset';
import type { Step2Output } from '../models/Step2';
import type { Step3Output } from './step3';
import type { Step4Input, Step4Output } from '../models/Step4';
import type { Step5ReportData } from '../models/Step5';

export const generateStep5Report = (
    step1Input: FanPreset | null,
    step2Output: Step2Output | null,
    step3Output: Step3Output | null,
    step4Input: Step4Input | null,
    step4Output?: Step4Output | null
): Step5ReportData | null => {
    if (!step1Input || !step2Output || !step3Output || !step4Input) {
        return null;
    }

    // Lấy thông tin mặt cắt trực tiếp từ step4Output.sections
    const step4Sections = step4Output?.sections || [];

    const sectionsSummary = step3Output.sections.map((sec, idx) => {
        const secIndex = sec.sectionIndex || idx + 1;
        
        // Tìm thông tin diện tích Ai tương ứng từ step4Output
        const sec4 = step4Sections.find((s) => s.sectionIndex === secIndex);
        const Ai = sec4?.Ai ?? 0;

        return {
            sectionIndex: secIndex,
            Di: sec.Di,
            ui: sec.ui,
            w1i: sec.w1i,
            w2i: sec.w2i,
            beta1i: sec.beta1i,
            beta2i: sec.beta2i,
            gammaI: sec.gammaI,
            Li: sec.Li,
            Ai,
        };
    });

    return {
        initialData: {
            fanType: step1Input.nameKey || '2K60-N°18',
            Q: step1Input.airflow || 0,
            deltaP: step1Input.staticPressure || 0,
            n: step1Input.rotationSpeed || 0,
            ro: step1Input.gasDensity || 1.2,
            m: step1Input.bladeRingCount || 2,
        },
        strengthData: {
            materialName: step4Input.materialName,
            E: step4Input.E,
            sigmaKcp: step4Input.sigmaKcp,
            sigmaUcp: step4Input.sigmaUcp,
            rhoMaterial: step4Input.rhoMaterial,
        },
        sectionsSummary,
    };
};