// src/models/FanPreset.ts
export interface FanPreset {
  id: number;
  nameKey: string;
  descriptionKey: string;
  airflow: number;          // Q (m³/s)
  staticPressure: number;   // Δp (Pa)
  rotationSpeed: number;    // n (v/p)
  gasDensity: number;       // ρ (kg/m³)
  bladeRingCount: number;   // m (số vành khăn)
}