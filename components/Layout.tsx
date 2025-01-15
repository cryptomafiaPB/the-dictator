/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Header } from "./header";
import { MainNav } from "./main-nav";
import { Footer } from "./footer";
import { usePathname } from "next/navigation";
import Sidebar from "./admin/Sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./AppSider";
import { NewsContent } from "./news-content";
import KBar from "./Kbar/Kbar";
import AppSidebarDashboard from "./dashboard-layout/AppSiderDashboard";
import HeaderDashboard from "./dashboard-layout/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPageOrEditor =
    pathname.startsWith("/admin") || pathname.startsWith("/editor");
  return isAdminPageOrEditor ? (
    // <KBar>
    //   <SidebarProvider defaultOpen={true}>
    //     <AppSidebarDashboard />
    //     <SidebarInset>
    //       <HeaderDashboard />
    /* page main content */
    <>{children}</>
  ) : (
    /* page main content ends */
    //     </SidebarInset>
    //   </SidebarProvider>
    // </KBar>
    // <div className="min-h-screen bg-gray-100 flex overflow-auto">
    //   <Sidebar />
    //   <main className="p-2 w-full md:p-8 ml-64">{children}</main>
    // </div>
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
