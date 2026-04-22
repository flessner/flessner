import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type LoaderFunctionArgs,
  useLoaderData,
  useRouteLoaderData,
} from "react-router";

import "./app.css";
import { ThemeProvider, type ThemeChoice } from "./hooks/useTheme";
import { readPreferencesFromCookie } from "./lib/preferences";

interface UmamiConfig {
  host: string;
  websiteId: string;
}

export function loader({ request }: LoaderFunctionArgs) {
  const prefs = readPreferencesFromCookie(request.headers.get("cookie"));
  const themeChoice: ThemeChoice = prefs.theme ?? "system";
  const umamiHost = process.env.UMAMI_HOST;
  const umamiWebsiteId = process.env.UMAMI_WEBSITE_ID;
  const umami: UmamiConfig | null =
    umamiHost && umamiWebsiteId
      ? { host: umamiHost, websiteId: umamiWebsiteId }
      : null;
  return { themeChoice, umami };
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
  const data = useRouteLoaderData("root") as
    | { umami?: UmamiConfig | null }
    | undefined;
  const umami = data?.umami;
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
        <Meta />
        <Links />
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
        {umami && (
          <script
            defer
            src={`https://${umami.host}/script.js`}
            data-website-id={umami.websiteId}
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
