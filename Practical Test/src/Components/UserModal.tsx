import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../store/userSlice";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  dob: string;
  gender: string;
  country: string;
  state: string;
  city: string;
  address: string;
  pincode: string;
  status: string;
}

interface UserModalProps {
  isOpen: boolean;
  selectedUser: User | null;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, selectedUser, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<User | null>(null);

  // Populate the form with selected user's data
  useEffect(() => {
    if (selectedUser) {
      setFormData(selectedUser);
    }
  }, [selectedUser]);

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (formData) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      dispatch(updateUser(formData));
      onClose(); // Close the modal after updating the user
    }
  };

  // Return nothing if the modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">{selectedUser ? "Edit User" : "View User"}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData?.firstName || ""}
                onChange={handleChange}
                className="border p-2 w-full"
                disabled={!selectedUser}
              />
            </div>

            <div>
              <label className="block text-sm">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData?.lastName || ""}
                onChange={handleChange}
                className="border p-2 w-full"
                disabled={!selectedUser}
              />
            </div>

            <div>
              <label className="block text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={formData?.email || ""}
                onChange={handleChange}
                className="border p-2 w-full"
                disabled={!selectedUser}
              />
            </div>

            <div>
              <label className="block text-sm">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData?.phone || ""}
                onChange={handleChange}
                className="border p-2 w-full"
                disabled={!selectedUser}
              />
            </div>

            <div>
              <label className="block text-sm">Role</label>
              <select
                name="role"
                value={formData?.role || ""}
                onChange={handleChange}
                className="border p-2 w-full"
                disabled={!selectedUser}
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Manager">Manager</option>
                <option value="Supervisor">Supervisor</option>
              </select>
            </div>

            <div>
              <label className="block text-sm">Status</label>
              <select
                name="status"
                value={formData?.status || ""}
                onChange={handleChange}
                className="border p-2 w-full"
                disabled={!selectedUser}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="bg-gray-300 p-2 rounded"
                onClick={onClose}
              >
                Cancel
              </button>
              {selectedUser && (
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Update User
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
