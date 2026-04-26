import type { ReactNode } from "react";

export function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-10">
      <div className="mb-2 text-(--accent)">{title}</div>
      <div className="pl-5">{children}</div>
    </section>
  );
}
