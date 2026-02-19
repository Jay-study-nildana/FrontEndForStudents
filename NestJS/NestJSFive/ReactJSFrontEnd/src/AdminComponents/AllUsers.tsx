import React, { useEffect, useState } from "react";
import { type AllUsersResponseDTO } from "./AllUsersDTO";
import FieldLoader from "../Utils/FieldLoader";
import { Link } from "react-router-dom";
const API_URL = "http://localhost:3000/adminpanel/users?isActive=true";
import { useAuth } from "../auth/AuthProvider";

const AllUsers: React.FC = () => {
  const [users, setUsers] = useState<AllUsersResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getAccessToken } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = getAccessToken();
        if (!token) throw new Error("No access token available");
        const res = await fetch(API_URL, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [getAccessToken]);

  if (loading) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-bold mb-4">All Users</h2>
        <FieldLoader />
        <FieldLoader />
        <FieldLoader />
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">All Users</h2>
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Active</th>
            <th className="border px-2 py-1">Roles</th>
            <th className="border px-2 py-1">Created</th>
          </tr>
        </thead>
        <tbody>
          {users?.data.map((user) => (
            <tr key={user.id}>
              <td className="border px-2 py-1">
                <Link
                  to={`/admin/users/${user.id}`}
                  className="text-blue-600 hover:underline break-all"
                  title="View user details"
                >
                  {user.id}
                </Link>
              </td>
              <td className="border px-2 py-1">{user.email}</td>
              <td className="border px-2 py-1">{user.name}</td>
              <td className="border px-2 py-1">
                {user.isActive ? "Yes" : "No"}
              </td>
              <td className="border px-2 py-1">{user.roles.join(", ")}</td>
              <td className="border px-2 py-1">{user.createdAt}</td>
            </tr>
          )) || (
            <tr>
              <td colSpan={6} className="text-center py-4">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* TODO: Add pagination controls if needed */}
    </div>
  );
};

export default AllUsers;
