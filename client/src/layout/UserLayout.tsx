import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
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
