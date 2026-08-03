/**
 * Định dạng số hiển thị trên UI với số chữ số thập phân mong muốn
 * @param val Giá trị số cần hiển thị
 * @param decimals Số chữ số thập phân (mặc định 3)
 */
export const formatNumber = (
  val: number | undefined | null,
  decimals: number = 3
): string => {
  if (val === undefined || val === null || isNaN(val)) return '0';

  // Giới hạn an toàn từ 0 đến 10 chữ số thập phân
  const safeDecimals = Math.min(Math.max(Math.floor(decimals || 0), 0), 10);

  return val.toLocaleString('en-US', {
    minimumFractionDigits: safeDecimals,
    maximumFractionDigits: safeDecimals,
  });
};