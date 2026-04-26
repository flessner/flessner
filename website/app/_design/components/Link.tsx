import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = {
  href: string;
  external?: boolean;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">;

export function Link({ href, external, children, ...rest }: Props) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <a
      href={href}
      {...externalProps}
      {...rest}
      className="underline decoration-(--rule) underline-offset-[3px] hover:decoration-(--fg)"
    >
      {children}
    </a>
  );
}
