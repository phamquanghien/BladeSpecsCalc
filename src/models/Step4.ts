export interface Step4Input {
    materialName: string; // Vật liệu làm cánh quạt
    E: number;            // Mô men đàn hồi [MPa]
    sigmaKcp: number;     // Ứng suất kéo cho phép σ_k,cp [MPa]
    sigmaUcp: number;     // Ứng suất uốn cho phép σ_u,cp [MPa]
    rhoMaterial: number;  // Khối lượng riêng của vật liệu P [Kg/m3]
}

// Điểm tọa độ và góc tại từng nấc s (từ 0 đến 16)
export interface DistributionPointData {
    sIndex: number;    // Chỉ số nấc s (0 đến 16)
    xCoeff: number;    // Hệ số x
    yCoeff: number;    // Hệ số y
    xik: number;       // x_ik = (xCoeff * Li) / 100
    yik: number;       // y_ik = (yCoeff * Li) / 100
    xiIj: number;      // \xi_ij = (\xiCoeff * \vartheta_i) / 100 (tại s=16 là Li)
}

// Dữ liệu phân bố cho từng mặt cắt i
export interface SectionDistributionData {
    sectionIndex: number;
    Li: number;
    varthetaI: number;
    points: DistributionPointData[];
}

export interface Step4Output {
    sectionsDistribution: SectionDistributionData[];
}