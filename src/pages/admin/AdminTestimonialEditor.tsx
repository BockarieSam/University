import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { Seo } from "@/components/shared/Seo";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Label, Input, Textarea } from "@/components/ui/form-fields";
import { Button } from "@/components/ui/button";
import { ImageField } from "@/components/admin/ImageField";
import { useContent } from "@/store/ContentContext";
import type { Testimonial } from "@/types";

const emptyTestimonial: Omit<Testimonial, "id"> = {
  name: "",
  image: "",
  program: "",
  role: "",
  quote: "",
};

export default function AdminTestimonialEditor() {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const { testimonials, addTestimonial, updateTestimonial } = useContent();

  const existing = !isNew ? testimonials.find((t) => t.id === id) : undefined;
  const [form, setForm] = useState<Omit<Testimonial, "id">>(existing ?? emptyTestimonial);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (existing) setForm(existing);
  }, [existing]);

  if (!isNew && !existing) {
    return (
      <p className="text-sm text-navy-700/70">
        Testimonial not found.{" "}
        <Button variant="link" onClick={() => navigate("/admin/testimonials")}>
          Back to Testimonials
        </Button>
      </p>
    );
  }

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSave = async () => {
    if (!form.name.trim() || !form.quote.trim()) {
      alert("Please provide at least a name and a quote.");
      return;
    }
    setSaving(true);
    setSaveError(null);
    try {
      if (isNew) {
        await addTestimonial(form);
      } else if (existing) {
        await updateTestimonial(existing.id, form);
      }
      navigate("/admin/testimonials");
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Couldn't save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Seo
        title={isNew ? "Add Testimonial" : "Edit Testimonial"}
        description="SSCTVET content dashboard."
      />
      <button
        onClick={() => navigate("/admin/testimonials")}
        className="mb-4 flex items-center gap-1.5 text-sm font-semibold text-navy-700/60 hover:text-navy-900"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Testimonials
      </button>
      <AdminPageHeader
        title={isNew ? "Add Testimonial" : `Edit: ${existing?.name}`}
        actions={
          <div className="flex flex-col items-end gap-1.5">
            <Button onClick={handleSave} disabled={saving}>
              <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save"}
            </Button>
            {saveError && <p className="text-xs font-semibold text-red-500">{saveError}</p>}
          </div>
        }
      />

      <Card className="max-w-2xl">
        <CardContent className="space-y-5 pt-6">
          <ImageField label="Photo" value={form.image} onChange={(v) => set("image", v)} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label>Name *</Label>
              <Input value={form.name} onChange={(e) => set("name", e.target.value)} />
            </div>
            <div>
              <Label>Program &amp; Year</Label>
              <Input
                value={form.program}
                placeholder="e.g. Information Technology (2023)"
                onChange={(e) => set("program", e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label>Role / Where they are now</Label>
            <Input
              value={form.role}
              placeholder="e.g. Computer Technician, Pujehun Town"
              onChange={(e) => set("role", e.target.value)}
            />
          </div>
          <div>
            <Label>Quote *</Label>
            <Textarea rows={4} value={form.quote} onChange={(e) => set("quote", e.target.value)} />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
