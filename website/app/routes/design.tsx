import type { ReactNode } from "react";

import { CORNER_BR, CORNER_TL } from "~/_design/ascii/glyphs";
import { CornerFrame } from "~/_design/components/CornerFrame";
import { Footer } from "~/_design/components/Footer";
import { Link } from "~/_design/components/Link";
import { Page } from "~/_design/components/Page";
import { Section } from "~/_design/components/Section";
import { ThemeToggle } from "~/_design/components/ThemeToggle";
import { tokens } from "~/_design/tokens";
import { useTheme } from "~/hooks/useTheme";

function Caption({ children }: { children: ReactNode }) {
  return <div className="mt-2 text-xs text-(--dim)">{children}</div>;
}

function Swatch({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="inline-block h-6 w-6 border border-(--rule)"
        style={{ background: value }}
      />
      <span className="text-(--accent)">{label}</span>
      <span className="text-(--dim)">{value}</span>
    </div>
  );
}

export default function Design() {
  const { theme } = useTheme();
  const palette = tokens[theme];

  return (
    <Page>
      <CornerFrame>
        <h1 className="font-bold">_design</h1>
        <p className="text-(--accent)">design system reference</p>
      </CornerFrame>

      <Section title="typography">
        <p>the quick brown fox jumps over the lazy dog</p>
        <p className="font-bold">
          the quick brown fox jumps over the lazy dog
        </p>
        <Caption>Geist Mono Variable · 14px · regular + bold</Caption>
      </Section>

      <Section title="colors">
        <div className="flex flex-col gap-2">
          <Swatch label="bg" value={palette.bg} />
          <Swatch label="fg" value={palette.fg} />
          <Swatch label="accent" value={palette.accent} />
          <Swatch label="dim" value={palette.dim} />
          <Swatch label="rule" value={palette.rule} />
        </div>
        <Caption>active theme: {theme}</Caption>
      </Section>

      <Section title="primitives">
        <div className="mb-6">
          <CornerFrame>
            <p>example content inside a CornerFrame</p>
          </CornerFrame>
          <Caption>&lt;CornerFrame /&gt;</Caption>
        </div>

        <div className="mb-6">
          <Section title="example section">
            <p>indented content goes here</p>
          </Section>
          <Caption>&lt;Section title="..." /&gt;</Caption>
        </div>

        <div className="mb-6">
          <Link href="https://example.com" external>
            example link
          </Link>
          <Caption>&lt;Link href="..." external /&gt;</Caption>
        </div>

        <div className="mb-6">
          <ThemeToggle />
          <Caption>&lt;ThemeToggle /&gt;</Caption>
        </div>
      </Section>

      <Section title="ascii glyphs">
        <div className="flex flex-col gap-1">
          <div>
            <span className="text-(--accent)">{CORNER_TL}</span>
            <span className="ml-4 text-(--dim)">
              CORNER_TL · U+250C U+2500
            </span>
          </div>
          <div>
            <span className="text-(--accent)">{CORNER_BR}</span>
            <span className="ml-4 text-(--dim)">
              CORNER_BR · U+2500 U+2518
            </span>
          </div>
        </div>
      </Section>

      <Footer />
    </Page>
  );
}
