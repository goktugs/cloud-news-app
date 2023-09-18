import React from "react";

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 container w-full h-full flex">{children}</main>
  );
}
