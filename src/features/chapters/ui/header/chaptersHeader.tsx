import React from "react";
import cls from "./chaptersHeader.module.scss";
//import { Avatar } from "@/shared/ui/Avatar";
import { Button } from "@/shared/ui/Button/Button";
import { Member } from "@/shared/assets/icons/Member";

type Participant = {
  id: number;
  name: string;
  avatarUrl?: string;
};

type ChaptersHeaderProps = {
  title: string;
  participants: Participant[];
  onAddParticipant: () => void;
  onFinishTranslation: () => void;
  isFinishDisabled?: boolean;
};

export const ChaptersHeader: React.FC<ChaptersHeaderProps> = ({
  title,
  //participants,
  onAddParticipant,
  onFinishTranslation,
  isFinishDisabled = true
}) => {
  return (
    <div className={cls.header}>
      <div className={cls.left}>
        <h1 className={cls.title}>{title}</h1>
        <div className={cls.participantsBlock}>
          <div className={cls.participantsRow}>
            <div className={cls.participantsLabel}>Участвуют в переводе:</div>
            <div className={cls.avatars}>
              {/*{participants.map((p) => (
                <Avatar key={p.id} src={p.avatarUrl} alt={p.name} className={cls.avatar} />
              ))}*/}
            </div>
          </div>
          <button
              className={cls.addParticipantBtn}
              onClick={onAddParticipant}
              type="button"
              aria-label="Добавить участника"
            >
              <Member />
            </button>
        </div>
      </div>

      <div className={cls.right}>
        <Button onClick={onFinishTranslation} disabled={isFinishDisabled} className={cls.finishButton}>
          Завершить<br></br>
          перевод
        </Button>
      </div>
    </div>
  );
};