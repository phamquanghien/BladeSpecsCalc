export interface Step4Input {
  materialName: string; // Vật liệu làm cánh quạt (VD: Thép 20Mn GOST 1050-60)
  E: number;            // Mô men đàn hồi [MPa]
  sigmaKcp: number;     // Ứng suất kéo cho phép σ_k,cp [MPa]
  sigmaUcp: number;     // Ứng suất uốn cho phép σ_u,cp [MPa]
  rhoMaterial: number;  // Khối lượng riêng của vật liệu P [Kg/m3]
}