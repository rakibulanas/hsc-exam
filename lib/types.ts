import type { TopicId } from "./exam-config";

export type Question = {
  id: string;
  topic: TopicId;
  difficulty: "easy" | "medium" | "hard";
  text: string;
  options: string[];
  answer: number; // position of the correct option, starting from 0
  explanation: string;

  // Only for "i, ii, iii" questions.
  statements?: string[];

  // Only for questions that share a passage. Questions with the same
  // setId always stay together, one after the other.
  setId?: string;
  passage?: string;
};

// One sitting of the exam. This whole object is saved in the browser,
// so a page refresh does not lose the exam.
export type ExamSession = {
  questions: Question[];
  answers: Record<string, number>; // question id -> chosen option
  flagged: string[]; // ids marked "পরে দেখব"
  currentIndex: number;
  startedAt: number;
  endsAt: number;
  submittedAt: number | null;
};
