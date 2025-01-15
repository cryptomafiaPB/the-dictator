import dynamic from "next/dynamic";
import KBar from "@/components/Kbar/Kbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const DynamicAppSidebarDashboard = dynamic(
  () => import("@/components/dashboard-layout/AppSiderDashboard"),
  { ssr: false }
);
const DynamicHeaderDashboard = dynamic(
  () => import("@/components/dashboard-layout/Header"),
  { ssr: false }
);

const adminNavItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: "dashboard",
    isActive: false,
    shortcut: ["d", "d"],
    items: [], // Empty array as there are no child items for Dashboard
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: "user",
    isActive: false,
    shortcut: ["u", "u"],
    items: [], // No child items
  },
  {
    title: "Articles",
    url: "/admin/articles",
    icon: "article",
    isActive: false,
    shortcut: ["a", "a"],
    items: [], // No child items
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
    title: "Local Analytics",
    url: "/admin/local-analytics",
    icon: "analytics",
    shortcut: ["a", "a"],
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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <KBar>
      <SidebarProvider defaultOpen={true}>
        <DynamicAppSidebarDashboard navItems={adminNavItems} />
        <SidebarInset>
          <DynamicHeaderDashboard />
          <main className="flex-1 p-4 lg:p-8">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}
