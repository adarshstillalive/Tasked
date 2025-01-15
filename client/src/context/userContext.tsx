import { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "../interfaces/IUser";

interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  lead: IUser | null;
  setLead: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [lead, setLead] = useState<IUser | null>(() => {
    const storedLead = localStorage.getItem("lead");
    return storedLead ? JSON.parse(storedLead) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (lead) {
      localStorage.setItem("lead", JSON.stringify(lead));
    } else {
      localStorage.removeItem("lead");
    }
  }, [lead]);

  return (
    <UserContext.Provider value={{ user, setUser, lead, setLead }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
