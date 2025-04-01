import UserForm from "../src/Components/UserForm";
import UserTable from "../src/Components/UserTable";
import Dashboard from "./Pages/Dashboard";
import UserModal from "../src/Components/UserModal";

const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedUser, setSelectedUser] = useState<User | null>(null);

const handleEdit = (user: User) => {
  setSelectedUser(user);
  setIsModalOpen(true);
};

const handleCloseModal = () => {
  setIsModalOpen(false);
  setSelectedUser(null);
};

// Use UserModal component in your render:
<UserModal isOpen={isModalOpen} selectedUser={selectedUser} onClose={handleCloseModal} />

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management Portal</h1>
      <UserForm />
      <UserTable />
    </div>
  );
}

const App = () => {
    return (
      <div>
        <Dashboard />
      </div>
    );
  };

export default App;
