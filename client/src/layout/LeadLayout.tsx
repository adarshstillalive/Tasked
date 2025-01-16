import { Outlet } from "react-router-dom";
import { useUser } from "../context/userContext";
import useRegisterSocket from "../hooks/useRegisterSocket";
import HeaderLead from "../components/HeaderLead";

const LeadLayout = () => {
  const { lead } = useUser();
  if (!lead) {
    throw new Error("Something went wrong");
  }
  useRegisterSocket(lead.email);

  return (
    <>
      <HeaderLead />
      <div className="mt-16">
        <Outlet />
      </div>
    </>
  );
};

export default LeadLayout;
