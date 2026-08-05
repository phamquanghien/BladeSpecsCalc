import type { FanPreset } from '../models/FanPreset';
import type { Step2Output } from '../models/Step2';

export interface RingSectionData {
  sectionIndex: number; // Chỉ số mặt cắt i (1, 2, 3...)
  sectionLabel: string; // Tên hiển thị (1=a, 2, 3...)
  di: number;           // Đường kính Di (m)
  ui: number;           // Vận tốc vòng ui [m/s]
  c2ui: number;
  c2i: number;
  cinfi: number;
  w1i: number;
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

    sections.push({
      sectionIndex: i,
      sectionLabel: label,
      di: currentD,
      ui, c2ui, c2i, cinfi, w1i
    });

    // Tính đường kính cho mặt cắt tiếp theo: D_i = sqrt(D_{i-1}^2 - deltaD)
    const nextDSquared = Math.pow(currentD, 2) - deltaD;
    currentD = nextDSquared > 0 ? Math.sqrt(nextDSquared) : 0;
  }

  return { cm, sections };
};