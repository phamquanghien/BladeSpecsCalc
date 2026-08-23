import { create } from 'zustand';
import type { FanPreset } from '../models/FanPreset';
import { calculateStep1, type Step1Output } from '../math/step1';
import { fanPresets } from '../config/fanPresets';
import type { Step2Input } from '../models/Step2';
import { calculateStep2, type Step2Output } from '../math/step2';
import { calculateStep3, type Step3Output } from '../math/step3';

interface FanStoreState {
  // Cấu hình hiển thị UI
  decimalPlaces: number;
  setDecimalPlaces: (places: number) => void;

  // Step 1
  step1Input: FanPreset;
  step1Output: Step1Output | null;

  // Step 2
  step2Input: Step2Input;
  step2Output: Step2Output | null;

  // Step 3
  step3Output: Step3Output | null;
  userEpsilonInputs: number[];
  

  // Actions
  setStep1Input: (input: FanPreset) => void;
  updateStep1Field: (fieldName: keyof FanPreset, value: number) => void;
  updateStep2Field: (fieldName: keyof Step2Input, value: number) => void;
  updateEpsilonInput: (index: number, value: number) => void;
}

// Helper functions tính toán an toàn
const computeStep1Helper = (input: FanPreset): Step1Output | null => {
  try {
    return calculateStep1(input);
  } catch (error: unknown) {
    console.error('Lỗi tính toán Step 1:', error);
    return null;
  }
};

const computeStep2Helper = (
  step1Input: FanPreset,
  step2Input: Step2Input
): Step2Output | null => {
  try {
    return calculateStep2(step1Input, step2Input);
  } catch (error: unknown) {
    console.error('Lỗi tính toán Step 2:', error);
    return null;
  }
};

const computeStep3Helper = (
  step1Input: FanPreset,
  step2Output: Step2Output | null,
  userEpsilonInputs: number[] = []
): Step3Output | null => {
  if (!step2Output) return null;
  try {
    return calculateStep3(step1Input, step2Output, userEpsilonInputs);
  } catch (error: unknown) {
    console.error('Lỗi tính toán Step 3:', error);
    return null;
  }
};

// Giá trị khởi tạo mặc định
const initialPreset = fanPresets[0];
const initialStep2Input: Step2Input = {
  delta: 1.65,
  dfDaRatio: 0.56,
  etaI: 0.85,
  mu: 0.925,
};

// Tính sẵn kết quả ban đầu nối tiếp nhau
const initialStep1Output = computeStep1Helper(initialPreset);
const initialStep2Output = computeStep2Helper(initialPreset, initialStep2Input);
const initialStep3Output = computeStep3Helper(initialPreset, initialStep2Output);

export const useFanStore = create<FanStoreState>((set, get) => ({
  // Cấu hình UI
  decimalPlaces: 3,
  setDecimalPlaces: (places) => set({ decimalPlaces: places }),

  // Data State
  step1Input: initialPreset,
  step1Output: initialStep1Output,

  step2Input: initialStep2Input,
  step2Output: initialStep2Output,

  step3Output: initialStep3Output,
  userEpsilonInputs: [],
  updateEpsilonInput: (index: number, value: number) => {
    const { step1Input, step2Output, userEpsilonInputs } = get();
    
    // Copy mảng cũ và gán giá trị mới tại vị trí index
    const newEpsilons = [...userEpsilonInputs];
    newEpsilons[index] = value;

    // Tính toán lại Step 3 với mảng epsilon mới
    const s3Out = computeStep3Helper(step1Input, step2Output, newEpsilons);

    set({
      userEpsilonInputs: newEpsilons,
      step3Output: s3Out,
    });
  },

  // --- ACTIONS ---

  // 1. Khi chọn Preset mới ở Bước 1 -> Tự động tính toán lại cả Step 1, Step 2 và Step 3
  setStep1Input: (input) => {
    const { step2Input } = get();
    const s1Out = computeStep1Helper(input);
    const s2Out = computeStep2Helper(input, step2Input);
    const s3Out = computeStep3Helper(input, s2Out, get().userEpsilonInputs);

    set({
      step1Input: input,
      step1Output: s1Out,
      step2Output: s2Out,
      step3Output: s3Out,
    });
  },

  // 2. Khi thay đổi 1 trường ở Bước 1 -> Cập nhật nối tiếp sang Step 2 và Step 3
  updateStep1Field: (fieldName, value) => {
    const updatedInput = {
      ...get().step1Input,
      [fieldName]: value,
    };
    const { step2Input } = get();

    const s1Out = computeStep1Helper(updatedInput);
    const s2Out = computeStep2Helper(updatedInput, step2Input);
    const s3Out = computeStep3Helper(updatedInput, s2Out, get().userEpsilonInputs);

    set({
      step1Input: updatedInput,
      step1Output: s1Out,
      step2Output: s2Out,
      step3Output: s3Out,
    });
  },

  // 3. Khi thay đổi 1 trường ở Bước 2 -> Cập nhật Step 2 và tính toán lại Step 3
  updateStep2Field: (fieldName, value) => {
    const updatedStep2 = { ...get().step2Input, [fieldName]: value };
    const { step1Input } = get();

    const s2Out = computeStep2Helper(step1Input, updatedStep2);
    const s3Out = computeStep3Helper(step1Input, s2Out, get().userEpsilonInputs);

    set({
      step2Input: updatedStep2,
      step2Output: s2Out,
      step3Output: s3Out,
    });
  },
}));