import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import "./index.css";

const queryCLient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryCLient}>
    <StrictMode>
      <App />
    </StrictMode>
  </QueryClientProvider>
);
