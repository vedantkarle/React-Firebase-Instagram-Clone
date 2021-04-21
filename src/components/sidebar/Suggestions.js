import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getUserSuggestions } from "../../services/firebase";
import Skeleton from "react-loading-skeleton";
import SuggestedProfiles from "./SuggestedProfiles";

const Suggestions = ({ userId, following, loggedInUserDocId }) => {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getUserSuggestions(userId, following);
      setProfiles(response);
    }

    if (userId) {
      suggestedProfiles();
    }
  }, [userId, following]);

  return !profiles ? (
    <Skeleton count={1} height={150} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
      <div className="text-sm mt-4 grid gap-5">
        {profiles.map((profile) => (
          <SuggestedProfiles
            key={profile.id}
            spDocId={profile.id}
            username={profile.username}
            profileId={profile.userId}
            userId={userId}
            loggedInUserDocId={loggedInUserDocId}
          />
        ))}
      </div>
    </div>
  ) : null;
};

export default Suggestions;

Suggestions.propTypes = {
  userId: PropTypes.string,
};
