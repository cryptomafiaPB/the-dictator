import AppSidebarDashboard from "@/components/dashboard-layout/AppSiderDashboard";
import HeaderDashboard from "@/components/dashboard-layout/Header";
import KBar from "@/components/Kbar/Kbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const editorNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard/overview",
    icon: "dashboard",
    isActive: false,
    shortcut: ["d", "d"],
    items: [], // Empty array as there are no child items for Dashboard
  },
  {
    title: "Analytics",
    url: "/admin/analytics",
    icon: "analytics",
    shortcut: ["p", "p"],
    isActive: false,
    items: [], // No child items
  },
  {
    title: "Account",
    url: "#", // Placeholder as there is no direct link for the parent
    icon: "billing",
    isActive: true,

    items: [
      {
        title: "Profile",
        url: "/dashboard/profile",
        icon: "userPen",
        shortcut: ["m", "m"],
      },
      {
        title: "Login",
        shortcut: ["l", "l"],
        url: "/",
        icon: "login",
      },
    ],
  },
  {
    title: "Kanban",
    url: "/dashboard/kanban",
    icon: "kanban",
    shortcut: ["k", "k"],
    isActive: false,
    items: [], // No child items
  },
];
export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <KBar>
      <SidebarProvider defaultOpen={true}>
        <AppSidebarDashboard navItems={editorNavItems} />
        <SidebarInset>
          <HeaderDashboard />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}
