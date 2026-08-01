export interface Step2Input {
  delta: number;        // Hệ số δ (Mặc định: 1.65)
  dfDaRatio: number;    // Tỷ số Df/Da (Mặc định: 0.56)
  
//   // Bạn có thể cần bổ sung thêm hiệu suất/hệ số giảm áp nếu công thức Y_lt_infinity yêu cầu:
//   etaI?: number;        // Hiệu suất ηi (nếu chưa có có thể tạm để 1.0)
//   mu?: number;          // Hệ số μ (nếu chưa có có thể tạm để 1.0)
}