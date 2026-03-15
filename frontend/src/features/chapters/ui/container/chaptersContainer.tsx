import React from "react";
import cls from "./chaptersContainer.module.scss";
import type { Chapter } from "@/features/bookList/model/types";
import { Button } from "@/shared/ui/Button/Button";
import { Plus } from "@/shared/assets/icons/Plus";
import { ChapterRow } from "@/features/chapters/ui/chapterRow";

type ChaptersContainerProps = {
  chapters: Chapter[];
  selectedChapterId: number | null;
  onSelectChapter: (id: number) => void;
  onGoTranslate: () => void;
  onAddChapter: () => void;
  onSaveChapterTitle: (chapterId: number, newTitle: string) => void;
  onDeleteChapter: (chapterId: number) => void;
};

export const ChaptersContainer: React.FC<ChaptersContainerProps> = ({
  chapters,
  selectedChapterId,
  onSelectChapter,
  onGoTranslate,
  onAddChapter,
  onSaveChapterTitle,
  onDeleteChapter
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
              <ChapterRow
                key={chapter.id}
                chapter={chapter}
                isSelected={isSelected}
                onSelect={() => onSelectChapter(chapter.id)}
                onSaveTitle={(newTitle) => onSaveChapterTitle(chapter.id, newTitle)}
                onDelete={() => onDeleteChapter(chapter.id)}
              />
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
