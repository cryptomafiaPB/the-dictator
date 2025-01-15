"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

const EditUserModal = ({
  user,
  onClose,
  onSave,
}: {
  user: any;
  onClose: () => void;
  onSave: () => void;
}) => {
  const [role, setRole] = useState(user.role);

  const handleSave = async () => {
    await fetch(`/api/users/${user.id}/role`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    onSave();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-12 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Edit Role</h2>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="p-2 my-2 border rounded w-full mb-4"
        >
          <option value="reader">Reader</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
        <div className="flex justify-end space-x-2">
          <Button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded text-dark-grey hover:text-foggy-grey"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
