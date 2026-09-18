import { create } from 'zustand';
import type { FanPreset } from '../models/FanPreset';
import { calculateStep1, type Step1Output } from '../math/step1';
import { fanPresets } from '../config/fanPresets';
import type { Step2Input } from '../models/Step2';
import { calculateStep2, type Step2Output } from '../math/step2';
import { calculateStep3, type Step3Output } from '../math/step3';
import type { Step4Input, Step4Output } from '../models/Step4';
import { calculateStep4, defaultStep4Input } from '../math/step4';

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
  userDeltaGamma1IInputs: number[];

  // Step 4
  step4Input: Step4Input;
  step4Output: Step4Output | null; // 🟢 Bổ sung trường này
  setStep4Input: (input: Step4Input) => void;

  // Actions
  setStep1Input: (input: FanPreset) => void;
  updateStep1Field: (fieldName: keyof FanPreset, value: number) => void;
  updateStep2Field: (fieldName: keyof Step2Input, value: number) => void;
  updateEpsilonInput: (index: number, value: number) => void;
  updateDeltaGamma1IInput: (index: number, value: number) => void;

  updateStep4Field: (field: keyof Step4Input, value: string | number) => void;
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
  userEpsilonInputs: number[] = [],
  userDeltaGamma1IInputs: number[] = []
): Step3Output | null => {
  if (!step2Output) return null;
  try {
    return calculateStep3(step1Input, step2Output, userEpsilonInputs, userDeltaGamma1IInputs);
  } catch (error: unknown) {
    console.error('Lỗi tính toán Step 3:', error);
    return null;
  }
};

// 🟢 Bổ sung helper tính toán Step 4
const computeStep4Helper = (
  step4Input: Step4Input,
  step3Output: Step3Output | null,
  step2Output: Step2Output | null
): Step4Output | null => {
  if (!step3Output) return null;
  try {
    return calculateStep4(step4Input, step3Output, step2Output);
  } catch (error: unknown) {
    console.error('Lỗi tính toán Step 4:', error);
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
const initialStep4Output = computeStep4Helper(defaultStep4Input, initialStep3Output, initialStep2Output);

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
    const { step1Input, step2Output, userEpsilonInputs, userDeltaGamma1IInputs, step4Input } = get();
    
    const newEpsilons = [...userEpsilonInputs];
    newEpsilons[index] = value;

    const s3Out = computeStep3Helper(step1Input, step2Output, newEpsilons, userDeltaGamma1IInputs);
    const s4Out = computeStep4Helper(step4Input, s3Out, step2Output);

    set({
      userEpsilonInputs: newEpsilons,
      step3Output: s3Out,
      step4Output: s4Out,
    });
  },
  
  userDeltaGamma1IInputs: [],
  updateDeltaGamma1IInput: (index: number, value: number) => {
    const { step1Input, step2Output, userEpsilonInputs, userDeltaGamma1IInputs, step4Input } = get();

    const newDeltaGamma1I = [...userDeltaGamma1IInputs];
    newDeltaGamma1I[index] = value;

    const s3Out = computeStep3Helper(step1Input, step2Output, userEpsilonInputs, newDeltaGamma1I);
    const s4Out = computeStep4Helper(step4Input, s3Out, step2Output);

    set({
      userDeltaGamma1IInputs: newDeltaGamma1I,
      step3Output: s3Out,
      step4Output: s4Out,
    });
  },

  // Step 4 State
  step4Input: defaultStep4Input,
  step4Output: initialStep4Output,

  setStep4Input: (input) => {
    const { step3Output, step2Output } = get();
    const s4Out = computeStep4Helper(input, step3Output, step2Output);
    set({
      step4Input: input,
      step4Output: s4Out,
    });
  },

  updateStep4Field: (field, value) => {
    const { step3Output, step2Output } = get();
    const updatedStep4Input = {
      ...get().step4Input,
      [field]: value,
    };
    const s4Out = computeStep4Helper(updatedStep4Input, step3Output, step2Output);

    set({
      step4Input: updatedStep4Input,
      step4Output: s4Out,
    });
  },

  // --- ACTIONS TÍNH NỐI TIẾP ---

  // 1. Khi chọn Preset mới ở Bước 1
  setStep1Input: (input) => {
    const { step2Input, step4Input } = get();
    const s1Out = computeStep1Helper(input);
    const s2Out = computeStep2Helper(input, step2Input);
    const s3Out = computeStep3Helper(input, s2Out, get().userEpsilonInputs, get().userDeltaGamma1IInputs);
    const s4Out = computeStep4Helper(step4Input, s3Out, s2Out);

    set({
      step1Input: input,
      step1Output: s1Out,
      step2Output: s2Out,
      step3Output: s3Out,
      step4Output: s4Out,
    });
  },

  // 2. Khi thay đổi 1 trường ở Bước 1
  updateStep1Field: (fieldName, value) => {
    const updatedInput = {
      ...get().step1Input,
      [fieldName]: value,
    };
    const { step2Input, step4Input } = get();

    const s1Out = computeStep1Helper(updatedInput);
    const s2Out = computeStep2Helper(updatedInput, step2Input);
    const s3Out = computeStep3Helper(updatedInput, s2Out, get().userEpsilonInputs, get().userDeltaGamma1IInputs);
    const s4Out = computeStep4Helper(step4Input, s3Out, s2Out);

    set({
      step1Input: updatedInput,
      step1Output: s1Out,
      step2Output: s2Out,
      step3Output: s3Out,
      step4Output: s4Out,
    });
  },

  // 3. Khi thay đổi 1 trường ở Bước 2
  updateStep2Field: (fieldName, value) => {
    const updatedStep2 = { ...get().step2Input, [fieldName]: value };
    const { step1Input, step4Input } = get();

    const s2Out = computeStep2Helper(step1Input, updatedStep2);
    const s3Out = computeStep3Helper(step1Input, s2Out, get().userEpsilonInputs, get().userDeltaGamma1IInputs);
    const s4Out = computeStep4Helper(step4Input, s3Out, s2Out);

    set({
      step2Input: updatedStep2,
      step2Output: s2Out,
      step3Output: s3Out,
      step4Output: s4Out,
    });
  },
}));