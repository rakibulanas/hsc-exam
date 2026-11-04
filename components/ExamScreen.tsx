import { useState } from "react";
import { toBangla } from "@/lib/format";
import type { ExamSession } from "@/lib/types";
import QuestionCard from "./QuestionCard";
import QuestionPalette from "./QuestionPalette";
import SubmitDialog from "./SubmitDialog";
import TimerBar from "./TimerBar";

type Props = {
  session: ExamSession;
  onChange: (session: ExamSession) => void;
  onSubmit: () => void;
};

export default function ExamScreen({ session, onChange, onSubmit }: Props) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const { questions, answers, flagged, currentIndex } = session;
  const question = questions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;

  const answeredCount = Object.keys(answers).length;
  const unanswered = questions.length - answeredCount;

  function goTo(index: number) {
    onChange({ ...session, currentIndex: index });
    setPaletteOpen(false);
    window.scrollTo(0, 0);
  }

  function chooseOption(option: number) {
    onChange({ ...session, answers: { ...answers, [question.id]: option } });
  }

  function clearAnswer() {
    const remaining = { ...answers };
    delete remaining[question.id];
    onChange({ ...session, answers: remaining });
  }

  function toggleFlag() {
    const isFlagged = flagged.includes(question.id);
    const nextFlagged = isFlagged
      ? flagged.filter((id) => id !== question.id)
      : [...flagged, question.id];

    onChange({ ...session, flagged: nextFlagged });
  }

  return (
    <div className="exam">
      <TimerBar
        endsAt={session.endsAt}
        totalSeconds={(session.endsAt - session.startedAt) / 1000}
        answered={answeredCount}
        total={questions.length}
        onTimeUp={onSubmit}
        onSubmitClick={() => setConfirming(true)}
      />

      <div className="exam-layout">
        <main>
          <QuestionCard
            key={question.id}
            question={question}
            number={currentIndex + 1}
            chosen={answers[question.id]}
            flagged={flagged.includes(question.id)}
            onChoose={chooseOption}
            onClear={clearAnswer}
            onToggleFlag={toggleFlag}
          />
        </main>

        <aside className="card palette-side">
          <h2>প্রশ্নপত্র</h2>
          <QuestionPalette session={session} onJump={goTo} />
        </aside>
      </div>

      <nav className="exam-nav" aria-label="প্রশ্নের মধ্যে যাওয়া">
        <button className="button" disabled={isFirst} onClick={() => goTo(currentIndex - 1)}>
          আগের
        </button>

        <button className="palette-toggle" onClick={() => setPaletteOpen(true)}>
          {toBangla(currentIndex + 1)} / {toBangla(questions.length)}
        </button>

        {isLast ? (
          <button className="button button-primary" onClick={() => setConfirming(true)}>
            জমা দাও
          </button>
        ) : (
          <button className="button button-primary" onClick={() => goTo(currentIndex + 1)}>
            পরের
          </button>
        )}
      </nav>

      {paletteOpen && (
        <div className="sheet-backdrop" onClick={() => setPaletteOpen(false)}>
          <div className="sheet" onClick={(event) => event.stopPropagation()}>
            <div className="sheet-top">
              <h2>প্রশ্নপত্র</h2>
              <button className="text-button" onClick={() => setPaletteOpen(false)}>
                বন্ধ করো
              </button>
            </div>
            <QuestionPalette session={session} onJump={goTo} />
          </div>
        </div>
      )}

      {confirming && (
        <SubmitDialog
          unanswered={unanswered}
          flagged={flagged.length}
          onCancel={() => setConfirming(false)}
          onConfirm={onSubmit}
        />
      )}
    </div>
  );
}
