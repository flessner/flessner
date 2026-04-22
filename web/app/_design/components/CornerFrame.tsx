import type { ReactNode } from "react";
import { CORNER_BR, CORNER_TL } from "../ascii/glyphs";

export function CornerFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mb-12 px-6 py-9">
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 text-(--accent)"
      >
        {CORNER_TL}
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-0 right-0 text-(--accent)"
      >
        {CORNER_BR}
      </span>
      {children}
    </div>
  );
}
