import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useUser } from "../context/userContext";
import useRegisterSocket from "../hooks/useRegisterSocket";

const LeadLayout = () => {
  const { lead } = useUser();
  if (!lead) {
    throw new Error("Something went wrong");
  }
  useRegisterSocket(lead.email);

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
