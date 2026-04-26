import type { ReactNode } from "react";

export function Page({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-[640px] flex-col px-6 pt-14 pb-6">
      {children}
    </main>
  );
}
