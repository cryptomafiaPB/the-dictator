"use client";
import CommentsActivityChart from "@/components/admin/CommentsActivityChart";
import EngagementTrends from "@/components/admin/EngagementTrends";
import MostViewedArticles from "@/components/admin/MostViewedArticle";
import RealTimeStats from "@/components/admin/RealTimeStats";
import UserManagement from "@/components/admin/UserManagement";
import UserRoleDistribution from "@/components/admin/UserRoleDistribution";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import UserTable from "../users/components/UserTable";
import ArticleModeration from "@/components/admin/ArticleModeration";
import ActivityLog from "@/components/admin/ActivityLog";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {/* <UserManagement /> */}
        {/* <UserTable /> */}
        {/* <ActivityLog /> */}
        <CommentsActivityChart />
        <RealTimeStats />
        <MostViewedArticles />
        <UserRoleDistribution />
        <EngagementTrends />
      </div>
      <ArticleModeration />
    </div>
  );
};

export default AdminDashboard;

// import prisma from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";

// export default async function AdminDashboard() {
//   const { userId, sessionClaims } = await auth();

//   // Redirect if not admin
//   if (sessionClaims?.publicMetadata?.role !== "admin") {
//     redirect("/");
//   }

//   // Fetch users
//   const users = await prisma.user.findMany();

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
//       <table className="w-full">
//         <thead>
//           <tr>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user.email}</td>
//               <td>{user.role}</td>
//               <td>
//                 <button className="px-2 py-1 bg-blue-500 text-white rounded">
//                   Edit
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
