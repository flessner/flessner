import "@unocss/reset/tailwind.css";
import "virtual:uno.css";
import "./global.css";

import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { Header } from "./ui";

export default () => {
  return (
    <Router
      root={(props) => (
        <>
          <Header />
          <Suspense>{props.children}</Suspense>
          <div class="h-32" />
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
