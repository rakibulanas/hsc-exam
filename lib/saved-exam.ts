import type { ExamSession } from "./types";

// Keeps the running exam in the browser, so a refresh or a closed tab
// does not lose the answers. Storage can be blocked (private mode),
// so the exam must still work when these calls fail.

const STORAGE_KEY = "hsc-number-exam-v1";

// Set after the first finished exam. It opens the page with all the answers.
const FINISHED_KEY = "hsc-number-exam-finished";

export function hasFinishedExam(): boolean {
  try {
    return window.localStorage.getItem(FINISHED_KEY) === "yes";
  } catch {
    return false;
  }
}

export function markExamFinished() {
  try {
    window.localStorage.setItem(FINISHED_KEY, "yes");
  } catch {
    // Nothing to do: the button still shows on the result page.
  }
}

export function loadExam(): ExamSession | null {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as ExamSession) : null;
  } catch {
    return null;
  }
}

export function saveExam(session: ExamSession) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Nothing to do: the exam simply will not survive a refresh.
  }
}

export function clearExam() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to do.
  }
}
