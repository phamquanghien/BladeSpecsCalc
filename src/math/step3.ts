import type { FanPreset } from '../models/FanPreset';
import type { Step2Output } from '../models/Step2';

export interface RingSectionData {
  sectionIndex: number; // Chỉ số mặt cắt i (1, 2, 3...)
  sectionLabel: string; // Tên hiển thị (1=a, 2, 3...)
  di: number;           // Đường kính Di (m)
  ui: number;           // Vận tốc vòng ui [m/s]
  c2ui: number; c2i: number; cinfi: number;
  w1i: number; w2i: number; wRatio: number; isRatioValid: boolean; winfi: number;
  beta1i: number; beta2i: number; betainfi: number;
  alpha1i: number; alpha2i: number; alphainfi: number;
  ti: number; deltaWui: number; lOverTi04: number; lOverTi05: number; li04: number; li05: number; selectedLi: number; rei: number;
  calOverTi: number; cai: number; gammaMi: number;
}

export interface Step3Output {
  cm: number;
  sections: RingSectionData[];
}

export const calculateStep3 = (
  step1Input: FanPreset,
  step2Output: Step2Output
): Step3Output => {
  const m = step1Input.bladeRingCount || 4; // Số vành khăn (m) từ Step 1
  const Q = step1Input.airflow;
  const z = step1Input.bladeNumber || 12; // Số cánh quạt z mặc định bằng 12
  const rpm = step1Input.rotationSpeed;            // Tốc độ quay n (vòng/phút)
  const { da, am } = step2Output;          // Da và Am từ Step 2

  const sections: RingSectionData[] = [];

  if (m <= 0 || am <= 0 || da <= 0) {
    return { cm: 0, sections: [] };
  }

  // 1. Tính cm = Q / Am (Dùng chung cho tất cả mặt cắt)
  const cm = am > 0 ? Q / am : 0;

  // Lượng trừ cố định: (4 * Am) / (m * pi)
  const deltaD = (4 * am) / (m * Math.PI);

  let currentD = da; // Mặt cắt đầu tiên 1=a có D_1 = D_a

  // Chuyển đổi n sang vòng/giây nếu n nhập từ Bước 1 là vòng/phút (rpm)
  const nRps = rpm / 60;

  // Vòng lặp tính toán từ mặt cắt 1 đến m + 1 (hoặc m mặt cắt tùy sơ đồ)
  for (let i = 1; i <= m; i++) {
    const label = i === 1 ? '1=a' : `${i}`;

    // Tính ui = n * pi * Di (n ở đơn vị vòng/giây)
    const ui = nRps * Math.PI * currentD;
    // Tính c2ui = Y_lt,infinity / ui
    const yLtInfinity = step2Output.yLtInfinity || 0;
    const c2ui = ui > 0 ? yLtInfinity / ui : 0;
    // Tính c2i = sqrt(cm^2 + c2ui^2)
    const c2i = Math.sqrt(Math.pow(cm, 2) + Math.pow(c2ui, 2));
    // Tính c_infinity,i = sqrt(cm^2 + (c2ui / 2)^2)
    const cinfi = Math.sqrt(Math.pow(cm, 2) + Math.pow(c2ui / 2, 2));
    // Tính w1i = sqrt(cm^2 + ui^2)
    const w1i = Math.sqrt(Math.pow(cm, 2) + Math.pow(ui, 2));
    // Tính w2i = sqrt(cm^2 + (ui - c2ui)^2)
    const w2i = Math.sqrt(Math.pow(cm, 2) + Math.pow(ui - c2ui, 2));
    // Tính w2i / w1i và kiểm tra điều kiện
    const wRatio = w1i > 0 ? w2i / w1i : 0;
    const isRatioValid = wRatio > 0.75;
    // Tính w_infinity,i = sqrt(cm^2 + (ui - c2ui / 2)^2)
    const winfi = Math.sqrt(Math.pow(cm, 2) + Math.pow(ui - c2ui / 2, 2));
    // Tính beta1,i = arctan(cm / ui) [độ]
    const beta1iRad = ui > 0 ? Math.atan(cm / ui) : 0;
    const beta1i = (beta1iRad * 180) / Math.PI;
    // Tính beta2,i = arctan(cm / (ui - c2ui)) [độ]
    const denominator = ui - c2ui;
    const beta2iRad = denominator !== 0 ? Math.atan(cm / denominator) : 0;
    const beta2i = (beta2iRad * 180) / Math.PI;
    // Tính beta_infinity,i = arctan(cm / (ui - c2ui / 2)) [độ]
    const betainfiDenom = ui - (c2ui / 2);
    const betainfiRad = betainfiDenom !== 0 ? Math.atan(cm / betainfiDenom) : 0;
    const betainfi = (betainfiRad * 180) / Math.PI;
    // Trong vòng lặp for (let i = 1; i <= m; i++):
    const alpha1i = 90; // Mặc định 90 độ cho dòng vào dọc trục
    // Tính alpha2,i = arctan(cm / c2ui) [độ]
    const alpha2iRad = c2ui > 0 ? Math.atan(cm / c2ui) : 0;
    const alpha2i = (alpha2iRad * 180) / Math.PI;
    // Tính alpha_infinity,i = arctan(cm / (c2ui / 2)) [độ]
    const alphainfiDenom = c2ui / 2;
    const alphainfiRad = alphainfiDenom > 0 ? Math.atan(cm / alphainfiDenom) : 0;
    const alphainfi = (alphainfiRad * 180) / Math.PI;

    const deltaWui = w1i - w2i;
    const lOverTi04 = winfi > 0 ? deltaWui / (0.4 * winfi) : 0;
    const lOverTi05 = winfi > 0 ? deltaWui / (0.5 * winfi) : 0;

    const ti = (Math.PI * currentD) / z;

    // Tính li = (l/t)_i * t_i tương ứng với k = 0.4 và k = 0.5
    const li04 = lOverTi04 * ti;
    const li05 = lOverTi05 * ti;
    //
    const ki = 0.4 + (0.1 / m) * (i - 1);
    const selectedLi = winfi > 0 ? (deltaWui / (ki * winfi)) * ti : 0;

    // Hằng số độ nhớt động học nu = 15e-6 m2/s
    const nu = 15e-6;
    // Tính R_{e,i} = (winfi * selectedLi) / nu
    const rei = nu > 0 ? (winfi * selectedLi) / nu : 0;
    // Tính (ca * l / t)_i = (2 * YltInfi) / (ui * winfi)
    const calOverTi = (ui > 0 && winfi > 0) ? (2 * yLtInfinity) / (ui * winfi) : 0;
    // Tính c_{a,i} = (c_a * l / t)_i * (t_i / l_i)
    const cai = selectedLi > 0 ? calOverTi * (ti / selectedLi) : 0;
    // Tính gamma_m,i = (beta1i + beta2i) / 2 [độ]
    const gammaMi = (beta1i + beta2i) / 2;

    sections.push({
      sectionIndex: i,
      sectionLabel: label,
      di: currentD,
      ui, c2ui, c2i, cinfi,
      w1i, w2i, wRatio,isRatioValid, winfi,
      beta1i, beta2i, betainfi,
      alpha1i, alpha2i, alphainfi,
      ti, deltaWui, lOverTi04, lOverTi05, li04, li05, selectedLi, rei,
      calOverTi, cai, gammaMi
    });

    // Tính đường kính cho mặt cắt tiếp theo: D_i = sqrt(D_{i-1}^2 - deltaD)
    const nextDSquared = Math.pow(currentD, 2) - deltaD;
    currentD = nextDSquared > 0 ? Math.sqrt(nextDSquared) : 0;
  }

  return { cm, sections };
};