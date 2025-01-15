"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const EngagementTrends = () => {
  const [data, setData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      fill: boolean;
    }[];
  }>({
    labels: [],
    datasets: [],
  });

  const fetchData = async () => {
    const res = await fetch("/api/analytics");
    const { engagementTrends } = await res.json();

    const dates = engagementTrends.map((trend: any) =>
      trend.createdAt.slice(0, 10)
    );
    const likes = engagementTrends.map((trend: any) => trend._sum.likes || 0);
    const dislikes = engagementTrends.map(
      (trend: any) => trend._sum.dislikes || 0
    );

    setData({
      labels: dates,
      datasets: [
        {
          label: "Likes",
          data: likes,
          borderColor: "rgba(75, 192, 192, 1)",
          fill: false,
        },
        {
          label: "Dislikes",
          data: dislikes,
          borderColor: "rgba(255, 99, 132, 1)",
          fill: false,
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
        <div className="animate-pulse h-1/2 w-full bg-gray-300 mb-4"></div>
        <div className="animate-pulse h-1/2 w-full bg-gray-300"></div>
      </div>
    );

  return (
    <div className="p-4 bg-white border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Article Engagement Trends</h2>
      <Line data={data} />
    </div>
  );
};

export default EngagementTrends;
