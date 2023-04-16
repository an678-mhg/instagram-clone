import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthContextProvider from "./context/AuthContext";
import { Toaster, toast } from "react-hot-toast";
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from "react-query";
import CreatePostModalContextProvider from "./context/CreatePostModalContext";
import SocketContextProvider from "./context/SocketContext";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles/index.css";

const queryClientOptions: QueryClientConfig = {
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
    mutations: {
      onError: () => {
        toast.error("Something went wrong!");
      },
    },
  },
};

const queryClient = new QueryClient(queryClientOptions);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <CreatePostModalContextProvider>
        <SocketContextProvider>
          <App />
          <Toaster />
        </SocketContextProvider>
      </CreatePostModalContextProvider>
    </AuthContextProvider>
  </QueryClientProvider>
  // </React.StrictMode>
);
