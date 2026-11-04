import { useMemo } from "react";
import { EXAM, TOTAL_MARKS } from "@/lib/exam-config";
import { formatDuration, toBangla } from "@/lib/format";
import { getResult } from "@/lib/score";
import type { ExamSession } from "@/lib/types";
import { unlockQuestion } from "@/lib/unlock";
import ReviewList from "./ReviewList";

type Props = {
  session: ExamSession;
  onRestart: () => void;
  onSeeAll: () => void;
};

export default function ResultScreen({ session, onRestart, onSeeAll }: Props) {
  // The answers are opened only now, after the exam is over.
  const questions = useMemo(() => session.questions.map(unlockQuestion), [session.questions]);
  const result = getResult(session, questions);

  const stats = [
    { value: toBangla(result.correct), label: "সঠিক" },
    { value: toBangla(result.wrong), label: "ভুল" },
    { value: toBangla(result.skipped), label: "বাদ" },
  ];

  return (
    <main className="result">
      <section className="card score-card">
        <p className="eyebrow">{EXAM.title} · ফলাফল</p>
        <p className="score">
          {toBangla(result.marks)}
          <span>/{toBangla(TOTAL_MARKS)}</span>
        </p>
        <p className="score-note">
          <b data-passed={result.passed}>গ্রেড {result.grade}</b>
          {result.passed ? " · পাস" : ` · পাস করতে ${toBangla(EXAM.passMarks)} নম্বর লাগে`}
        </p>
        <p className="time-used">সময় লেগেছে {formatDuration(result.secondsUsed)}</p>

        <dl className="facts facts-plain">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dd>{stat.value}</dd>
              <dt>{stat.label}</dt>
            </div>
          ))}
        </dl>

        <button className="button button-primary button-wide" onClick={onRestart}>
          নতুন সেটে আবার দাও
        </button>

        <button className="button button-wide" onClick={onSeeAll}>
          সব প্রশ্ন ও উত্তর দেখো
        </button>
      </section>

      <section className="card">
        <h2>কোন অংশে কেমন হলো</h2>
        <ul className="topic-scores">
          {result.topics.map((topic) => (
            <li key={topic.id}>
              <div>
                <span>{topic.name}</span>
                <b>
                  {toBangla(topic.correct)}/{toBangla(topic.total)}
                </b>
              </div>
              <div className="score-track" aria-hidden="true">
                <span style={{ width: `${(topic.correct / topic.total) * 100}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <ReviewList session={session} questions={questions} />
    </main>
  );
}
