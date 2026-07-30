import { create } from 'zustand';
import type { FanPreset } from '../models/FanPreset';
import { calculateStep1, type Step1Output } from '../math/step1';
import { fanPresets } from '../config/fanPresets';

interface FanStoreState {
  // Input data for Step1
  step1Input: FanPreset;
  // Calculation results for Step 1
  step1Output: Step1Output | null;

  // Actions
  setStep1Input: (input: FanPreset) => void;
  updateStep1Field: (fieldName: keyof FanPreset, value: number) => void;
  computeStep1: () => void;
}

export const useFanStore = create<FanStoreState>((set, get) => ({
  step1Input: fanPresets[0],
  step1Output: null,

  // Update the default parameter value when the user selects the fan type
  setStep1Input: (input) => set({ step1Input: input, step1Output: null }),

  // Update each input field as you type.
  updateStep1Field: (fieldName, value) =>
    set((state) => ({
      step1Input: {
        ...state.step1Input,
        [fieldName]: value,
      },
      step1Output: null, // Reset the result when modifying the parameter value.
    })),

  // Perform the calculations
  computeStep1: () => {
    const { step1Input } = get();
    try {
        const output = calculateStep1(step1Input);
        set({ step1Output: output });
    } catch (error: unknown) {
        if (error instanceof Error) {
        alert(error.message);
        } else {
        alert('Đã xảy ra lỗi không xác định!');
        }
    }
    }
}));