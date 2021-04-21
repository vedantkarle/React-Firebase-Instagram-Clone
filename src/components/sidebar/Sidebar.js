import React from "react";
import useUser from "../../hooks/useUser";
import User from "./User";
import Suggestions from "./Suggestions";

const Sidebar = () => {
  const { userData } = useUser();

  return (
    <div className="p-4">
      <User username={userData?.username} fullName={userData?.fullName} />
      <Suggestions
        userId={userData?.userId}
        following={userData?.following}
        loggedInUserDocId={userData?.id}
      />
    </div>
  );
};

export default Sidebar;
