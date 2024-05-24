import "@fontsource/fredoka-one/400.css";
import "@fontsource/nunito-sans";
import React from "react";
import ReactDOM from "react-dom/client";
import Toast from "@/components/Toast/Toast.tsx";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toast>
      <App />
    </Toast>
  </React.StrictMode>,
);
