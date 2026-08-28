import { useState } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown, Pencil, X, Save } from "lucide-react";
import { Seo } from "@/components/shared/Seo";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Label, Input, Textarea } from "@/components/ui/form-fields";
import { Button } from "@/components/ui/button";
import { useConfirmDelete } from "@/components/admin/ConfirmDelete";
import { useContent } from "@/store/ContentContext";
import type { FaqItem } from "@/types";

export default function AdminFaqManager() {
  const { faqs, addFaq, updateFaq, deleteFaq, reorderFaq } = useContent();
  const { confirmDelete, dialog } = useConfirmDelete();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState<FaqItem>({ question: "", answer: "" });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setAdding(false);
    setDraft(faqs[index]);
  };

  const startAdd = () => {
    setAdding(true);
    setEditingIndex(null);
    setDraft({ question: "", answer: "" });
  };

  const cancel = () => {
    setAdding(false);
    setEditingIndex(null);
    setSaveError(null);
  };

  const save = async () => {
    if (!draft.question.trim() || !draft.answer.trim()) {
      alert("Please fill in both the question and answer.");
      return;
    }
    setSaving(true);
    setSaveError(null);
    try {
      if (adding) {
        await addFaq(draft);
      } else if (editingIndex !== null) {
        await updateFaq(editingIndex, draft);
      }
      cancel();
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Couldn't save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Seo title="Manage FAQ" description="SSCTVET content dashboard." />
      <AdminPageHeader
        title="Frequently Asked Questions"
        description="Shown on the Admissions page."
        actions={
          !adding && (
            <Button onClick={startAdd}>
              <Plus className="h-4 w-4" /> Add Question
            </Button>
          )
        }
      />

      {(adding || editingIndex !== null) && (
        <Card className="mb-6 max-w-2xl border-emerald-600/30">
          <CardContent className="space-y-4 pt-6">
            <h3 className="font-display text-sm font-bold text-navy-900">
              {adding ? "New Question" : "Edit Question"}
            </h3>
            <div>
              <Label>Question</Label>
              <Input
                value={draft.question}
                onChange={(e) => setDraft((d) => ({ ...d, question: e.target.value }))}
              />
            </div>
            <div>
              <Label>Answer</Label>
              <Textarea
                rows={3}
                value={draft.answer}
                onChange={(e) => setDraft((d) => ({ ...d, answer: e.target.value }))}
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={save} disabled={saving}>
                <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save"}
              </Button>
              <Button variant="outline" onClick={cancel} disabled={saving}>
                <X className="h-4 w-4" /> Cancel
              </Button>
            </div>
            {saveError && <p className="text-xs font-semibold text-red-500">{saveError}</p>}
          </CardContent>
        </Card>
      )}

      <Card>
        <div className="divide-y divide-navy-900/8">
          {faqs.length === 0 && (
            <p className="p-8 text-center text-sm text-navy-700/60">No FAQ entries yet.</p>
          )}
          {faqs.map((faq, i) => (
            <div key={i} className="flex items-start gap-4 p-4 sm:p-5">
              <div className="flex shrink-0 flex-col gap-1 pt-1">
                <button
                  disabled={i === 0}
                  onClick={() => reorderFaq(i, i - 1).catch(() => alert("Couldn't reorder. Please try again."))}
                  className="flex h-6 w-6 items-center justify-center rounded text-navy-500 hover:bg-navy-900/5 disabled:opacity-25"
                  aria-label="Move up"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  disabled={i === faqs.length - 1}
                  onClick={() => reorderFaq(i, i + 1).catch(() => alert("Couldn't reorder. Please try again."))}
                  className="flex h-6 w-6 items-center justify-center rounded text-navy-500 hover:bg-navy-900/5 disabled:opacity-25"
                  aria-label="Move down"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-bold text-navy-900">{faq.question}</p>
                <p className="mt-1 text-sm text-navy-700/70">{faq.answer}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button variant="outline" size="sm" onClick={() => startEdit(i)}>
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-600 hover:bg-red-50"
                  onClick={() => confirmDelete(faq.question, () => deleteFaq(i))}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
      {dialog}
    </>
  );
}
