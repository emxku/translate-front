import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./shared/styles/reset.scss";
import "./shared/styles/global.scss";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryProvider } from "@/app/providers/query/QueryProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <BrowserRouter>
        <ReactQueryDevtools />
        <App />
      </BrowserRouter>
    </QueryProvider>
  </StrictMode>
);
