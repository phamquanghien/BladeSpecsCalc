import type { FanPreset } from '../models/FanPreset';
import type { Step2Output } from '../models/Step2';
import type { Step3Output } from './step3';
import type { Step4Input } from '../models/Step4';
import type { Step5ReportData } from '../models/Step5';
import { calculateStep4Area } from './step4';

export const generateStep5Report = (
    step1Input: FanPreset | null,
    step2Output: Step2Output | null,
    step3Output: Step3Output | null,
    step4Input: Step4Input | null
): Step5ReportData | null => {
    if (!step1Input || !step2Output || !step3Output || !step4Input) {
        return null;
    }

    const areaData = calculateStep4Area(step3Output);

    const sectionsSummary = step3Output.sections.map((sec, idx) => {
        const areaInfo = areaData.find((a) => a.sectionIndex === sec.sectionIndex);
        return {
            sectionIndex: sec.sectionIndex || idx + 1,
            Di: sec.Di,
            ui: sec.ui,
            w1i: sec.w1i,
            w2i: sec.w2i,
            beta1i: sec.beta1i,
            beta2i: sec.beta2i,
            gammaI: sec.gammaI,
            Li: sec.Li,
            Ai: areaInfo ? areaInfo.Ai : 0,
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