export interface Step5ReportData {
    initialData: {
        fanType: string;
        Q: number;
        deltaP: number;
        n: number;
        ro: number;
        m: number;
    };
    strengthData: {
        materialName: string;
        E: number;
        sigmaKcp: number;
        sigmaUcp: number;
        rhoMaterial: number;
    };
    sectionsSummary: Array<{
        sectionIndex: number;
        Di: number;
        ui: number;
        w1i: number;
        w2i: number;
        beta1i: number;
        beta2i: number;
        gammaI: number;
        Li: number;
        Ai: number;
    }>;
}