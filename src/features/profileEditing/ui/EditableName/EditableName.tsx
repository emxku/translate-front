import React from "react";
import { Input } from "@/shared/ui/Input/Input";
import cls from "./EditableName.module.scss";

interface EditableNameProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const EditableName: React.FC<EditableNameProps> = ({ value, onChange, className = "" }) => {
  return <Input value={value} onChange={(e) => onChange(e.target.value)} className={`${cls.nameInput} ${className}`} />;
};
