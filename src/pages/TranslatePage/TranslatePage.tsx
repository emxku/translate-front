import { useParams } from "react-router-dom";
import cls from "./TranslatePage.module.scss";
import { useTranslations } from "@/features/bookList";

export const TranslatePage = () => {
  const { translationId, chapterId } = useParams<{ translationId: string; chapterId: string }>();
  const { translations } = useTranslations();

  const tId = Number(translationId);
  const cId = Number(chapterId);

  const translation = translations.find((t) => t.id === tId);
  const chapter = translation?.chapters.find((c) => c.id === cId);

  if (!translation || !chapter) {
    return <div className={cls.wrapper}>Перевод или глава не найдены</div>;
  }

  return (
    <div className={cls.wrapper}>
      <h1 className={cls.title}>{translation.title}</h1>
      <h2 className={cls.subtitle}>
        Глава {chapter.order}: {chapter.title}
      </h2>

      {/* позже тут редактор будет 
                            ебани рот 
      сколько 
              тут 
        работы 
              предстоит 
                          я ебал */}
    </div>
  )
}