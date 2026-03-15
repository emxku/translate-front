import React from "react";
import { Input } from "@/shared/ui/Input/Input";
import cls from "./EditableBio.module.scss";

interface EditableBioProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const EditableBio: React.FC<EditableBioProps> = ({ value, onChange, className = "" }) => {
  return <Input value={value} onChange={(e) => onChange(e.target.value)} className={`${cls.bioInput} ${className}`} />;
};
