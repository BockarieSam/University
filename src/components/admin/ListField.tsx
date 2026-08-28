import { useEffect, useState } from "react";
import { Label, Textarea } from "@/components/ui/form-fields";

export function ListField({
  label,
  hint,
  value,
  onChange,
  rows = 5,
}: {
  label: string;
  hint?: string;
  value: string[];
  onChange: (value: string[]) => void;
  rows?: number;
}) {
  const [text, setText] = useState(value.join("\n"));

  // Keep local text in sync if the underlying value changes externally
  // (e.g. switching between records in an editor).
  useEffect(() => {
    setText(value.join("\n"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.join("\n")]);

  const commit = (raw: string) => {
    const items = raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    onChange(items);
  };

  return (
    <div>
      <Label>{label}</Label>
      {hint && <p className="mb-1.5 -mt-1 text-xs text-navy-700/55">{hint}</p>}
      <Textarea
        rows={rows}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={(e) => commit(e.target.value)}
        placeholder="One item per line…"
      />
    </div>
  );
}
