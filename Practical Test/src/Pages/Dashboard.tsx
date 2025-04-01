import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Dashboard: React.FC = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const [roleFilter, setRoleFilter] = useState<string>("");

  // Filter users by role (Optional feature)
  const filteredUsers = roleFilter
    ? users.filter((user) => user.role === roleFilter)
    : users;

  // Dashboard Summary
  const totalUsers = users.length;
  const totalActiveUsers = users.filter((user) => user.status === "Active").length;
  const totalInactiveUsers = users.filter((user) => user.status === "Inactive").length;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

      {/* Dashboard Overview */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-md rounded p-4 text-center">
          <h2 className="text-xl font-medium">Total Users</h2>
          <p className="text-2xl font-semibold">{totalUsers}</p>
        </div>
        <div className="bg-white shadow-md rounded p-4 text-center">
          <h2 className="text-xl font-medium">Active Users</h2>
          <p className="text-2xl font-semibold">{totalActiveUsers}</p>
        </div>
        <div className="bg-white shadow-md rounded p-4 text-center">
          <h2 className="text-xl font-medium">Inactive Users</h2>
          <p className="text-2xl font-semibold">{totalInactiveUsers}</p>
        </div>
      </div>

      {/* Filter by Role */}
      <div className="mb-6">
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border p-2 w-full max-w-xs"
        >
          <option value="">Filter by Role</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          <option value="Manager">Manager</option>
          <option value="Supervisor">Supervisor</option>
        </select>
      </div>

      {/* User List Preview */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">User List</h2>
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-2">No users found</td>
              </tr>
            ) : (
              filteredUsers.slice(0, 5).map((user) => (
                <tr key={user.id}>
                  <td className="border p-2">{user.firstName} {user.lastName}</td>
                  <td className="border p-2">{user.role}</td>
                  <td className="border p-2">{user.status}</td>
                  <td className="border p-2">
                    <Link to={`/users/${user.id}`} className="text-blue-500">View</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex space-x-4">
        <Link to="/add-user">
          <button className="bg-blue-500 text-white px-6 py-2 rounded shadow-md hover:bg-blue-600">
            Add New User
          </button>
        </Link>
        <Link to="/user-list">
          <button className="bg-gray-500 text-white px-6 py-2 rounded shadow-md hover:bg-gray-600">
            View All Users
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
