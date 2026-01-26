import { useState } from "react";
import type { UseProfileEditingReturn } from "./types";

export const useProfileEditing = (): UseProfileEditingReturn => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => setIsEditing(!isEditing);
  const enterEditing = () => setIsEditing(true);
  const exitEditing = () => setIsEditing(false);

  return {
    isEditing,
    toggleEditing,
    enterEditing,
    exitEditing
  };
};
