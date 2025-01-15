"use client";

import { Activity } from "@prisma/client";
import { useState, useEffect } from "react";
import { Skeleton } from "../ui/skeleton";

const ActivityLog = () => {
  const [logs, setLogs] = useState<Activity[]>();
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    const res = await fetch("/api/activity-log");
    const data = await res.json();
    setLogs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  if (loading)
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
      <h2 className="text-xl font-semibold mb-4">Activity Log</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="py-2 px-4">Action</th>
            <th className="py-2 px-4">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs &&
            logs.map((log) => (
              <tr key={log.id}>
                <td className="py-2 px-4">{log.action}</td>
                <td className="py-2 px-4">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityLog;
