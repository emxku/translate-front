import React from "react";
import cls from "./translationCard.module.scss";
import type { TranslationCardProps } from "../../model/types";
import { Edit } from "@/shared/assets/icons/Edit";
import { Button } from "@/shared/ui/Button/Button";

export const TranslationCard: React.FC<TranslationCardProps> = ({ translation, onEdit, onClick }) => {
  return (
    <div className={cls.translationCard} onClick={() => onClick(translation.id)}>
      <div className={cls.cardHeader}>
        <h3 className={cls.cardTitle}>{translation.title}</h3>
        <button
          className={cls.editButton}
          onClick={(e) => {
            e.stopPropagation();
            onEdit(translation.id);
          }}
        >
          <Edit />
        </button>
      </div>
      <p className={cls.cardDescription}>{translation.description}</p>
      <div className={cls.cardFooter}>
        <Button theme="regular" className={cls.continueButton}>
          Продолжить перевод
        </Button>
      </div>
    </div>
  );
};
