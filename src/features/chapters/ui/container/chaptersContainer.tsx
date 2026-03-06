import React from "react";
import cls from "./ChaptersContainer.module.scss";
import type { Chapter } from "@/features/bookList/model/types";
import { Button } from "@/shared/ui/Button/Button";
import { Plus } from "@/shared/assets/icons/Plus";

type ChaptersContainerProps = {
  chapters: Chapter[];
  selectedChapterId: number | null;
  onSelectChapter: (id: number) => void;
  onGoTranslate: () => void;
  onAddChapter: () => void
};

export const ChaptersContainer: React.FC<ChaptersContainerProps> = ({
  chapters,
  selectedChapterId,
  onSelectChapter,
  onGoTranslate,
  onAddChapter
}) => {
  return (
    <div className={cls.container}>
      <div className={cls.list}>
        {chapters
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((chapter) => {
            const isSelected = chapter.id === selectedChapterId;

            return (
              <div
                key={chapter.id}
                className={`${cls.row} ${isSelected ? cls.selected : ""}`}
                onClick={() => onSelectChapter(chapter.id)}
                role="button"
                tabIndex={0}
              >
                <span className={cls.title}>
                  {chapter.order} глава
                </span>
              </div>
            );
          })}
        <div className={cls.addChapterButton} onClick={onAddChapter}>
          <Plus/>
        </div>
      </div>

      <div className={cls.footer}>
        <Button onClick={onGoTranslate} disabled={selectedChapterId === null}>
          Перейти
        </Button>
      </div>
    </div>
  );
};
