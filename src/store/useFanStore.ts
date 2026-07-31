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
  // computeStep1: () => void;
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

const initialPreset = fanPresets[0];

export const useFanStore = create<FanStoreState>((set, get) => ({
  step1Input: initialPreset,
  step1Output: computeStep1Helper(initialPreset), // Tính toán luôn giá trị ban đầu

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
}));