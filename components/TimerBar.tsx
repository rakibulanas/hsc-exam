import { DANGER_SECONDS, WARNING_SECONDS } from "@/lib/exam-config";
import { formatClock, toBangla } from "@/lib/format";
import { useCountdown } from "@/lib/use-countdown";

type Props = {
  endsAt: number;
  totalSeconds: number; // the full length of this exam
  answered: number;
  total: number;
  onTimeUp: () => void;
  onSubmitClick: () => void;
};

function getTimerLevel(secondsLeft: number) {
  if (secondsLeft <= DANGER_SECONDS) return "danger";
  if (secondsLeft <= WARNING_SECONDS) return "warning";
  return "normal";
}

export default function TimerBar(props: Props) {
  const { endsAt, totalSeconds, answered, total, onTimeUp, onSubmitClick } = props;
  const secondsLeft = useCountdown(endsAt, onTimeUp);
  const level = getTimerLevel(secondsLeft);
  const percentLeft = (secondsLeft / totalSeconds) * 100;

  return (
    <header className="timer-bar" data-level={level}>
      <div className="timer-row">
        <p className="timer-count">
          <b>{toBangla(answered)}</b>/{toBangla(total)} উত্তর
        </p>

        <div className="timer-clock" role="timer" aria-label="বাকি সময়">
          {formatClock(secondsLeft)}
        </div>

        <button className="button button-small" onClick={onSubmitClick}>
          জমা দাও
        </button>
      </div>

      <div className="time-track" aria-hidden="true">
        <span style={{ width: `${percentLeft}%` }} />
      </div>

      {/* Screen readers hear these two moments, not every second. */}
      <p className="sr-only" aria-live="polite">
        {level === "warning" && "পাঁচ মিনিট বা তার কম সময় বাকি"}
        {level === "danger" && "এক মিনিট বা তার কম সময় বাকি"}
      </p>
    </header>
  );
}
