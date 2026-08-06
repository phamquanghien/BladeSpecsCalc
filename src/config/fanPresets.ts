import type { FanPreset } from '../models/FanPreset';

export const fanPresets: FanPreset[] = [
  {
    id: 1,
    nameKey: 'bladeType.type1.name',
    descriptionKey: 'bladeType.type1.description',
    airflow: 105,
    staticPressure: 2450,
    rotationSpeed: 980,
    gasDensity: 1.2,
    bladeRingCount: 26,
    bladeNumber: 14
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
    bladeNumber: 12
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
    bladeNumber: 12
  },
];