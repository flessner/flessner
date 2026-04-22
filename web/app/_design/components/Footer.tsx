import { Section } from "./Section";
import { ThemeToggle } from "./ThemeToggle";

export function Footer() {
  return (
    <footer className="mt-auto pt-16">
      <Section title="theme">
        <ThemeToggle />
      </Section>
    </footer>
  );
}
