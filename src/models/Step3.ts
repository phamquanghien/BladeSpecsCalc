export interface RingData {
  ringIndex: number; // Số thứ tự vành khăn
  radius: number;    // Bán kính r_i
  u: number;         // Vận tốc u_i
  // Thêm các biến số khác biến thiên theo từng vành khăn ở đây...
}

export interface Step3Output {
  commonValue?: number; // Dành cho các công thức chỉ tính 1 giá trị duy nhất
  rings: RingData[];    // Mảng chứa các giá trị tính toán theo từng vành khăn
}