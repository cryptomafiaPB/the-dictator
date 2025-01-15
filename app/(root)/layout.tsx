import { Footer } from "@/components/footer";
import { MainNav } from "@/components/main-nav";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/AppSider";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <main className="w-full min-h-screen bg-[url('/noise-light.svg')] dark:bg-gray-900">
        <Header />
        <MainNav />
        <main>{children}</main>
        <Footer />
      </main>
    </SidebarProvider>
  );
}
