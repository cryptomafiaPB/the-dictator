/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Skeleton } from "../ui/skeleton";

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    fill: boolean;
  }[];
}

const CommentsActivityChart = () => {
  const [data, setData] = useState<ChartData | null>(null);

  const fetchData = async () => {
    const res = await fetch("/api/analytics/comments");
    const { commentsByDay } = await res.json();

    const dates = commentsByDay.map((entry: any) => entry.date);
    const counts = commentsByDay.map((entry: any) => entry.count);

    setData({
      labels: dates,
      datasets: [
        {
          label: "Comments",
          data: counts,
          borderColor: "rgba(75, 192, 192, 1)",
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
      <h2 className="text-xl font-semibold mb-4">
        Comments Activity (Last 7 Days)
      </h2>
      <Line data={data} />
    </div>
  );
};

export default CommentsActivityChart;
