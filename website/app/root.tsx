import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type LoaderFunctionArgs,
  useLoaderData,
} from "react-router";

import "./app.css";
import { ThemeProvider, type ThemeChoice } from "./hooks/useTheme";
import { readPreferencesFromCookie } from "./lib/preferences";

// Vite replaces `import.meta.env.VITE_*` with literal strings at build time
// in both server and client bundles (sourced from `[build.args]` in fly.toml
// → Dockerfile ARG → ENV → Vite).
const UMAMI_HOST = import.meta.env.VITE_UMAMI_HOST as string | undefined;
const UMAMI_WEBSITE_ID = import.meta.env.VITE_UMAMI_WEBSITE_ID as
  | string
  | undefined;

export function loader({ request }: LoaderFunctionArgs) {
  const prefs = readPreferencesFromCookie(request.headers.get("cookie"));
  const themeChoice: ThemeChoice = prefs.theme ?? "system";
  return { themeChoice };
}

export function meta() {
  return [
    { title: "Torben Alexander Flessner" },
    {
      name: "description",
      content: "Personal site of Torben Alexander Flessner.",
    },
  ];
}

// Inline bootstrap that runs before React hydrates. Reads the preferences
// cookie, falls back to prefers-color-scheme, and sets `.dark` on <html>
// synchronously so the first paint matches the resolved theme — no flash.
const THEME_BOOT = `
(function(){try{
  var c=document.cookie||"";
  var m=/(?:^|;\\s*)preferences=([^;]+)/.exec(c);
  var p={};
  if(m&&m[1]){try{p=JSON.parse(decodeURIComponent(m[1]))}catch(e){}}
  var t=p.theme;
  if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){
    document.documentElement.classList.add("dark");
  }
}catch(e){}})();
`;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
        <Meta />
        <Links />
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
        {UMAMI_HOST && UMAMI_WEBSITE_ID && (
          <script
            defer
            src={`https://${UMAMI_HOST}/script.js`}
            data-website-id={UMAMI_WEBSITE_ID}
            data-performance="true"
          />
        )}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { themeChoice } = useLoaderData<typeof loader>();
  return (
    <ThemeProvider initialChoice={themeChoice}>
      <Outlet />
    </ThemeProvider>
  );
}
