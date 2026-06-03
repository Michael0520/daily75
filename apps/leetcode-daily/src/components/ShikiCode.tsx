import { useEffect, useState } from "react";

type AnyHighlighter = {
  codeToHtml: (code: string, opts: { lang: string; theme: string }) => string;
};

let cached: Promise<AnyHighlighter> | null = null;

function getHighlighter(): Promise<AnyHighlighter> {
  if (!cached) {
    cached = import("shiki").then(({ createHighlighter }) =>
      createHighlighter({
        langs: ["javascript", "typescript"],
        themes: ["one-dark-pro"],
      }),
    ) as Promise<AnyHighlighter>;
  }
  return cached!;
}

interface Props {
  code: string;
  lang?: "javascript" | "typescript";
  className?: string;
}

export function ShikiCode({ code, lang = "javascript", className }: Props) {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    getHighlighter().then((hl) => {
      setHtml(hl.codeToHtml(code, { lang, theme: "one-dark-pro" }));
    });
  }, [code, lang]);

  if (!html) {
    return (
      <pre
        className={`overflow-x-auto rounded-md bg-[#282c34] p-3 font-mono text-xs text-[#abb2bf] ${className ?? ""}`}
      >
        {code}
      </pre>
    );
  }

  return (
    <div
      className={`overflow-x-auto rounded-md text-xs [&_pre]:p-3 [&_pre]:!bg-[#282c34] ${className ?? ""}`}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
