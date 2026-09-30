import Link, { type LinkProps } from "next/link";
import { HTMLAttributeAnchorTarget } from "react";

export default function RefLink({
  href,
  children,
  className,
  target = "_blank",
}: {
  href: LinkProps["href"];
  children?: React.ReactNode;
  className?: string;
  target?: HTMLAttributeAnchorTarget;
}) {
  return (
    <Link
      href={href + "?ref=dar.wang"}
      rel="noopener"
      target={target}
      className={className}
    >
      {children}
    </Link>
  );
}
