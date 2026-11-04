import { EXAM, QUESTION_BANK_SIZE, TOPICS, TOTAL_MARKS, TOTAL_QUESTIONS } from "@/lib/exam-config";
import { toBangla } from "@/lib/format";

const RULES = [
  "সময় শুরু হবে বোতামে চাপ দেওয়ার সঙ্গে সঙ্গে।",
  "প্রতিটি প্রশ্নের মান ১, ভুলের জন্য নম্বর কাটা যাবে না।",
  "সময় শেষ হলে উত্তরপত্র নিজে থেকেই জমা হবে।",
  "পেজ রিফ্রেশ হলেও উত্তর ও সময় ঠিক থাকবে।",
];

type Props = {
  canSeeAll: boolean;
  onStart: () => void;
  onSeeAll: () => void;
};

export default function StartScreen({ canSeeAll, onStart, onSeeAll }: Props) {
  const facts = [
    { value: toBangla(TOTAL_QUESTIONS), label: "প্রশ্ন" },
    { value: toBangla(EXAM.minutes), label: "মিনিট" },
    { value: toBangla(TOTAL_MARKS), label: "নম্বর" },
  ];

  return (
    <main className="start">
      <p className="eyebrow">{EXAM.subject}</p>
      <h1>{EXAM.title}</h1>
      <p className="start-lead">
        {toBangla(QUESTION_BANK_SIZE)}টি প্রশ্নের ব্যাংক থেকে প্রতিবার নতুন সেট আসবে,
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

      <button className="button button-primary button-wide" onClick={onStart}>
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
          {TOPICS.map((topic) => (
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
