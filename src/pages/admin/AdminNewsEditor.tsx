import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { Seo } from "@/components/shared/Seo";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Label, Input, Select } from "@/components/ui/form-fields";
import { Button } from "@/components/ui/button";
import { ListField } from "@/components/admin/ListField";
import { useContent } from "@/store/ContentContext";
import type { NewsItem } from "@/types";

const emptyNews: Omit<NewsItem, "id"> = {
  slug: "",
  category: "Admission",
  date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
  title: "",
  excerpt: "",
  body: [],
};

const categories = ["Admission", "Graduation", "Workshop", "Announcement"];

export default function AdminNewsEditor() {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const { news, addNews, updateNews } = useContent();

  const existing = !isNew ? news.find((n) => n.id === id) : undefined;
  const [form, setForm] = useState<Omit<NewsItem, "id">>(existing ?? emptyNews);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (existing) setForm(existing);
  }, [existing]);

  if (!isNew && !existing) {
    return (
      <p className="text-sm text-navy-700/70">
        News item not found. <Button variant="link" onClick={() => navigate("/admin/news")}>Back to News</Button>
      </p>
    );
  }

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSave = async () => {
    if (!form.title.trim() || !form.excerpt.trim()) {
      alert("Please provide at least a title and a short excerpt.");
      return;
    }
    const payload = { ...form, body: form.body.length ? form.body : [form.excerpt] };
    setSaving(true);
    setSaveError(null);
    try {
      if (isNew) {
        await addNews(payload);
      } else if (existing) {
        await updateNews(existing.id, payload);
      }
      navigate("/admin/news");
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Couldn't save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Seo title={isNew ? "Post Update" : "Edit News"} description="SSCTVET content dashboard." />
      <button
        onClick={() => navigate("/admin/news")}
        className="mb-4 flex items-center gap-1.5 text-sm font-semibold text-navy-700/60 hover:text-navy-900"
      >
        <ArrowLeft className="h-4 w-4" /> Back to News
      </button>
      <AdminPageHeader
        title={isNew ? "Post Update" : `Edit: ${existing?.title}`}
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label>Category</Label>
              <Select value={form.category} onChange={(e) => set("category", e.target.value)}>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label>Date</Label>
              <Input value={form.date} onChange={(e) => set("date", e.target.value)} />
            </div>
          </div>
          <div>
            <Label>Title *</Label>
            <Input value={form.title} onChange={(e) => set("title", e.target.value)} />
          </div>
          <div>
            <Label>URL Slug</Label>
            <Input
              value={form.slug}
              placeholder="auto-generated from title if left blank"
              onChange={(e) => set("slug", e.target.value)}
            />
          </div>
          <div>
            <Label>Excerpt (shown on cards) *</Label>
            <Input value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
          </div>
          <ListField
            label="Full Story"
            hint="One paragraph per line — shown on the article page"
            value={form.body}
            onChange={(v) => set("body", v)}
            rows={6}
          />
        </CardContent>
      </Card>
    </>
  );
}
