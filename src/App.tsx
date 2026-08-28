import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { RootLayout } from "@/components/layout/RootLayout";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { RequireAdminAuth } from "@/components/admin/RequireAdminAuth";
import { ContentProvider } from "@/store/ContentContext";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Programs = lazy(() => import("@/pages/Programs"));
const ProgramDetails = lazy(() => import("@/pages/ProgramDetails"));
const Admissions = lazy(() => import("@/pages/Admissions"));
const Campus = lazy(() => import("@/pages/Campus"));
const News = lazy(() => import("@/pages/News"));
const NewsDetails = lazy(() => import("@/pages/NewsDetails"));
const Contact = lazy(() => import("@/pages/Contact"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const AdminLogin = lazy(() => import("@/pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminProgramsList = lazy(() => import("@/pages/admin/AdminProgramsList"));
const AdminProgramEditor = lazy(() => import("@/pages/admin/AdminProgramEditor"));
const AdminNewsList = lazy(() => import("@/pages/admin/AdminNewsList"));
const AdminNewsEditor = lazy(() => import("@/pages/admin/AdminNewsEditor"));
const AdminTestimonialsList = lazy(() => import("@/pages/admin/AdminTestimonialsList"));
const AdminTestimonialEditor = lazy(() => import("@/pages/admin/AdminTestimonialEditor"));
const AdminFaqManager = lazy(() => import("@/pages/admin/AdminFaqManager"));
const AdminSettings = lazy(() => import("@/pages/admin/AdminSettings"));

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-9 w-9 animate-spin rounded-full border-2 border-navy-900/15 border-t-emerald-600" />
    </div>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="programs" element={<Programs />} />
              <Route path="programs/:slug" element={<ProgramDetails />} />
              <Route path="admissions" element={<Admissions />} />
              <Route path="campus" element={<Campus />} />
              <Route path="news" element={<News />} />
              <Route path="news/:slug" element={<NewsDetails />} />
              <Route path="contact" element={<Contact />} />
              <Route path="404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="admin/login" element={<AdminLogin />} />
            <Route
              path="admin"
              element={
                <RequireAdminAuth>
                  <AdminLayout />
                </RequireAdminAuth>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="programs" element={<AdminProgramsList />} />
              <Route path="programs/new" element={<AdminProgramEditor />} />
              <Route path="programs/:id" element={<AdminProgramEditor />} />
              <Route path="news" element={<AdminNewsList />} />
              <Route path="news/new" element={<AdminNewsEditor />} />
              <Route path="news/:id" element={<AdminNewsEditor />} />
              <Route path="testimonials" element={<AdminTestimonialsList />} />
              <Route path="testimonials/new" element={<AdminTestimonialEditor />} />
              <Route path="testimonials/:id" element={<AdminTestimonialEditor />} />
              <Route path="faq" element={<AdminFaqManager />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ContentProvider>
  );
}
