"use client";

import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Skeleton } from "../ui/skeleton";

const UserRoleDistribution = () => {
  const [data, setData] = useState<{
    labels: string[];
    datasets: { data: number[]; backgroundColor: string[] }[];
  } | null>(null);

  interface UserRole {
    role: string;
    _count: number;
  }

  const fetchData = async () => {
    const res = await fetch("/api/analytics");
    const { userRoles }: { userRoles: UserRole[] } = await res.json();

    const labels = userRoles.map((role) => role.role);
    const counts = userRoles.map((role) => role._count);

    setData({
      labels,
      datasets: [
        {
          data: counts,
          backgroundColor: ["#4CAF50", "#FFC107", "#2196F3"],
        },
      ],
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data)
    return (
      <div className="h-96 w-full">
        {/* <Selection className=" h-1/2 w-full  mb-4"></Selection> */}
        <Skeleton className=" h-6 w-ful mb-4 rounded-full"></Skeleton>
        <Skeleton className=" h-6 w-ful mb-4  rounded-full"></Skeleton>
        <Skeleton className=" h-20 w-ful mb-4   rounded "></Skeleton>
        <Skeleton className=" h-6 w-ful mb-4 rounded-full"></Skeleton>
        <Skeleton className=" h-6 w-ful mb-4  rounded-full"></Skeleton>
        {/* <Skeleton className=" h-6 w-ful mb-4   rounded-full "></Skeleton> */}
      </div>
    );

  return (
    <div className="p-4 bg-white border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">User Role Distribution</h2>
      <Pie data={data} />
    </div>
  );
};

export default UserRoleDistribution;
