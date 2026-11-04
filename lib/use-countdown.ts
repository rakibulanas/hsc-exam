import { useEffect, useState } from "react";

// Counts down to a fixed moment. The time left always comes from the clock,
// not from counting ticks, so it stays right after a refresh or when the
// phone goes to sleep in the middle of the exam.
export function useCountdown(endsAt: number, onTimeUp: () => void) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      const current = Date.now();
      setNow(current);

      if (current >= endsAt) {
        clearInterval(timer);
        onTimeUp();
      }
    }, 250);

    return () => clearInterval(timer);
  }, [endsAt, onTimeUp]);

  return Math.max(0, Math.ceil((endsAt - now) / 1000));
}
