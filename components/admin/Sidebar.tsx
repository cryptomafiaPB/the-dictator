// components/Admin/Sidebar.tsx
import { Home, Users, FileText, Settings, AlertCircle } from "lucide-react";
import Link from "next/link";
import { RiAdminFill } from "react-icons/ri";

const Sidebar = () => {
  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: Home },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Articles", href: "/admin/articles", icon: FileText },
    { name: "Categories", href: "/admin/categories", icon: FileText },
    { name: "Comments", href: "/admin/comments", icon: FileText },
    { name: "Reports", href: "/admin/reports", icon: AlertCircle },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="h-screen bg-gray-800 text-white w-64 fixed">
      <div className="p-4 text-lg font-semibold flex flex-row items-center gap-4 text border-b border-gray-50">
        <RiAdminFill className="w-5 h-5" />
        Admin Panel
      </div>
      <nav className="mt-2 space-y-2 flex flex-col">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center pl-8 p-2 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <item.icon className="w-5 h-5 mr-2" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
