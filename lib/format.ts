const BANGLA_DIGITS = "০১২৩৪৫৬৭৮৯";

// 25 -> ২৫
export function toBangla(value: number | string): string {
  return String(value).replace(/\d/g, (digit) => BANGLA_DIGITS[Number(digit)]);
}

// 90 -> ০১:৩০
export function formatClock(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const clock = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return toBangla(clock);
}

// 90 -> ১ মিনিট ৩০ সেকেন্ড
export function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes === 0) {
    return `${toBangla(seconds)} সেকেন্ড`;
  }

  return `${toBangla(minutes)} মিনিট ${toBangla(seconds)} সেকেন্ড`;
}
