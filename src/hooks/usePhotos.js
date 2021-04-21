import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getPhotos, getUser } from "../services/firebase";

const usePhotos = () => {
  const [photos, setPhotos] = useState(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getTimelinePhotos() {
      const followingUserIds = await getUser(user.uid).following;
      let followedUserPhotos = [];

      if (following.length > 0) {
        followedUserPhotos = await getPhotos(user.uid, followingUserIds);
      }
    }

    if (user?.uid) {
      getTimelinePhotos();
    }
  }, []);

  return { photos };
};

export default usePhotos;
