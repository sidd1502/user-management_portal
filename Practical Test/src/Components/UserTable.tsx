import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const UserTable = () => {
  const users = useSelector((state: RootState) => state.users.users);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">User List</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center p-2">No users added</td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={index}>
                <td className="border p-2">{user.firstName} {user.lastName}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.phone}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2">{user.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
