import React from "react";

export function Ampersand({ className = "" }: { className?: string }) {
  return (
    <span className={`font-sans font-semibold text-[0.88em] mx-1 inline-block select-all ${className}`}>
      &amp;
    </span>
  );
}

export function formatAmpersand(text: React.ReactNode): React.ReactNode {
  if (typeof text !== "string") return text;
  if (!text.includes("&")) return text;
  const parts = text.split("&");
  return (
    <>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < parts.length - 1 && <Ampersand />}
        </React.Fragment>
      ))}
    </>
  );
}
