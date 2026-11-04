import type { TopicId } from "./exam-config";

// What a student sees during the exam. The answer and the explanation
// are encrypted inside "secret" (see scripts/lock-questions.mjs).
export type LockedQuestion = {
  id: string;
  topic: TopicId;
  difficulty: "easy" | "medium" | "hard";
  text: string;
  options: string[];
  secret: string;

  // Only for "i, ii, iii" questions.
  statements?: string[];

  // Only for questions that share a passage. Questions with the same
  // setId always stay together, one after the other.
  setId?: string;
  passage?: string;

  // Set when the options were shuffled: for each shown option,
  // its position in the original list.
  optionOrder?: number[];
};

// A question after the exam, with its answer opened.
export type Question = Omit<LockedQuestion, "secret" | "optionOrder"> & {
  answer: number; // position of the correct option, starting from 0
  explanation: string;
};

// One sitting of the exam. This whole object is saved in the browser,
// so a page refresh does not lose the exam. It holds no plain answers.
export type ExamSession = {
  questions: LockedQuestion[];
  answers: Record<string, number>; // question id -> chosen option
  flagged: string[]; // ids marked "পরে দেখব"
  currentIndex: number;
  startedAt: number;
  endsAt: number;
  submittedAt: number | null;
};
