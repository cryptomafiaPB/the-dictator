// components/Admin/Layout.tsx
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
