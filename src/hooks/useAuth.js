import { useState, useEffect, useContext } from "react";
import FirebaseContext from "../context/firebase";

const useAuth = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem("authUser", JSON.stringify(user));
        setUser(user);
      } else {
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });

    return () => {
      listener();
    };
  }, [firebase]);

  return { user };
};

export default useAuth;
