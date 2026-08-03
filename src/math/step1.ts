export interface Step1Input {
  airflow: number;         // Q (m³/s)
  staticPressure: number;  // Δp (Pa)
  rotationSpeed: number;   // n (vòng/phút)
  gasDensity: number;      // ρ (kg/m³)
  bladeRingCount?: number; 
}

export interface Step1Output {
  sigma: number; // Hệ số đặc trưng σ
}

/**
 * Tính Hệ số đặc trưng Sigma (σ)
 */
export const calculateStep1 = (input: Step1Input): Step1Output => {
  const { rotationSpeed, airflow, staticPressure, gasDensity } = input;

  if (staticPressure <= 0 || gasDensity <= 0) {
    throw new Error('Áp suất và Khối lượng riêng phải lớn hơn 0!');
  }

  // Chuyển n từ vòng/phút (rpm) sang vòng/giây (rps)
  const n_rps = rotationSpeed / 60;

  // Tử số: sqrt(Q)
  const numerator = Math.sqrt(airflow);

  // Mẫu số: (2 * DeltaP / rho)^(3/4)
  const denominator = Math.pow((2 * staticPressure) / gasDensity, 0.75);

  // Công thức: sigma = n_rps * (sqrt(Q) / denominator) * 2 * sqrt(pi)
  const sigma = n_rps * (numerator / denominator) * 2 * Math.sqrt(Math.PI);

  return {
    sigma: Number(sigma),
  };
};