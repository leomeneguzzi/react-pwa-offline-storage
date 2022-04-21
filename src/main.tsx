import React from "react";
import ReactDOM from "react-dom/client";
import { registerSW } from "virtual:pwa-register";

import App from "./App";

// eslint-disable-next-line no-unused-vars
const updateSW = registerSW({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onNeedRefresh() {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onOfflineReady() {},
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
