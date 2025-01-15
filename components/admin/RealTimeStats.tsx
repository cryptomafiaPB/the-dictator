"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const RealTimeStats = () => {
  const [stats, setStats] = useState({
    users: {
      current: 0,
      lastMonth: 0,
      percentageChange: 0,
    },
    articles: {
      current: 0,
      lastMonth: 0,
      percentageChange: 0,
    },
    comments: {
      current: 0,
      lastMonth: 0,
      percentageChange: 0,
    },
    reports: {
      current: 0,
      lastMonth: 0,
      percentageChange: 0,
    },
  });

  useEffect(() => {
    fetch("/api/analytics/total")
      .then((response) => response.json())
      .then((data) => {
        setStats(data);
      });
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.users.current}</div>
          <p className="text-xs text-muted-foreground">
            +{stats.users.percentageChange.toFixed(2)}% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Aricles</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.articles.current}</div>
          <p className="text-xs text-muted-foreground">
            +{stats.articles.percentageChange.toFixed(2)}% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Comments</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M2 10h20" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{stats.comments.current}</div>
          <p className="text-xs text-muted-foreground">
            +{stats.comments.percentageChange.toFixed(2)}% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Reports</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{stats.reports.current}</div>
          <p className="text-xs text-muted-foreground">
            +{stats.reports.percentageChange.toFixed(2)}% from last month
          </p>
        </CardContent>
      </Card>
    </div>
    // <div className="p-4 bg-white border rounded-lg shadow-md">
    //   <h2 className="text-xl font-semibold mb-4">Real-Time Stats</h2>
    //   <ul>
    //     <li>Total Users: {stats.totalUsers}</li>
    //     <li>Total Articles: {stats.totalArticles}</li>
    //     <li>Total Comments: {stats.totalComments}</li>
    //   </ul>
    // </div>
  );
};

export default RealTimeStats;
