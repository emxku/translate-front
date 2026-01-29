import { useNavigate, useParams } from "react-router-dom";
import cls from "./ChaptersPage.module.scss";
import { useTranslations } from "@/features/bookList";

export const ChaptersPage = () => {
  const { translationId } = useParams<{ translationId: string}>();
  const { translations } = useTranslations();

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
      <h1 className={cls.title}>{translation.title}</h1>
      <p className={cls.subtitle}>{translation.description}</p>
      <ul className={cls.chaptersList}>
        {translation.chapters
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((chapter) => (
            <li 
              key={chapter.id} 
              className={cls.chapterItem}
              onClick={() => navigate(`/translate/${translation.id}/${chapter.id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " "){
                  navigate(`/translate/${translation.id}/${chapter.id}`)
                }
            }}
            >
              <span className={cls.chapterOrder}>Глава {chapter.order}.</span>{" "}
              <span className={cls.chapterTitle}>{chapter.title}</span>
            </li>
          ))}
      </ul>
      {/* тут дальше доделаю потом */}
    </div>
  );
};