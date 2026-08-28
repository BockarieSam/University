import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Seo } from "@/components/shared/Seo";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useConfirmDelete } from "@/components/admin/ConfirmDelete";
import { useContent } from "@/store/ContentContext";

export default function AdminNewsList() {
  const { news, deleteNews } = useContent();
  const { confirmDelete, dialog } = useConfirmDelete();

  return (
    <>
      <Seo title="Manage News" description="SSCTVET content dashboard." />
      <AdminPageHeader
        title="News & Events"
        description="Announcements shown on the homepage and News page."
        actions={
          <Button asChild>
            <Link to="/admin/news/new">
              <Plus className="h-4 w-4" /> Post Update
            </Link>
          </Button>
        }
      />

      <Card>
        <div className="divide-y divide-navy-900/8">
          {news.length === 0 && (
            <p className="p-8 text-center text-sm text-navy-700/60">
              No news items yet. Post your first update.
            </p>
          )}
          {news.map((item) => (
            <div key={item.id} className="flex flex-wrap items-center gap-4 p-4 sm:p-5">
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <Badge variant="emerald">{item.category}</Badge>
                  <span className="text-xs text-navy-700/55">{item.date}</span>
                </div>
                <p className="truncate font-display text-sm font-bold text-navy-900">
                  {item.title}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link to={`/admin/news/${item.id}`}>
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-600 hover:bg-red-50"
                  onClick={() => confirmDelete(item.title, () => deleteNews(item.id))}
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
