import { create } from 'zustand';
import type { FanPreset } from '../models/FanPreset';
import { calculateStep1, type Step1Output } from '../math/step1';
import { fanPresets } from '../config/fanPresets';
import type { Step2Input } from '../models/Step2';
import { calculateStep2, type Step2Output } from '../math/step2';

interface FanStoreState {
  // Input data for Step1
  step1Input: FanPreset;
  // Calculation results for Step 1
  step1Output: Step1Output | null;

  // Step 2 Input
  step2Input: Step2Input;
  step2Output: Step2Output | null;

  // Actions
  setStep1Input: (input: FanPreset) => void;
  updateStep1Field: (fieldName: keyof FanPreset, value: number) => void;
  updateStep2Field: (fieldName: keyof Step2Input, value: number) => void;
}

// Helper function để tính toán nhanh
const computeStep1Helper = (input: FanPreset): Step1Output | null => {
  try {
    return calculateStep1(input);
  } catch (error: unknown) {
    console.error('Lỗi tính toán Step 1:', error);
    return null;
  }
};
const computeStep2Helper = (step1Input: FanPreset, step2Input: Step2Input): Step2Output | null => {
  try { 
    return calculateStep2(step1Input, step2Input);
  }
  catch { 
    return null;
  }
};

const initialPreset = fanPresets[0];
const initialStep2Input: Step2Input = {
  delta: 1.65,
  dfDaRatio: 0.56,
  // etaI: 1.0,
  // mu: 1.0,
};

export const useFanStore = create<FanStoreState>((set, get) => ({
  step1Input: initialPreset,
  step1Output: computeStep1Helper(initialPreset), // Tính toán luôn giá trị ban đầu
  step2Input: initialStep2Input,
  step2Output: computeStep2Helper(initialPreset, initialStep2Input),

  // Khi chọn một Preset mới -> Cập nhật input và tự động tính toán lại ngay
  setStep1Input: (input) => {
    set({
      step1Input: input,
      step1Output: computeStep1Helper(input),
    });
  },

  // Khi chỉnh sửa 1 trường thông số bất kỳ -> Cập nhật input và tự động tính toán lại ngay
  updateStep1Field: (fieldName, value) => {
    const updatedInput = {
      ...get().step1Input,
      [fieldName]: value,
    };

    set({
      step1Input: updatedInput,
      step1Output: computeStep1Helper(updatedInput),
    });
  },
  // --- STEP 2 STATE ---
  updateStep2Field: (fieldName, value) => {
    const updatedStep2 = { ...get().step2Input, [fieldName]: value };
    const { step1Input } = get();
    set({
      step2Input: updatedStep2,
      step2Output: computeStep2Helper(step1Input, updatedStep2),
    });
  },
}));