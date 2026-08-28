import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function useConfirmDelete() {
  const [target, setTarget] = useState<{
    label: string;
    onConfirm: () => void | Promise<void>;
  } | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const confirmDelete = (label: string, onConfirm: () => void | Promise<void>) => {
    setError(null);
    setTarget({ label, onConfirm });
  };

  const handleConfirm = async () => {
    if (!target) return;
    setDeleting(true);
    setError(null);
    try {
      await target.onConfirm();
      setTarget(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const dialog = (
    <Dialog open={!!target} onClose={() => !deleting && setTarget(null)} className="max-w-sm">
      {target && (
        <div className="p-7 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h3 className="font-display text-base font-bold text-navy-900">Delete {target.label}?</h3>
          <p className="mt-2 text-sm text-navy-700/70">
            This can't be undone. This item will be removed from the live site immediately.
          </p>
          {error && <p className="mt-3 text-xs font-semibold text-red-500">{error}</p>}
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="outline" disabled={deleting} onClick={() => setTarget(null)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" disabled={deleting} onClick={handleConfirm}>
              {deleting ? "Deleting…" : "Delete"}
            </Button>
          </div>
        </div>
      )}
    </Dialog>
  );

  return { confirmDelete, dialog };
}
