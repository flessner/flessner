import { useTheme, type ThemeChoice } from "~/hooks/useTheme";

const CHOICES: ThemeChoice[] = ["system", "light", "dark"];

export function ThemeToggle() {
  const { choice, setChoice } = useTheme();
  return (
    <div role="group" aria-label="theme" className="flex flex-col items-start">
      {CHOICES.map((c) => {
        const selected = c === choice;
        return (
          <button
            key={c}
            type="button"
            aria-pressed={selected}
            onClick={() => setChoice(c)}
            className="cursor-pointer text-(--fg) underline decoration-(--rule) underline-offset-[3px] hover:decoration-(--fg)"
          >
            {c}
            {selected && (
              <span
                aria-hidden="true"
                className="ml-2 inline-block text-(--accent) no-underline"
              >
                *
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
