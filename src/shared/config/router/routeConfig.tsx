import type { RouteProps } from "react-router-dom";
import { NotFoundPage } from "@/pages/NotFoundPage/NotFound";
import { SignPage } from "@/pages/SignPage/SignPage";
import { ProfilePage } from "@/pages/ProfilePage/ProfilePage";
import { ChaptersPage } from "@/pages/ChaptersPage/ChaptersPage";
import { TranslatePage } from "@/pages/TranslatePage/TranslatePage";
import { AppRoutes, RoutePath, type AppRoutesType } from "./routePath";

export const routeConfig: Record<AppRoutesType, RouteProps> = {
  [AppRoutes.SIGN]: {
    path: RoutePath[AppRoutes.SIGN],
    element: <SignPage />
  },
  [AppRoutes.PROFILE]: {
    path: RoutePath[AppRoutes.PROFILE],
    element: <ProfilePage />
  },
  [AppRoutes.NOTFOUND]: {
    path: RoutePath[AppRoutes.NOTFOUND],
    element: <NotFoundPage />
  },
  [AppRoutes.CHAPTERMANAGER]: {
    path: RoutePath[AppRoutes.CHAPTERMANAGER],
    element: <ChaptersPage />
  },
  [AppRoutes.TRANSLATE]: {
    path: RoutePath[AppRoutes.TRANSLATE],
    element: <TranslatePage />
  }
};
