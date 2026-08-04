export interface Step2Input {
  delta: number;        // Hệ số δ (Mặc định: 1.65)
  dfDaRatio: number;    // Tỷ số Df/Da (Mặc định: 0.56)
  etaI: number; // Hiệu suất trong màng cánh ηi (mặc định 0.85)
  mu: number;   // Hệ số tính toán μ (mặc định 0.925)
}