import { useState } from "react";
import { getAnswerState, type AnswerState } from "@/lib/score";
import type { ExamSession } from "@/lib/types";
import AnswerCard from "./AnswerCard";

type Filter = "all" | AnswerState;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "সব" },
  { id: "wrong", label: "ভুল" },
  { id: "skipped", label: "বাদ" },
  { id: "correct", label: "সঠিক" },
];

const STATE_LABELS: Record<AnswerState, string> = {
  correct: "সঠিক",
  wrong: "ভুল",
  skipped: "উত্তর দাওনি",
};

export default function ReviewList({ session }: { session: ExamSession }) {
  const [filter, setFilter] = useState<Filter>("all");

  const rows = session.questions
    .map((question, index) => ({
      question,
      number: index + 1,
      state: getAnswerState(question, session.answers),
    }))
    .filter((row) => filter === "all" || row.state === filter);

  return (
    <section>
      <h2 className="section-title">উত্তর মিলিয়ে দেখো</h2>

      <div className="filters">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            data-active={filter === item.id}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {rows.length === 0 && <p className="empty-note">এই তালিকায় কোনো প্রশ্ন নেই।</p>}

      {rows.map(({ question, number, state }) => (
        <AnswerCard
          key={question.id}
          question={question}
          number={number}
          label={STATE_LABELS[state]}
          labelState={state}
          chosen={session.answers[question.id]}
        />
      ))}
    </section>
  );
}
