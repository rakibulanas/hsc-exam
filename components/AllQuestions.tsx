import { useMemo, useState } from "react";
import { getChapterBank } from "@/lib/build-exam";
import { getChapter, TOPICS, type ChapterId, type TopicId } from "@/lib/exam-config";
import { toBangla } from "@/lib/format";
import { unlockQuestion } from "@/lib/unlock";
import AnswerCard from "./AnswerCard";

type Filter = "all" | TopicId;

function getTopicName(topicId: TopicId) {
  return TOPICS.find((topic) => topic.id === topicId)?.name ?? "";
}

type Props = {
  chapterId: ChapterId;
  onBack: () => void;
};

// Every question of one chapter with its answer, on one page.
// It opens only after the first exam of that chapter is finished.
export default function AllQuestions({ chapterId, onBack }: Props) {
  const [filter, setFilter] = useState<Filter>("all");

  const bank = useMemo(() => getChapterBank(chapterId).map(unlockQuestion), [chapterId]);
  const questions = bank.filter(
    (question) => filter === "all" || question.topic === filter,
  );

  function chooseFilter(next: Filter) {
    setFilter(next);
    window.scrollTo(0, 0);
  }

  return (
    <main className="result">
      <div className="all-top">
        <button className="text-button" onClick={onBack}>
          ফিরে যাও
        </button>
        <h1>সব প্রশ্ন ও উত্তর</h1>
        <p>মোট {toBangla(questions.length)}টি প্রশ্ন</p>
      </div>

      <div className="filters filters-sticky">
        <button data-active={filter === "all"} onClick={() => chooseFilter("all")}>
          সব
        </button>

        {getChapter(chapterId).topics.map((topic) => (
          <button
            key={topic.id}
            data-active={filter === topic.id}
            onClick={() => chooseFilter(topic.id)}
          >
            {topic.name}
          </button>
        ))}
      </div>

      <section>
        {questions.map((question, index) => (
          <AnswerCard
            key={question.id}
            question={question}
            number={index + 1}
            label={getTopicName(question.topic)}
          />
        ))}
      </section>
    </main>
  );
}
