import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type UserDetailsDTO } from "./DTOS/UserDetailsDTO";
import FieldLoader from "../Utils/FieldLoader";
import { useAuth } from "../auth/AuthProvider";
import { Link } from "react-router-dom";
import {
  fetchUserDetails,
  fetchAvailableRoles,
  addUserRole,
} from "../Utils/UserApi";

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserDetailsDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getAccessToken } = useAuth();
  const [roleInput, setRoleInput] = useState("");
  const [addingRole, setAddingRole] = useState(false);
  const [roleError, setRoleError] = useState<string | null>(null);
  const [availableRoles, setAvailableRoles] = useState<string[]>([]);
  const [rolesLoading, setRolesLoading] = useState(true);
  // Fetch available roles on mount
  useEffect(() => {
    const fetchRoles = async () => {
      setRolesLoading(true);
      try {
        const token = getAccessToken();
        if (!token) throw new Error("No access token available");
        const roles = await fetchAvailableRoles(token);
        setAvailableRoles(roles);
      } catch {
        setAvailableRoles([]);
      } finally {
        setRolesLoading(false);
      }
    };
    fetchRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAccessToken]);
  const handleAddRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleInput.trim() || !id) return;
    setAddingRole(true);
    setRoleError(null);
    try {
      const token = getAccessToken();
      if (!token) throw new Error("No access token available");
      const updatedUser = await addUserRole(id, roleInput.trim(), token);
      setUser(updatedUser);
      setRoleInput("");
    } catch (err: any) {
      setRoleError(err.message || "Unknown error");
    } finally {
      setAddingRole(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = getAccessToken();
        if (!token || !id) throw new Error("No access token available");
        const userData = await fetchUserDetails(id, token);
        setUser(userData);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchUser();
  }, [id, getAccessToken]);

  if (loading) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-bold mb-4">User Details</h2>
        <FieldLoader />
        <FieldLoader />
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-red-600">Error: {error}</div>;
  }

  if (!user) {
    return <div className="p-8">No user found.</div>;
  }

  return (
    <div className="p-8 max-w-lg mx-auto">
      <Link
        to="/admin"
        className="text-blue-600 hover:underline text-sm mb-4 inline-block"
      >
        &larr; Back to Admin Panel
      </Link>
      <h2 className="text-xl font-bold mb-4">User Details</h2>
      <div className="mb-2">
        <span className="font-semibold">ID:</span> {user.id}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Email:</span> {user.email}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Name:</span> {user.name}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Active:</span>{" "}
        {user.isActive ? "Yes" : "No"}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Roles:</span> {user.roles.join(", ")}
      </div>
      <form className="mb-4 flex gap-2 items-center" onSubmit={handleAddRole}>
        <select
          value={roleInput}
          onChange={(e) => setRoleInput(e.target.value)}
          className="border px-2 py-1 rounded text-sm"
          disabled={addingRole || rolesLoading}
        >
          <option value="">Select role…</option>
          {availableRoles.map((role) => (
            <option
              key={role}
              value={role}
              disabled={user.roles.includes(role)}
            >
              {role} {user.roles.includes(role) ? "(already assigned)" : ""}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
          disabled={
            addingRole ||
            !roleInput ||
            rolesLoading ||
            user.roles.includes(roleInput)
          }
        >
          {addingRole ? "Adding..." : "Add Role"}
        </button>
      </form>
      {rolesLoading && (
        <div className="text-gray-500 text-sm mb-2">Loading roles…</div>
      )}
      {roleError && (
        <div className="text-red-600 text-sm mb-2">{roleError}</div>
      )}
      <div className="mb-2">
        <span className="font-semibold">Email Verified At:</span>{" "}
        {user.emailVerifiedAt || "-"}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Last Login At:</span>{" "}
        {user.lastLoginAt || "-"}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Created At:</span> {user.createdAt}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Updated At:</span> {user.updatedAt}
      </div>
    </div>
  );
};

export default UserDetails;
