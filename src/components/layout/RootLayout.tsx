import { Outlet, useLocation } from "react-router-dom";
import { TopBar } from "./TopBar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { BackToTop } from "@/components/shared/BackToTop";

export function RootLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-dvh flex-col bg-[#fbfaf7]">
      <TopBar />
      <Header />
      <main key={location.pathname} className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
}
