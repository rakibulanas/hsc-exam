import { OPTION_LABELS, TOPICS } from "@/lib/exam-config";
import { toBangla } from "@/lib/format";
import type { Question } from "@/lib/types";
import MathText from "./MathText";

type Props = {
  question: Question;
  number: number;
  chosen: number | undefined;
  flagged: boolean;
  onChoose: (option: number) => void;
  onClear: () => void;
  onToggleFlag: () => void;
};

const STATEMENT_LABELS = ["i", "ii", "iii"];

export default function QuestionCard(props: Props) {
  const { question, number, chosen, flagged, onChoose, onClear, onToggleFlag } = props;
  const topic = TOPICS.find((item) => item.id === question.topic);

  return (
    <article className="card question-card">
      <div className="question-top">
        <span className="question-number">প্রশ্ন {toBangla(number)}</span>
        <span className="question-topic">{topic?.name}</span>
      </div>

      {question.passage && (
        <p className="passage">
          <MathText text={question.passage} />
        </p>
      )}

      <h2 className="question-text">
        <MathText text={question.text} />
      </h2>

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

      <fieldset className="options">
        <legend className="sr-only">উত্তর বেছে নাও</legend>

        {question.options.map((option, index) => (
          <label key={option} className="option" data-chosen={chosen === index}>
            <input
              type="radio"
              name={question.id}
              checked={chosen === index}
              onChange={() => onChoose(index)}
            />
            <span className="option-letter">{OPTION_LABELS[index]}</span>
            <span>
              <MathText text={option} />
            </span>
          </label>
        ))}
      </fieldset>

      <div className="question-actions">
        <button className="text-button" data-active={flagged} onClick={onToggleFlag}>
          {flagged ? "চিহ্ন তুলে নাও" : "পরে দেখব"}
        </button>

        {chosen !== undefined && (
          <button className="text-button" onClick={onClear}>
            উত্তর মুছে দাও
          </button>
        )}
      </div>
    </article>
  );
}
