import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getPhotos, getUser } from "../services/firebase";

const usePhotos = () => {
  const [photos, setPhotos] = useState(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getTimelinePhotos() {
      const [{ following }] = await getUser(user.uid);
      let followedUserPhotos = [];

      if (following?.length > 0) {
        followedUserPhotos = await getPhotos(user.uid, following);
        setPhotos(followedUserPhotos);
      }
    }

    if (user?.uid) {
      getTimelinePhotos();
    }
  }, [user.uid]);

  return { photos };
};

export default usePhotos;
