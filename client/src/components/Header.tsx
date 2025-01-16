import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("userAuthToken");

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userAuthToken");
    navigate("/auth/user");
  };

  return (
    <nav className="h-16 flex justify-between items-center px-6 bg-gray-100 shadow-md fixed top-0 left-0 w-full z-10">
      <h1 className="text-2xl font-bold text-gray-800">Tasked.</h1>
      {token && (
        <button
          className="px-4 py-2 bg-black text-white font-medium rounded hover:bg-gray-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Header;
