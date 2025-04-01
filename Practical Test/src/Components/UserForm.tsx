import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser, deleteUser, setUsers } from "../store/userSlice";
import { RootState } from "../store/store";

const UserForm = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      dispatch(setUsers(JSON.parse(savedUsers)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "User",
    dob: "",
    gender: "Male",
    country: "",
    state: "",
    city: "",
    address: "",
    pincode: "",
    status: "Active",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateUser(formData));
      alert("User updated successfully!");
    } else {
      dispatch(addUser(formData));
      alert("User added successfully!");
    }
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "User",
      dob: "",
      gender: "Male",
      country: "",
      state: "",
      city: "",
      address: "",
      pincode: "",
      status: "Active",
    });
    setSelectedUser(null);
    setIsEditing(false);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData(user);
    setIsEditing(true);
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    dispatch(deleteUser(userToDelete.id));
    setShowDeleteConfirm(false);
    alert("User deleted successfully!");
  };

  const filteredUsers = users.filter((user) =>
    (user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase())) &&
    (roleFilter === "" || user.role === roleFilter)
  );

  return (
    <div>
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded">
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="First Name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="border p-2" required />
          <input type="text" placeholder="Last Name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="border p-2" required />
          <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="border p-2" required />
          <input type="text" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="border p-2" required />
          <button type="submit" className="mt-4 p-2 bg-blue-500 text-white">{isEditing ? "Update User" : "Add User"}</button>
        </div>
      </form>
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">User List</h2>
        <input type="text" placeholder="Search by Name" value={search} onChange={(e) => setSearch(e.target.value)} className="border p-2 mb-2 w-full" />
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="border p-2 mb-2 w-full">
          <option value="">All Roles</option>
          <option>Admin</option>
          <option>User</option>
          <option>Manager</option>
          <option>Supervisor</option>
        </select>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-2">No users found</td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr key={index} className="cursor-pointer">
                  <td className="border p-2">{user.firstName} {user.lastName}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{user.phone}</td>
                  <td className="border p-2">{user.role}</td>
                  <td className="border p-2">{user.status}</td>
                  <td className="border p-2">
                    <button className="text-blue-500" onClick={() => handleEdit(user)}>Edit</button>
                    <button className="text-red-500 ml-2" onClick={() => handleDelete(user)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserForm;
