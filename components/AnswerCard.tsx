import { OPTION_LABELS } from "@/lib/exam-config";
import { toBangla } from "@/lib/format";
import type { Question } from "@/lib/types";
import MathText from "./MathText";

type Props = {
  question: Question;
  number: number;
  label: string; // the small tag at the top right
  labelState?: string; // colours the tag: "correct", "wrong" or "skipped"
  chosen?: number; // the student's answer, when there is one
};

const STATEMENT_LABELS = ["i", "ii", "iii"];

// One question with its correct answer and explanation.
export default function AnswerCard({ question, number, label, labelState, chosen }: Props) {
  return (
    <article className="card review-card">
      <div className="question-top">
        <span className="question-number">প্রশ্ন {toBangla(number)}</span>
        <span className="state-tag" data-state={labelState}>
          {label}
        </span>
      </div>

      {question.passage && (
        <p className="passage">
          <MathText text={question.passage} />
        </p>
      )}

      <h3>
        <MathText text={question.text} />
      </h3>

      {question.statements && (
        <ol className="statements">
          {question.statements.map((statement, index) => (
            <li key={statement}>
              <span>{STATEMENT_LABELS[index]}.</span>
              <MathText text={statement} />
            </li>
          ))}
        </ol>
      )}

      <ul className="review-options">
        {question.options.map((option, index) => {
          const isCorrect = index === question.answer;
          const isChosen = index === chosen;

          return (
            <li key={option} data-correct={isCorrect} data-wrong-choice={isChosen && !isCorrect}>
              <span className="option-letter">{OPTION_LABELS[index]}</span>
              <span>
                <MathText text={option} />
              </span>
              {isChosen && <em>তোমার উত্তর</em>}
            </li>
          );
        })}
      </ul>

      <div className="explanation">
        <h4>ব্যাখ্যা</h4>
        <p>
          <MathText text={question.explanation} />
        </p>
      </div>
    </article>
  );
}
