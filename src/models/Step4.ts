export interface Step4Input {
    materialName: string; // Vật liệu làm cánh quạt
    E: number;            // Mô đun đàn hồi [MPa]
    sigmaKcp: number;     // Ứng suất kéo cho phép σ_k,cp [MPa]
    sigmaUcp: number;     // Ứng suất uốn cho phép σ_u,cp [MPa]
    rhoMaterial: number;  // Khối lượng riêng của vật liệu P [Kg/m3]
}

// 1. Điểm tọa độ và góc tại từng nấc s (từ 0 đến 16)
export interface DistributionPointData {
    sIndex: number;    // Chỉ số nấc s (0 đến 16)
    xCoeff: number;    // Hệ số x
    yCoeff: number;    // Hệ số y
    xik: number;       // x_ik = (xCoeff * Li) / 100
    yik: number;       // y_ik = (yCoeff * Li) / 100
    xiIj: number;      // \xi_ij = (\xiCoeff * \vartheta_i) / 100 (tại s=16 là Li)
}

// 2. Điểm biên Boundary (j từ 1 đến 16)
export interface BoundaryPointData {
    jIndex: number;    // Chỉ số j (từ 1 đến 16)
    dij: number;       // d_ij = y_i,j + y_i,j+1
    deltaIj: number;   // \delta_ij = \xi_i,j+1 - \xi_i,j
    aij: number;       // a_ij = 2 * (Ri + (d_ij / 2) * sin(delta_ij / 2))
    bij: number;       // b_ij = 2 * (Ri - (d_ij / 2) * sin(delta_ij / 2))
    hij: number;       // h_ij = delta_ij
    Aij: number;       // Diện tích đoạn j
    eij: number;       // Khoảng cách trọng tâm hình thang e_ij
    xpij: number;      // X'_ij
    ypij: number;
}

// 3. Dữ liệu tổng hợp tính toán cho từng mặt cắt i (tương đương RingSectionData bên Step3)
export interface SectionStep4Data {
    sectionIndex: number;
    Li: number;
    varthetaI: number;
    points: DistributionPointData[];  // Mảng 17 điểm phân bố
    boundaries: BoundaryPointData[];  // Mảng 16 đoạn biên
    Ai: number;                       // Diện tích mặt cắt A_i
    xpsi: number;     // Trọng tâm X'_{s,i}
    ypsi: number;     // Trọng tâm Y'_{s,i}
}

// 4. Kết quả đầu ra tổng thể của Step 4 (tương đương Step3Output)
export interface Step4Output {
    sections: SectionStep4Data[];
}