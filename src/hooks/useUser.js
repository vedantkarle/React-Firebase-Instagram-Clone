import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getUser } from "../services/firebase";

const useUser = () => {
  const [activeUser, setActiveUser] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getUserById() {
      const [response] = await getUser(user.uid);
      setActiveUser(response);
    }

    if (user?.uid) {
      getUserById();
    }
  }, [user]);

  return { userData: activeUser };
};

export default useUser;
