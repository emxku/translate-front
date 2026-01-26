import React from "react";
import cls from "./newCard.module.scss";
import type { NewCardProps } from "../../model/types";
import { Plus } from "@/shared/assets/icons/Plus";

export const NewCard: React.FC<NewCardProps> = ({ onCreate }) => {
  return (
    <div className={cls.newCard} onClick={onCreate}>
      <Plus />
    </div>
  );
};
