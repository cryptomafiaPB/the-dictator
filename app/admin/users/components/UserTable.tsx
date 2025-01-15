"use client";
import { useEffect, useState } from "react";
import EditUserModal from "./EditUserModal";
import { User } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const UserTable = () => {
  const [users, setUsers] = useState<User[]>();
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User>();
  const [showEditModal, setShowEditModal] = useState(false);
  const [roleFilter, setRoleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [pageSize] = useState(10); // Items per page
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    setIsLoading(true);
    const queryParams = new URLSearchParams({
      ...(search && { search }),
      ...(roleFilter && { role: roleFilter }),
      page: currentPage.toString(),
      limit: pageSize.toString(),
    });

    const res = await fetch(`/api/users?${queryParams}`);
    const { users, totalUsers } = await res.json();
    setUsers(users);
    setTotalUsers(totalUsers);
    setIsLoading(false);
  };

  const handleRoleFilterChange = (e: any) => {
    setRoleFilter(e.target.value);
  };

  useEffect(() => {
    fetchUsers();
  }, [search, roleFilter, currentPage]);

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleSave = async () => {
    setShowEditModal(false);
    fetchUsers();
  };

  const totalPages = Math.ceil(totalUsers / pageSize);

  return (
    <div>
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <select
          value={roleFilter}
          onChange={handleRoleFilterChange}
          className="ml-4 p-2 border rounded"
        >
          <option value="">All Roles</option>
          <option value="reader">Reader</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <table className="min-w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="p-2 border-b">Name</th>
            <th className="p-2 border-b">Email</th>
            <th className="p-2 border-b">Role</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={4}>
                <Skeleton className="h-6 w-full mb-4 rounded-full"></Skeleton>
                <Skeleton className="h-6 w-full mb-4  rounded-full"></Skeleton>
                <Skeleton className="h-6 w-full mb-4 rounded-full"></Skeleton>
                <Skeleton className="h-6 w-full mb-4  rounded-full"></Skeleton>
                <Skeleton className="h-6 w-full mb-4 rounded-full"></Skeleton>
                <Skeleton className="h-6 w-full mb-4  rounded-full"></Skeleton>
                <Skeleton className="h-6 w-full mb-4 rounded-full"></Skeleton>
                <Skeleton className="h-6 w-full mb-4  rounded-full"></Skeleton>
              </td>
            </tr>
          ) : (
            users!.map((user) => (
              <tr key={user.id}>
                <td className="p-2 border-b">{user.name || "N/A"}</td>
                <td className="p-2 border-b">{user.email}</td>
                <td className="p-2 border-b">{user.role}</td>
                <td className="p-2 border-b">
                  <Button
                    onClick={() => handleEditClick(user)}
                    className=" text-white bg-blue-600 rounded"
                  >
                    Edit
                  </Button>
                </td>
                <td className="p-2 border-b">
                  <Button
                    onClick={async () => {
                      await fetch(`/api/users/${user.id}/ban`, {
                        method: "PATCH",
                      });
                      fetchUsers();
                    }}
                    className={` ${
                      user.isBanned ? "bg-green-600" : "bg-red-600"
                    } text-white rounded`}
                  >
                    {user.isBanned ? "Unban" : "Ban"}
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      {showEditModal && selectedUser && (
        <div>
          <EditUserModal
            user={selectedUser}
            onClose={() => setShowEditModal(false)}
            onSave={handleSave}
          />
        </div>
      )}
    </div>
  );
};

export default UserTable;
