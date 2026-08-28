import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Seo } from "@/components/shared/Seo";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useConfirmDelete } from "@/components/admin/ConfirmDelete";
import { useContent } from "@/store/ContentContext";

export default function AdminTestimonialsList() {
  const { testimonials, deleteTestimonial } = useContent();
  const { confirmDelete, dialog } = useConfirmDelete();

  return (
    <>
      <Seo title="Manage Testimonials" description="SSCTVET content dashboard." />
      <AdminPageHeader
        title="Testimonials"
        description="Student success stories shown on the homepage."
        actions={
          <Button asChild>
            <Link to="/admin/testimonials/new">
              <Plus className="h-4 w-4" /> Add Testimonial
            </Link>
          </Button>
        }
      />

      <Card>
        <div className="divide-y divide-navy-900/8">
          {testimonials.length === 0 && (
            <p className="p-8 text-center text-sm text-navy-700/60">
              No testimonials yet. Add your first one.
            </p>
          )}
          {testimonials.map((t) => (
            <div key={t.id} className="flex items-center gap-4 p-4 sm:p-5">
              <img src={t.image} alt={t.name} className="h-12 w-12 shrink-0 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-sm font-bold text-navy-900">{t.name}</p>
                <p className="truncate text-xs text-navy-700/60">
                  {t.program} · {t.role}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link to={`/admin/testimonials/${t.id}`}>
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-600 hover:bg-red-50"
                  onClick={() => confirmDelete(t.name, () => deleteTestimonial(t.id))}
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
