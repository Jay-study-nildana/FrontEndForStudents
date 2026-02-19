import React from "react";
import AllUsers from "./AllUsers";

const AdminPanel: React.FC = () => {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      <p className="text-gray-600 mb-8">
        This is a placeholder for the Admin Panel. Future admin features and
        controls will appear here.
      </p>
      <div className="max-w-4xl mx-auto">
        <AllUsers />
      </div>
    </div>
  );
};

export default AdminPanel;
