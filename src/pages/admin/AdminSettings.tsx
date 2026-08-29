import { useEffect, useRef, useState } from "react";
import { Save, Download, Upload, RotateCcw, CheckCircle2 } from "lucide-react";
import { Seo } from "@/components/shared/Seo";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Label, Input, Textarea } from "@/components/ui/form-fields";
import { Button } from "@/components/ui/button";
import { useContent } from "@/store/ContentContext";

export default function AdminSettings() {
  const { settings, updateSettings, exportJson, importJson, resetToDefaults } = useContent();
  const [form, setForm] = useState(settings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  // Keep the form in sync if settings change from elsewhere (e.g. after an
  // import or reset triggered on this same page).
  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      await updateSettings(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Couldn't save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleExport = () => {
    const blob = new Blob([exportJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ssctvet-content-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = async (file: File | undefined) => {
    if (!file) return;
    const text = await file.text();
    const result = await importJson(text);
    if (result.ok) {
      alert("Content imported successfully.");
    } else {
      alert(`Import failed: ${result.error}`);
    }
  };

  const handleReset = async () => {
    if (
      window.confirm(
        "This will discard all admin edits and restore the original website content for everyone. This cannot be undone. Continue?"
      )
    ) {
      await resetToDefaults();
    }
  };

  return (
    <>
      <Seo title="Site Settings" description="SSCTVET content dashboard." />
      <AdminPageHeader
        title="Site Settings"
        description="Contact details and homepage headline copy."
        actions={
          <div className="flex flex-col items-end gap-1.5">
            <Button onClick={handleSave} disabled={saving}>
              {saved ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              {saving ? "Saving…" : saved ? "Saved" : "Save Changes"}
            </Button>
            {saveError && <p className="text-xs font-semibold text-red-500">{saveError}</p>}
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="space-y-4 pt-6">
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-navy-700/60">
              Contact Information
            </h3>
            <div>
              <Label>Address</Label>
              <Input value={form.address} onChange={(e) => set("address", e.target.value)} />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label>Primary Phone</Label>
                <Input value={form.phonePrimary} onChange={(e) => set("phonePrimary", e.target.value)} />
              </div>
              <div>
                <Label>Secondary Phone</Label>
                <Input
                  value={form.phoneSecondary}
                  onChange={(e) => set("phoneSecondary", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label>Email</Label>
              <Input value={form.email} onChange={(e) => set("email", e.target.value)} />
            </div>
            <div>
              <Label>WhatsApp Number</Label>
              <Input
                value={form.whatsappNumber}
                placeholder="Country code + number, no + or spaces (e.g. 23280377218)"
                onChange={(e) => set("whatsappNumber", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 pt-6">
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-navy-700/60">
              Homepage Hero
            </h3>
            <div>
              <Label>Eyebrow Label</Label>
              <Input value={form.heroEyebrow} onChange={(e) => set("heroEyebrow", e.target.value)} />
            </div>
            <div>
              <Label>Headline</Label>
              <Textarea rows={2} value={form.heroTitle} onChange={(e) => set("heroTitle", e.target.value)} />
            </div>
            <div>
              <Label>Subheadline</Label>
              <Textarea
                rows={3}
                value={form.heroSubtitle}
                onChange={(e) => set("heroSubtitle", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardContent className="pt-6">
          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-navy-700/60">
            Backup &amp; Restore
          </h3>
          <p className="mt-2 text-sm text-navy-700/70">
            Content is stored on the server and shared across every visitor and every admin.
            Export a backup regularly in case you need to roll back a change.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4" /> Export Backup (JSON)
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => handleImportFile(e.target.files?.[0])}
            />
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4" /> Import Backup
            </Button>
            <Button
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50"
              onClick={handleReset}
            >
              <RotateCcw className="h-4 w-4" /> Reset to Original Content
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
