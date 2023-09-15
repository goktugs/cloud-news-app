import React from "react";

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  gradient: string; // 'bg-gradient-to-r from-red-600 via-purple-600 to-blue-600',
  children: React.ReactNode;
  href: string;
  target?: string;
  rel?: string;
};

export default function GlowingGradientBorderButton({
  gradient,
  children,
  href,
  target = "_blank",
  rel = "noreferrer noopener",
}: Props) {
  return (
    <div className="flex justify-center">
      <div className="relative group">
        <div
          className={cn(
            "absolute -inset-0.5 rounded-2xl blur group-hover:blur-xl opacity-75 transition duration-500 group-hover:duration-200 group-hover:opacity-100 will-change-filter overflow-hidden",
            gradient
          )}
        />
        <a
          className="relative block w-64 h-16 md:h-20 group-hover:scale-105 duration-500 group-hover:duration-200"
          href={href}
          target={target}
          rel={rel}
        >
          <span
            className={cn("block h-full inset-0.5 rounded-xl p-1", gradient)}
          >
            <span className="h-full items-center px-6 bg-neutral-900 text-neutral-50 rounded-lg">
              {children}
            </span>
          </span>
        </a>
      </div>
    </div>
  );
}
