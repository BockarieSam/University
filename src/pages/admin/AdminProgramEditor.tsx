import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import { Seo } from "@/components/shared/Seo";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Label, Input, Textarea } from "@/components/ui/form-fields";
import { Button } from "@/components/ui/button";
import { ImageField } from "@/components/admin/ImageField";
import { ListField } from "@/components/admin/ListField";
import { useContent } from "@/store/ContentContext";
import type { Program } from "@/types";

const emptyProgram: Omit<Program, "id"> = {
  slug: "",
  title: "",
  shortTitle: "",
  category: "",
  tagline: "",
  description: "",
  duration: "2 Years Diploma & 3 Years Higher Diploma",
  format: "",
  image: "",
  gallery: [],
  whatYouLearn: [],
  practicalTraining: "",
  careerPaths: [],
};

export default function AdminProgramEditor() {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const { programs, addProgram, updateProgram } = useContent();

  const existing = !isNew ? programs.find((p) => p.id === id) : undefined;
  const [form, setForm] = useState<Omit<Program, "id">>(existing ?? emptyProgram);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (existing) setForm(existing);
  }, [existing]);

  if (!isNew && !existing) {
    return (
      <p className="text-sm text-navy-700/70">
        Program not found. <Button variant="link" onClick={() => navigate("/admin/programs")}>Back to Programs</Button>
      </p>
    );
  }

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSave = async () => {
    if (!form.title.trim() || !form.image) {
      alert("Please provide at least a title and a cover image.");
      return;
    }
    setSaving(true);
    setSaveError(null);
    try {
      if (isNew) {
        await addProgram(form);
      } else if (existing) {
        await updateProgram(existing.id, form);
      }
      navigate("/admin/programs");
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Couldn't save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const updateGalleryItem = (index: number, key: "src" | "caption", value: string) => {
    const next = [...form.gallery];
    next[index] = { ...next[index], [key]: value };
    set("gallery", next);
  };
  const addGalleryItem = () => set("gallery", [...form.gallery, { src: "", caption: "" }]);
  const removeGalleryItem = (index: number) =>
    set("gallery", form.gallery.filter((_, i) => i !== index));

  return (
    <>
      <Seo title={isNew ? "Add Program" : "Edit Program"} description="SSCTVET content dashboard." />
      <button
        onClick={() => navigate("/admin/programs")}
        className="mb-4 flex items-center gap-1.5 text-sm font-semibold text-navy-700/60 hover:text-navy-900"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Programs
      </button>
      <AdminPageHeader
        title={isNew ? "Add Program" : `Edit: ${existing?.title}`}
        actions={
          <div className="flex flex-col items-end gap-1.5">
            <Button onClick={handleSave} disabled={saving}>
              <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save Program"}
            </Button>
            {saveError && <p className="text-xs font-semibold text-red-500">{saveError}</p>}
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-6">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <h3 className="font-display text-sm font-bold uppercase tracking-wide text-navy-700/60">
                Basics
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label>Program Title *</Label>
                  <Input value={form.title} onChange={(e) => set("title", e.target.value)} />
                </div>
                <div>
                  <Label>Short Title (cards, footer)</Label>
                  <Input value={form.shortTitle} onChange={(e) => set("shortTitle", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label>URL Slug</Label>
                  <Input
                    value={form.slug}
                    placeholder="auto-generated from title if left blank"
                    onChange={(e) => set("slug", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <Input value={form.category} onChange={(e) => set("category", e.target.value)} />
                </div>
              </div>
              <div>
                <Label>Tagline</Label>
                <Input value={form.tagline} onChange={(e) => set("tagline", e.target.value)} />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label>Duration</Label>
                  <Input value={form.duration} onChange={(e) => set("duration", e.target.value)} />
                </div>
                <div>
                  <Label>Format</Label>
                  <Input value={form.format} onChange={(e) => set("format", e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4 pt-6">
              <h3 className="font-display text-sm font-bold uppercase tracking-wide text-navy-700/60">
                Curriculum &amp; Careers
              </h3>
              <ListField
                label="What Students Learn"
                hint="One curriculum item per line"
                value={form.whatYouLearn}
                onChange={(v) => set("whatYouLearn", v)}
              />
              <div>
                <Label>Practical Training Description</Label>
                <Textarea
                  rows={3}
                  value={form.practicalTraining}
                  onChange={(e) => set("practicalTraining", e.target.value)}
                />
              </div>
              <ListField
                label="Career Paths"
                hint="One role per line"
                value={form.careerPaths}
                onChange={(v) => set("careerPaths", v)}
                rows={4}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <h3 className="font-display text-sm font-bold uppercase tracking-wide text-navy-700/60">
                Cover Image
              </h3>
              <ImageField label="Cover Image *" value={form.image} onChange={(v) => set("image", v)} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-bold uppercase tracking-wide text-navy-700/60">
                  Program Gallery
                </h3>
                <button
                  type="button"
                  onClick={addGalleryItem}
                  className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Image
                </button>
              </div>
              {form.gallery.length === 0 && (
                <p className="text-xs text-navy-700/55">No gallery images yet.</p>
              )}
              <div className="space-y-4">
                {form.gallery.map((g, i) => (
                  <div key={i} className="rounded-lg border border-navy-900/10 p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-bold text-navy-700/60">Image {i + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeGalleryItem(i)}
                        className="text-red-500 hover:text-red-600"
                        aria-label="Remove image"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <ImageField
                      label=""
                      value={g.src}
                      onChange={(v) => updateGalleryItem(i, "src", v)}
                    />
                    <div className="mt-2">
                      <Input
                        placeholder="Caption"
                        value={g.caption}
                        onChange={(e) => updateGalleryItem(i, "caption", e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
