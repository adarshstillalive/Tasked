import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const LeadLayout = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto flex justify-center mt-20">
        <Outlet />
      </div>
    </>
  );
};

export default LeadLayout;
