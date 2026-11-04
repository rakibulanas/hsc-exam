"use client";

import dynamic from "next/dynamic";

// The exam reads saved answers from the browser, so it only runs there.
const ExamApp = dynamic(() => import("@/components/ExamApp"), {
  ssr: false,
  loading: () => <main className="page-loading" aria-busy="true" />,
});

export default function Page() {
  return <ExamApp />;
}
