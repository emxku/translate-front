import { useNavigate, useParams } from "react-router-dom";
import cls from "./ChaptersPage.module.scss";
import { useState } from "react";
import { useTranslations } from "@/features/bookList";
import { ChaptersHeader } from "@/features/chapters";
import { ChaptersContainer } from "@/features/chapters";

export const ChaptersPage = () => {
  const { translationId } = useParams<{ translationId: string}>();
  const { translations } = useTranslations();

  const [selectedChapterId, setSelectedChapterId] = useState<number | null>(null);


  const navigate = useNavigate();

  const id = Number(translationId);
  const translation = translations.find((t) => t.id === id);

  if (!translationId || Number.isNaN(id)) {
    return <div className={cls.wrapper}>Некорректный translationId в URL</div>
  }

  if(!translation) {
    return <div className={cls.wrapper}>Перевод не найден (id: {id})</div>
  }

  return (
    <div className={cls.wrapper}>
      <ChaptersHeader
        title={translation.title}
        participants={[
          { id: 1, name: "User 1" },
          { id: 2, name: "User 2" }
        ]}
        onAddParticipant={() => console.log("add participant")}
        onFinishTranslation={() => console.log("finish translation")}
        isFinishDisabled={true}
      />
      <ChaptersContainer
        chapters={translation.chapters}
        selectedChapterId={selectedChapterId}
        onSelectChapter={setSelectedChapterId}
        onGoTranslate={() =>
          selectedChapterId &&
          navigate(`/translate/${translation.id}/${selectedChapterId}`)
        }
      />

      {/* ниже будет контейнер глав */}
      {/* <ChaptersContainer ... /> */}
    </div>
  );
};