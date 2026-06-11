import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="bg-white shadow h-16 flex justify-between items-center px-6">
      <h1 className="text-xl font-semibold">Attendance Management</h1>

      <div className="flex items-center gap-4">
        <span>{user?.name}</span>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
