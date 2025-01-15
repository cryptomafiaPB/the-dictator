/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // const fetchUsers = async () => {
  //   const res = await fetch("/api/users");
  //   const data = await res.json();
  //   setUsers(data);
  //   setIsLoading(false);
  // };

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    const res = await fetch("/api/users/role", {
      method: "PUT",
      body: JSON.stringify({ userId, newRole }),
    });
    const data = await res.json();
    alert(`User role updated to ${data.user.role}`);
    fetchUsers();
  };

  if (isLoading)
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
  if (error) return <div>Error: {error}</div>;
  //   if (!Array.isArray(users)) return <div>Invalid data format</div>;

  return (
    <div className="p-4 bg-white border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="py-2 px-4">User</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) &&
            users.map((user: any) => (
              <tr key={user.id}>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.role}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() =>
                      handleRoleChange(
                        user.id,
                        user.role === "admin" ? "reader" : "admin"
                      )
                    }
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    {user.role === "admin"
                      ? "Demote to Reader"
                      : "Promote to Admin"}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
