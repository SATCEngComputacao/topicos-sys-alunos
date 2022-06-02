import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { UsuarioProvider } from "./context/UsuarioContext";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UsuarioProvider>
          <App />
        </UsuarioProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
