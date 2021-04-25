import { useReducer, useEffect } from "react";
import { getUserPhotosByUserId } from "../../services/firebase";
import Header from "./Header";
import Photos from "./Photos";

const reducer = (state, newState) => ({ ...state, ...newState });

const initialState = {
  profile: {},
  photosCollection: [],
  followerCount: 0,
};

const UserProfile = ({ user }) => {
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUserId(user?.userId);
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user?.followers?.length,
      });
    }

    if (user?.username) {
      getProfileInfoAndPhotos();
    }
  }, [user]);

  return (
    <>
      <Header
        photosCount={photosCollection ? photosCollection?.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </>
  );
};

export default UserProfile;
