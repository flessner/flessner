import { Analytics } from "@vercel/analytics/react";
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

// Injected by vite.config.ts at build time from
// `process.env.VERCEL_OBSERVABILITY_CLIENT_CONFIG`. Empty string locally.
declare const __VERCEL_OBSERVABILITY_CLIENT_CONFIG__: string;
const VERCEL_OBS_CONFIG: string | undefined =
  __VERCEL_OBSERVABILITY_CLIENT_CONFIG__ || undefined;

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
    <>
      <ThemeProvider initialChoice={themeChoice}>
        <Outlet />
      </ThemeProvider>
      <Analytics configString={VERCEL_OBS_CONFIG} />
    </>
  );
}
