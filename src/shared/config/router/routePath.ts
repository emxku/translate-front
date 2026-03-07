export const AppRoutes = {
  NOTFOUND: "notfound",
  SIGN: "sign",
  PROFILE: "profile",
  CHAPTERMANAGER: "chaptermanager",
  TRANSLATE: "translate"
} as const;

export type AppRoutesType = (typeof AppRoutes)[keyof typeof AppRoutes];

export const RoutePath: Record<AppRoutesType, string> = {
  [AppRoutes.SIGN]: "/",
  [AppRoutes.PROFILE]: "/profile",
  [AppRoutes.CHAPTERMANAGER]: "/chaptermanager/:translationId",
  [AppRoutes.TRANSLATE]: "/translate/:translationId/:chapterId",
  [AppRoutes.NOTFOUND]: "*"
};
