import type { FanPreset } from '../models/FanPreset';
import type { Step2Output } from '../models/Step2';

export interface RingSectionData {
  sectionIndex: number; // Chỉ số mặt cắt i (1, 2, 3...)
  sectionLabel: string; // Tên hiển thị (1=a, 2, 3...)
  di: number;           // Đường kính Di (m)
}

export interface Step3Output {
  sections: RingSectionData[];
}

export const calculateStep3 = (
  step1Input: FanPreset,
  step2Output: Step2Output
): Step3Output => {
  const m = step1Input.bladeRingCount || 4; // Số vành khăn (m) từ Step 1
  const { da, am } = step2Output;          // Da và Am từ Step 2

  const sections: RingSectionData[] = [];

  if (m <= 0 || am <= 0 || da <= 0) {
    return { sections: [] };
  }

  // Lượng trừ cố định: (4 * Am) / (m * pi)
  const deltaD = (4 * am) / (m * Math.PI);

  let currentD = da; // Mặt cắt đầu tiên 1=a có D_1 = D_a

  // Vòng lặp tính toán từ mặt cắt 1 đến m + 1 (hoặc m mặt cắt tùy sơ đồ)
  for (let i = 1; i <= m; i++) {
    const label = i === 1 ? '1=a' : `${i}`;

    sections.push({
      sectionIndex: i,
      sectionLabel: label,
      di: currentD,
    });

    // Tính đường kính cho mặt cắt tiếp theo: D_i = sqrt(D_{i-1}^2 - deltaD)
    const nextDSquared = Math.pow(currentD, 2) - deltaD;
    currentD = nextDSquared > 0 ? Math.sqrt(nextDSquared) : 0;
  }

  return { sections };
};