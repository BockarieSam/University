import { useRef, useState } from "react";
import { ImagePlus, X, Loader2 } from "lucide-react";
import { Label, Input } from "@/components/ui/form-fields";
import { uploadImage, ApiError } from "@/lib/api";

export function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      setError("That image is larger than 4MB. Please choose a smaller file.");
      return;
    }
    setUploading(true);
    setError(null);
    try {
      const { url } = await uploadImage(file);
      onChange(url);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      {label && <Label>{label}</Label>}
      <div className="flex items-start gap-4">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-navy-900/10 bg-navy-900/5">
          {uploading ? (
            <div className="flex h-full w-full items-center justify-center text-navy-400">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : value ? (
            <>
              <img src={value} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => onChange("")}
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-navy-950/70 text-white"
                aria-label="Remove image"
              >
                <X className="h-3 w-3" />
              </button>
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-navy-400">
              <ImagePlus className="h-6 w-6" />
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <Input
            placeholder="Paste an image URL…"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 disabled:opacity-50"
          >
            {uploading ? "Uploading…" : "or upload an image file (under 4MB)"}
          </button>
          {error && <p className="text-xs font-semibold text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}
