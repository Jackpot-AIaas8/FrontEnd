import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import Loader from "./admin/layouts/loader/Loader";
import { AuthProvider } from "./token/AuthContext";

import { ThemeProvider } from "styled-components";
import theme from "./config/theme";
import { LoadingProvider } from "./config/LodingContext";

import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "mdb-react-ui-kit/dist/css/mdb.rtl.min.css"; // 필요한 경우, 오른쪽-왼쪽 정렬 지원
import "@fortawesome/fontawesome-free/css/all.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Suspense fallback={<Loader />}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <LoadingProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </LoadingProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Suspense>
);
reportWebVitals();
