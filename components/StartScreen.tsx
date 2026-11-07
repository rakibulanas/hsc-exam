import { useState } from "react";
import { getChapterBank } from "@/lib/build-exam";
import {
  CHAPTERS,
  EXAM,
  getChapter,
  MINUTE_CHOICES,
  TOTAL_MARKS,
  TOTAL_QUESTIONS,
  type ChapterId,
} from "@/lib/exam-config";
import { toBangla } from "@/lib/format";

const RULES = [
  "সময় শুরু হবে বোতামে চাপ দেওয়ার সঙ্গে সঙ্গে।",
  "প্রতিটি প্রশ্নের মান ১, ভুলের জন্য নম্বর কাটা যাবে না।",
  "সময় শেষ হলে উত্তরপত্র নিজে থেকেই জমা হবে।",
  "পেজ রিফ্রেশ হলেও উত্তর ও সময় ঠিক থাকবে।",
];

type Props = {
  chapterId: ChapterId;
  canSeeAll: boolean;
  onChooseChapter: (chapterId: ChapterId) => void;
  onStart: (minutes: number) => void;
  onSeeAll: () => void;
};

export default function StartScreen(props: Props) {
  const { chapterId, canSeeAll, onChooseChapter, onStart, onSeeAll } = props;
  const [minutes, setMinutes] = useState(EXAM.minutes);
  const chapter = getChapter(chapterId);

  const facts = [
    { value: toBangla(TOTAL_QUESTIONS), label: "প্রশ্ন" },
    { value: toBangla(minutes), label: "মিনিট" },
    { value: toBangla(TOTAL_MARKS), label: "নম্বর" },
  ];

  return (
    <main className="start">
      <fieldset className="chapter-picker">
        <legend className="sr-only">অধ্যায় বেছে নাও</legend>
        {CHAPTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={item.id === chapterId}
            onClick={() => onChooseChapter(item.id)}
          >
            {item.title}
          </button>
        ))}
      </fieldset>

      <p className="eyebrow">{chapter.subject}</p>
      <h1>{chapter.title}</h1>
      <p className="start-lead">
        {toBangla(getChapterBank(chapterId).length)}টি প্রশ্নের ব্যাংক থেকে প্রতিবার নতুন সেট আসবে,
        বোর্ড পরীক্ষার ধরনে।
      </p>

      <dl className="facts">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dd>{fact.value}</dd>
            <dt>{fact.label}</dt>
          </div>
        ))}
      </dl>

      <fieldset className="minute-picker">
        <legend>কত মিনিটের পরীক্ষা দেবে?</legend>
        <div>
          {MINUTE_CHOICES.map((choice) => (
            <button
              key={choice}
              type="button"
              aria-pressed={minutes === choice}
              onClick={() => setMinutes(choice)}
            >
              {toBangla(choice)}
            </button>
          ))}
        </div>
      </fieldset>

      <button className="button button-primary button-wide" onClick={() => onStart(minutes)}>
        পরীক্ষা শুরু করো
      </button>

      {canSeeAll ? (
        <button className="button button-wide" onClick={onSeeAll}>
          সব প্রশ্ন ও উত্তর দেখো
        </button>
      ) : (
        <p className="unlock-note">
          প্রথম পরীক্ষা শেষ হলে সব প্রশ্ন উত্তরসহ দেখার সুযোগ খুলে যাবে।
        </p>
      )}

      <section className="card">
        <h2>কোন অংশ থেকে কত প্রশ্ন</h2>
        <ul className="topic-list">
          {chapter.topics.map((topic) => (
            <li key={topic.id}>
              <div>
                <strong>{topic.name}</strong>
                <span>{topic.detail}</span>
              </div>
              <b>{toBangla(topic.questionCount)}</b>
            </li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2>নিয়ম</h2>
        <ul className="rule-list">
          {RULES.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
