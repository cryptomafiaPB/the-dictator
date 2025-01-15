// components/Admin/Topbar.tsx
import { Bell, Search } from "lucide-react";

const Topbar = () => {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 shadow-md">
      <div className="flex items-center space-x-4">
        <Search className="w-5 h-5 text-gray-600" />
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 text-sm border rounded-md"
        />
      </div>
      <div className="flex items-center space-x-4">
        <Bell className="w-5 h-5 text-gray-600" />
        <img
          src="/profile-placeholder.png"
          alt="User"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </div>
  );
};

export default Topbar;
