import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthContextProvider from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles/index.css";

const queryClientOptions = {
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
};
const queryClient = new QueryClient(queryClientOptions);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster />
      </QueryClientProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
