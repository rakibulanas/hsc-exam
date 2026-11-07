import { EXAM, getChapter, GRADES, TOTAL_MARKS, type TopicId } from "./exam-config";
import type { ExamSession, Question } from "./types";

export type AnswerState = "correct" | "wrong" | "skipped";

export type TopicScore = {
  id: TopicId;
  name: string;
  correct: number;
  total: number;
};

export function getAnswerState(
  question: Question,
  answers: ExamSession["answers"],
): AnswerState {
  const chosen = answers[question.id];

  if (chosen === undefined) {
    return "skipped";
  }

  return chosen === question.answer ? "correct" : "wrong";
}

// questions: the exam questions with their answers opened (see unlock.ts).
export function getResult(session: ExamSession, questions: Question[]) {
  const states = questions.map((question) =>
    getAnswerState(question, session.answers),
  );

  const correct = states.filter((state) => state === "correct").length;
  const wrong = states.filter((state) => state === "wrong").length;
  const skipped = states.filter((state) => state === "skipped").length;

  const marks = correct * EXAM.marksPerQuestion;
  const percent = Math.round((marks / TOTAL_MARKS) * 100);
  const grade = GRADES.find((row) => percent >= row.from)?.name ?? "F";
  const passed = marks >= EXAM.passMarks;

  const finishedAt = session.submittedAt ?? session.endsAt;
  const secondsUsed = Math.round((finishedAt - session.startedAt) / 1000);

  const topics: TopicScore[] = getChapter(session.chapterId).topics.map((topic) => {
    const topicQuestions = questions.filter((q) => q.topic === topic.id);

    return {
      id: topic.id,
      name: topic.name,
      total: topicQuestions.length,
      correct: topicQuestions.filter(
        (q) => getAnswerState(q, session.answers) === "correct",
      ).length,
    };
  });

  return { correct, wrong, skipped, marks, percent, grade, passed, secondsUsed, topics };
}
