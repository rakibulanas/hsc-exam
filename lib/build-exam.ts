import { getChapter, type ChapterId, type Topic } from "./exam-config";
import questionFile from "./questions.locked.json";
import type { ExamSession, LockedQuestion } from "./types";

// All the questions of all chapters, with answers encrypted.
export const QUESTION_BANK = questionFile as LockedQuestion[];

// The questions of one chapter.
export function getChapterBank(chapterId: ChapterId): LockedQuestion[] {
  const topicIds = getChapter(chapterId).topics.map((topic) => topic.id);
  return QUESTION_BANK.filter((question) => topicIds.includes(question.topic));
}

// A block is one question, or the 2 questions that share a passage.
type Block = LockedQuestion[];

function shuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function makeBlocks(questions: LockedQuestion[]): Block[] {
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

// Shuffles the answer choices and remembers where each one came from,
// so the encrypted answer can be matched after the exam.
// "i, ii, iii" choices keep their usual order, as in the printed exam.
function shuffleOptions(question: LockedQuestion): LockedQuestion {
  if (question.statements) {
    return question;
  }

  const optionOrder = shuffle(question.options.map((_, index) => index));
  const options = optionOrder.map((index) => question.options[index]);

  return { ...question, options, optionOrder };
}

// Creates a fresh exam: new questions, new order, new option order.
export function createExam(chapterId: ChapterId, minutes: number): ExamSession {
  const blocks = shuffle(getChapter(chapterId).topics.flatMap(pickBlocksForTopic));
  const questions = blocks.flat().map(shuffleOptions);
  const startedAt = Date.now();

  return {
    chapterId,
    questions,
    answers: {},
    flagged: [],
    currentIndex: 0,
    startedAt,
    endsAt: startedAt + minutes * 60 * 1000,
    submittedAt: null,
  };
}
