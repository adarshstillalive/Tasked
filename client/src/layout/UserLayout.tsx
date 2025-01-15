import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import useRegisterSocket from "../hooks/useRegisterSocket";
import { useUser } from "../context/userContext";

const UserLayout = () => {
  const { user } = useUser();
  if (!user) {
    throw new Error("Something went wrong");
  }
  useRegisterSocket(user.email);
  return (
    <>
      <Header />
      <div className="container mx-auto flex justify-center mt-20">
        <Outlet />
      </div>
    </>
  );
};

export default UserLayout;
