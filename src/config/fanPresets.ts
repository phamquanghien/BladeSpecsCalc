// src/config/fanPresets.ts
import type { FanPreset } from '../models/FanPreset';

export const fanPresets: FanPreset[] = [
  {
    id: 1,
    nameKey: 'bladeType.type1.name', // Đã sửa lại chuẩn key JSON (dùng dấu chấm)
    descriptionKey: 'bladeType.type1.description',
    airflow: 105,
    staticPressure: 2450,
    rotationSpeed: 980,
    gasDensity: 1.2,
    bladeRingCount: 26,
  },
  {
    id: 2,
    nameKey: 'bladeType.type2.name',
    descriptionKey: 'bladeType.type2.description',
    airflow: 120,
    staticPressure: 3100,
    rotationSpeed: 980,
    gasDensity: 1.2,
    bladeRingCount: 26,
  },
  {
    id: 3,
    nameKey: 'bladeType.type3.name',
    descriptionKey: 'bladeType.type3.description',
    airflow: 160,
    staticPressure: 4200,
    rotationSpeed: 980,
    gasDensity: 1.2,
    bladeRingCount: 26,
  },
];