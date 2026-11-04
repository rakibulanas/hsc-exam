import { EXAM, TOPICS, type Topic } from "./exam-config";
import questionFile from "./questions.json";
import type { ExamSession, Question } from "./types";

// All the questions come from this one file.
export const QUESTION_BANK = questionFile as Question[];

// A block is one question, or the 2 questions that share a passage.
type Block = Question[];

function shuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function makeBlocks(questions: Question[]): Block[] {
  const blocks: Block[] = [];
  const sets: Record<string, Block> = {};

  for (const question of questions) {
    if (!question.setId) {
      blocks.push([question]);
    } else if (sets[question.setId]) {
      sets[question.setId].push(question);
    } else {
      sets[question.setId] = [question];
      blocks.push(sets[question.setId]);
    }
  }

  return blocks;
}

// Picks random blocks of a topic until its question count is reached.
function pickBlocksForTopic(topic: Topic): Block[] {
  const topicQuestions = QUESTION_BANK.filter((q) => q.topic === topic.id);
  const picked: Block[] = [];
  let questionsLeft = topic.questionCount;

  for (const block of shuffle(makeBlocks(topicQuestions))) {
    if (block.length <= questionsLeft) {
      picked.push(block);
      questionsLeft -= block.length;
    }
  }

  return picked;
}

// Shuffles the answer choices and moves "answer" along with them.
// "i, ii, iii" choices keep their usual order, as in the printed exam.
function shuffleOptions(question: Question): Question {
  if (question.statements) {
    return question;
  }

  const correctOption = question.options[question.answer];
  const options = shuffle(question.options);

  return { ...question, options, answer: options.indexOf(correctOption) };
}

// Creates a fresh exam: new questions, new order, new option order.
export function createExam(): ExamSession {
  const blocks = shuffle(TOPICS.flatMap(pickBlocksForTopic));
  const questions = blocks.flat().map(shuffleOptions);
  const startedAt = Date.now();

  return {
    questions,
    answers: {},
    flagged: [],
    currentIndex: 0,
    startedAt,
    endsAt: startedAt + EXAM.minutes * 60 * 1000,
    submittedAt: null,
  };
}
