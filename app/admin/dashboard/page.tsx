"use client";
import CommentsActivityChart from "@/components/admin/CommentsActivityChart";
import EngagementTrends from "@/components/admin/EngagementTrends";
import MostViewedArticles from "@/components/admin/MostViewedArticle";
import RealTimeStats from "@/components/admin/RealTimeStats";
import UserRoleDistribution from "@/components/admin/UserRoleDistribution";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import ArticleModeration from "@/components/admin/ArticleModeration";

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
