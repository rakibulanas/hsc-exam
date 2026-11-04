import { toBangla } from "@/lib/format";
import type { ExamSession } from "@/lib/types";

type Props = {
  session: ExamSession;
  onJump: (index: number) => void;
};

function getStatus(session: ExamSession, questionId: string) {
  if (session.flagged.includes(questionId)) return "flagged";
  if (session.answers[questionId] !== undefined) return "answered";
  return "empty";
}

export default function QuestionPalette({ session, onJump }: Props) {
  return (
    <div className="palette">
      <div className="palette-grid">
        {session.questions.map((question, index) => (
          <button
            key={question.id}
            data-status={getStatus(session, question.id)}
            data-current={index === session.currentIndex}
            onClick={() => onJump(index)}
            aria-label={`প্রশ্ন ${toBangla(index + 1)}`}
          >
            {toBangla(index + 1)}
          </button>
        ))}
      </div>

      <ul className="palette-legend">
        <li data-status="answered">উত্তর দেওয়া</li>
        <li data-status="flagged">পরে দেখব</li>
        <li data-status="empty">বাকি</li>
      </ul>
    </div>
  );
}
