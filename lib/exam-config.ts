// Every setting of the exam lives here.
// Change a number here and the whole app follows.

export type TopicId = "concept" | "conversion" | "arithmetic" | "signed" | "codes" | "history";

export type Topic = {
  id: TopicId;
  name: string;
  detail: string;
  questionCount: number; // how many questions this topic gets in one exam
};

export const EXAM = {
  title: "সংখ্যা পদ্ধতি",
  subject: "এইচএসসি আইসিটি · তৃতীয় অধ্যায়",
  minutes: 25, // the time chosen at the start unless the student picks another
  marksPerQuestion: 1,
  passMarks: 8,
};

// The times a student can pick on the start page, in minutes.
export const MINUTE_CHOICES = [10, 15, 20, 25, 30, 40];

export const QUESTION_BANK_SIZE = 136;

// How the 25 questions are shared between the topics.
// The counts must add up to the total number of questions.
export const TOPICS: Topic[] = [
  {
    id: "concept",
    name: "সংখ্যা পদ্ধতির ধারণা",
    detail: "ভিত্তি, অঙ্ক, পজিশনাল ও নন-পজিশনাল",
    questionCount: 3,
  },
  {
    id: "conversion",
    name: "সংখ্যা রূপান্তর",
    detail: "বাইনারি, অক্টাল, ডেসিমেল, হেক্সাডেসিমেল",
    questionCount: 8,
  },
  {
    id: "arithmetic",
    name: "বাইনারি যোগ-বিয়োগ",
    detail: "যোগ, বিয়োগ ও বিভিন্ন বেসের গণনা",
    questionCount: 3,
  },
  {
    id: "signed",
    name: "চিহ্নযুক্ত সংখ্যা",
    detail: "সাইন বিট, ১ ও ২-এর পরিপূরক",
    questionCount: 4,
  },
  {
    id: "codes",
    name: "কোড",
    detail: "BCD, ASCII, EBCDIC, ইউনিকোড",
    questionCount: 3,
  },
  {
    id: "history",
    name: "ইতিহাস ও মৌলিক তথ্য",
    detail: "সাল, উদ্ভাবক, পূর্ণরূপ, বিট সংখ্যা",
    questionCount: 4,
  },
];

export const TOTAL_QUESTIONS = TOPICS.reduce(
  (total, topic) => total + topic.questionCount,
  0,
);

export const TOTAL_MARKS = TOTAL_QUESTIONS * EXAM.marksPerQuestion;

// The timer changes colour when this many seconds are left.
export const WARNING_SECONDS = 5 * 60;
export const DANGER_SECONDS = 60;

// Grade table: the first row whose "from" percent is reached is the grade.
export const GRADES = [
  { from: 80, name: "A+" },
  { from: 70, name: "A" },
  { from: 60, name: "A-" },
  { from: 50, name: "B" },
  { from: 40, name: "C" },
  { from: 33, name: "D" },
  { from: 0, name: "F" },
];

export const OPTION_LABELS = ["ক", "খ", "গ", "ঘ"];
