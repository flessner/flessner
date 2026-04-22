import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  updatePreferences,
  type Theme,
  type ThemeChoice,
} from "~/lib/preferences";

export type { Theme, ThemeChoice };

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

interface ThemeContextValue {
  theme: Theme;
  choice: ThemeChoice;
  setChoice: (c: ThemeChoice) => void;
  toggle: () => void;
}

const Ctx = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  initialChoice = "system",
  children,
}: {
  initialChoice?: ThemeChoice;
  children: ReactNode;
}) {
  const [choice, setChoiceState] = useState<ThemeChoice>(initialChoice);

  const systemTheme = useSyncExternalStore(
    (cb) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => getSystemTheme(),
    () => "light" as Theme,
  );

  const theme: Theme = choice === "system" ? systemTheme : choice;

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  const setChoice = useCallback((c: ThemeChoice) => {
    setChoiceState(c);
    updatePreferences({ theme: c === "system" ? undefined : c });
  }, []);

  const toggle = useCallback(() => {
    setChoiceState((c) => {
      const next: ThemeChoice =
        c === "light" ? "dark" : c === "dark" ? "system" : "light";
      updatePreferences({ theme: next === "system" ? undefined : next });
      return next;
    });
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, choice, setChoice, toggle }),
    [theme, choice, setChoice, toggle],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
