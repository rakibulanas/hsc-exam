// Every setting of the exam lives here.
// Change a number here and the whole app follows.

export type ChapterId = "ch3" | "ch4";

export type TopicId =
  | "concept"
  | "conversion"
  | "arithmetic"
  | "signed"
  | "codes"
  | "history"
  | "website"
  | "address"
  | "structure"
  | "html"
  | "format"
  | "media"
  | "tables";

export type Topic = {
  id: TopicId;
  name: string;
  detail: string;
  questionCount: number; // how many questions this topic gets in one exam
};

export type Chapter = {
  id: ChapterId;
  title: string;
  subject: string;
  topics: Topic[];
};

export const EXAM = {
  minutes: 25, // the time chosen at the start unless the student picks another
  marksPerQuestion: 1,
  passMarks: 8,
};

// The times a student can pick on the start page, in minutes.
export const MINUTE_CHOICES = [10, 15, 20, 25, 30, 40];

// How the 25 questions are shared between the topics.
// The counts of each chapter must add up to the same total.
const NUMBER_SYSTEM_TOPICS: Topic[] = [
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

// The counts follow how often each part came in the board questions we counted.
const WEB_DESIGN_TOPICS: Topic[] = [
  {
    id: "website",
    name: "ওয়েব ও ওয়েবসাইট",
    detail: "WWW, ব্রাউজার, সার্চ ইঞ্জিন, স্ট্যাটিক ও ডাইনামিক",
    questionCount: 4,
  },
  {
    id: "address",
    name: "IP, ডোমেইন ও URL",
    detail: "ঠিকানা বিশ্লেষণ, DNS, প্রটোকল",
    questionCount: 3,
  },
  {
    id: "structure",
    name: "কাঠামো ও পাবলিশিং",
    detail: "চার ধরনের কাঠামো, হোস্টিং, পাবলিশের ধাপ",
    questionCount: 3,
  },
  {
    id: "html",
    name: "HTML-এর গঠন",
    detail: "ট্যাগ, এলিমেন্ট, অ্যাট্রিবিউট, এম্পটি ট্যাগ",
    questionCount: 5,
  },
  {
    id: "format",
    name: "ফরম্যাটিং ও রং",
    detail: "হেডিং, sup ও sub, font, RGB ও হেক্স কোড",
    questionCount: 4,
  },
  {
    id: "media",
    name: "লিংক ও ছবি",
    detail: "a, href, target, img, src, alt",
    questionCount: 3,
  },
  {
    id: "tables",
    name: "লিস্ট ও টেবিল",
    detail: "ol, ul, start, colspan, rowspan, cellpadding",
    questionCount: 3,
  },
];

export const CHAPTERS: Chapter[] = [
  {
    id: "ch3",
    title: "সংখ্যা পদ্ধতি",
    subject: "এইচএসসি আইসিটি · তৃতীয় অধ্যায়",
    topics: NUMBER_SYSTEM_TOPICS,
  },
  {
    id: "ch4",
    title: "ওয়েব ডিজাইন ও HTML",
    subject: "এইচএসসি আইসিটি · চতুর্থ অধ্যায়",
    topics: WEB_DESIGN_TOPICS,
  },
];

// An exam saved before chapters existed has no id, so it falls back to chapter 3.
export function getChapter(id: ChapterId): Chapter {
  return CHAPTERS.find((chapter) => chapter.id === id) ?? CHAPTERS[0];
}

// All topics of all chapters, to find a topic's name from its id.
export const TOPICS = CHAPTERS.flatMap((chapter) => chapter.topics);

export const TOTAL_QUESTIONS = CHAPTERS[0].topics.reduce(
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
