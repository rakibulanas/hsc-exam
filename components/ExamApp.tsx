"use client";

import { useCallback, useEffect, useState } from "react";
import { createExam } from "@/lib/build-exam";
import {
  clearExam,
  hasFinishedExam,
  loadExam,
  markExamFinished,
  saveExam,
} from "@/lib/saved-exam";
import type { ExamSession } from "@/lib/types";
import AllQuestions from "./AllQuestions";
import ExamScreen from "./ExamScreen";
import ResultScreen from "./ResultScreen";
import StartScreen from "./StartScreen";

// Brings back a saved exam. If its time ran out while the page
// was closed, it counts as submitted at the moment time ended.
function restoreExam(): ExamSession | null {
  const saved = loadExam();

  if (saved && !saved.submittedAt && Date.now() >= saved.endsAt) {
    return { ...saved, submittedAt: saved.endsAt };
  }

  return saved;
}

export default function ExamApp() {
  const [session, setSession] = useState<ExamSession | null>(restoreExam);
  const [showingAll, setShowingAll] = useState(false);

  useEffect(() => {
    if (session) {
      saveExam(session);
    }

    if (session?.submittedAt) {
      markExamFinished();
    }
  }, [session]);

  const submitExam = useCallback(() => {
    setSession((current) => {
      if (!current || current.submittedAt) {
        return current;
      }

      const submittedAt = Math.min(Date.now(), current.endsAt);
      return { ...current, submittedAt };
    });
    window.scrollTo(0, 0);
  }, []);

  function startAgain() {
    clearExam();
    setSession(null);
    window.scrollTo(0, 0);
  }

  function toggleAllQuestions() {
    setShowingAll(!showingAll);
    window.scrollTo(0, 0);
  }

  if (showingAll) {
    return <AllQuestions onBack={toggleAllQuestions} />;
  }

  if (!session) {
    return (
      <StartScreen
        canSeeAll={hasFinishedExam()}
        onStart={(minutes) => setSession(createExam(minutes))}
        onSeeAll={toggleAllQuestions}
      />
    );
  }

  if (session.submittedAt) {
    return (
      <ResultScreen session={session} onRestart={startAgain} onSeeAll={toggleAllQuestions} />
    );
  }

  return <ExamScreen session={session} onChange={setSession} onSubmit={submitExam} />;
}
