import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const LeadLayout = () => {
  return (
    <>
      <Header />
      <div className="container justify-center mt-16">
        <Outlet />
      </div>
    </>
  );
};

export default LeadLayout;
