import type { FanPreset } from '../models/FanPreset';
import type { Step2Input } from '../models/Step2';

export interface Step2Output {
  da: number; // Đường kính Da (m)
  df: number; // Đường kính Df (m)
}

export const calculateStep2 = (
  step1Input: FanPreset,
  step2Input: Step2Input
): Step2Output => {
  const { airflow: Q, staticPressure: deltaP, gasDensity: rho } = step1Input;
  const { delta, dfDaRatio } = step2Input;

  // Kiểm tra điều kiện tránh chia cho 0 hoặc căn bậc hai số âm
  if (rho <= 0 || deltaP <= 0 || Q < 0) {
    return { da: 0, df: 0 };
  }

  // 1. Tính Da = delta * (sqrt(Q) / (2 * deltaP / rho)^(1/4)) * (2 / sqrt(pi))
  const denominator = Math.pow((2 * deltaP) / rho, 0.25);
  const da = delta * (Math.sqrt(Q) / denominator) * (2 / Math.sqrt(Math.PI));

  // 2. Tính Df = (Df/Da) * Da
  const df = dfDaRatio * da;

  return { da, df };
};