import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Seo } from "@/components/shared/Seo";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useConfirmDelete } from "@/components/admin/ConfirmDelete";
import { useContent } from "@/store/ContentContext";

export default function AdminProgramsList() {
  const { programs, deleteProgram } = useContent();
  const { confirmDelete, dialog } = useConfirmDelete();

  return (
    <>
      <Seo title="Manage Programs" description="SSCTVET content dashboard." />
      <AdminPageHeader
        title="Programs"
        description="Technical & vocational programs shown across the site."
        actions={
          <Button asChild>
            <Link to="/admin/programs/new">
              <Plus className="h-4 w-4" /> Add Program
            </Link>
          </Button>
        }
      />

      <Card>
        <div className="divide-y divide-navy-900/8">
          {programs.length === 0 && (
            <p className="p-8 text-center text-sm text-navy-700/60">
              No programs yet. Add your first one.
            </p>
          )}
          {programs.map((p) => (
            <div key={p.id} className="flex items-center gap-4 p-4 sm:p-5">
              <img src={p.image} alt={p.title} className="h-14 w-14 shrink-0 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-sm font-bold text-navy-900">{p.title}</p>
                <p className="truncate text-xs text-navy-700/60">
                  /{p.slug} · {p.category}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link to={`/admin/programs/${p.id}`}>
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-600 hover:bg-red-50"
                  onClick={() => confirmDelete(p.title, () => deleteProgram(p.id))}
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
