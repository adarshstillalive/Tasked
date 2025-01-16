import { useNavigate } from "react-router-dom";

const HeaderLead = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("lead");
    localStorage.removeItem("leadAuthToken");
    navigate("/auth/lead");
  };
  return (
    <nav className="h-16 flex justify-between items-center px-6 bg-gray-100 shadow-md fixed top-0 left-0 w-full z-10">
      <h1 className="text-2xl font-bold text-gray-800">Tasked.</h1>
      <button
        className="px-4 py-2 bg-black text-white font-medium rounded hover:bg-gray-700"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
};

export default HeaderLead;
