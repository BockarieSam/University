import * as React from "react";
import type { Program, NewsItem, Testimonial, FaqItem, SiteSettings } from "@/types";
import { apiFetch, ApiError } from "@/lib/api";

interface ContentState {
  programs: Program[];
  news: NewsItem[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
  settings: SiteSettings;
}

const EMPTY_STATE: ContentState = {
  programs: [],
  news: [],
  testimonials: [],
  faqs: [],
  settings: {
    address: "",
    phonePrimary: "",
    phoneSecondary: "",
    email: "",
    whatsappNumber: "",
    heroEyebrow: "",
    heroTitle: "",
    heroSubtitle: "",
  },
};

interface ContentContextValue extends ContentState {
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;

  addProgram: (program: Omit<Program, "id">) => Promise<void>;
  updateProgram: (id: string, updates: Partial<Program>) => Promise<void>;
  deleteProgram: (id: string) => Promise<void>;

  addNews: (item: Omit<NewsItem, "id">) => Promise<void>;
  updateNews: (id: string, updates: Partial<NewsItem>) => Promise<void>;
  deleteNews: (id: string) => Promise<void>;

  addTestimonial: (item: Omit<Testimonial, "id">) => Promise<void>;
  updateTestimonial: (id: string, updates: Partial<Testimonial>) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;

  addFaq: (item: FaqItem) => Promise<void>;
  updateFaq: (index: number, updates: FaqItem) => Promise<void>;
  deleteFaq: (index: number) => Promise<void>;
  reorderFaq: (fromIndex: number, toIndex: number) => Promise<void>;

  updateSettings: (updates: Partial<SiteSettings>) => Promise<void>;

  resetToDefaults: () => Promise<void>;
  exportJson: () => string;
  importJson: (json: string) => Promise<{ ok: boolean; error?: string }>;
}

const ContentContext = React.createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<ContentState>(EMPTY_STATE);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const refresh = React.useCallback(async () => {
    try {
      const data = await apiFetch<ContentState>("/api/content", { skipAuthRedirect: true });
      setState(data);
      setError(null);
    } catch (e) {
      setError(
        e instanceof ApiError
          ? e.message
          : "Couldn't reach the SSCTVET server. Is it running? (npm run dev starts both the site and the API.)"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  const value = React.useMemo<ContentContextValue>(() => {
    return {
      ...state,
      loading,
      error,
      refresh,

      addProgram: async (program) => {
        await apiFetch("/api/programs", { method: "POST", body: JSON.stringify(program) });
        await refresh();
      },
      updateProgram: async (id, updates) => {
        await apiFetch(`/api/programs/${id}`, { method: "PUT", body: JSON.stringify(updates) });
        await refresh();
      },
      deleteProgram: async (id) => {
        await apiFetch(`/api/programs/${id}`, { method: "DELETE" });
        await refresh();
      },

      addNews: async (item) => {
        await apiFetch("/api/news", { method: "POST", body: JSON.stringify(item) });
        await refresh();
      },
      updateNews: async (id, updates) => {
        await apiFetch(`/api/news/${id}`, { method: "PUT", body: JSON.stringify(updates) });
        await refresh();
      },
      deleteNews: async (id) => {
        await apiFetch(`/api/news/${id}`, { method: "DELETE" });
        await refresh();
      },

      addTestimonial: async (item) => {
        await apiFetch("/api/testimonials", { method: "POST", body: JSON.stringify(item) });
        await refresh();
      },
      updateTestimonial: async (id, updates) => {
        await apiFetch(`/api/testimonials/${id}`, { method: "PUT", body: JSON.stringify(updates) });
        await refresh();
      },
      deleteTestimonial: async (id) => {
        await apiFetch(`/api/testimonials/${id}`, { method: "DELETE" });
        await refresh();
      },

      addFaq: async (item) => {
        await apiFetch("/api/faqs", { method: "POST", body: JSON.stringify(item) });
        await refresh();
      },
      updateFaq: async (index, updates) => {
        await apiFetch(`/api/faqs/${index}`, { method: "PUT", body: JSON.stringify(updates) });
        await refresh();
      },
      deleteFaq: async (index) => {
        await apiFetch(`/api/faqs/${index}`, { method: "DELETE" });
        await refresh();
      },
      reorderFaq: async (fromIndex, toIndex) => {
        await apiFetch("/api/faqs/reorder", {
          method: "PUT",
          body: JSON.stringify({ fromIndex, toIndex }),
        });
        await refresh();
      },

      updateSettings: async (updates) => {
        await apiFetch("/api/settings", { method: "PUT", body: JSON.stringify(updates) });
        await refresh();
      },

      resetToDefaults: async () => {
        await apiFetch("/api/backup/reset", { method: "POST" });
        await refresh();
      },
      exportJson: () => JSON.stringify(state, null, 2),
      importJson: async (json) => {
        try {
          const parsed = JSON.parse(json);
          await apiFetch("/api/backup/import", { method: "POST", body: JSON.stringify(parsed) });
          await refresh();
          return { ok: true };
        } catch (e) {
          return {
            ok: false,
            error: e instanceof ApiError ? e.message : e instanceof Error ? e.message : "Invalid JSON",
          };
        }
      },
    };
  }, [state, loading, error, refresh]);

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#fbfaf7]">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-navy-900/15 border-t-emerald-600" />
      </div>
    );
  }

  if (error && state === EMPTY_STATE) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#fbfaf7] px-6">
        <div className="max-w-sm rounded-2xl bg-white p-8 text-center shadow-soft">
          <p className="font-display text-base font-bold text-navy-900">Couldn't load the site</p>
          <p className="mt-2 text-sm text-navy-700/70">{error}</p>
          <button
            onClick={refresh}
            className="mt-5 rounded-full bg-navy-900 px-5 py-2 text-sm font-semibold text-white hover:bg-navy-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = React.useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within a ContentProvider");
  return ctx;
}
