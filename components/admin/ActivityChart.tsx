"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const ActivityChart = () => {
  interface ChartData {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  }

  const [data, setData] = useState<ChartData | null>(null);

  const fetchData = async () => {
    const res = await fetch("/api/analytics");
    const { registrations, logins } = await res.json();

    const dates = [
      ...new Set([...registrations, ...logins].map((d) => d.date)),
    ].sort();
    const registrationData: number[] = dates.map(
      (date: string) =>
        registrations.find(
          (d: { date: string; count: number }) => d.date === date
        )?.count || 0
    );
    const loginData: number[] = dates.map(
      (date: string) =>
        logins.find((d: { date: string; count: number }) => d.date === date)
          ?.count || 0
    );

    setData({
      labels: dates,
      datasets: [
        {
          label: "Registrations",
          data: registrationData,
          backgroundColor: "rgba(75, 192, 192, 0.5)",
        },
        {
          label: "Logins",
          data: loginData,
          backgroundColor: "rgba(153, 102, 255, 0.5)",
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
    <Card>
      <CardHeader>
        <CardTitle>User Activity (Last 7 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <Bar
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              title: { display: true, text: "Weekly User Activity" },
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

export default ActivityChart;
