import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/useUser";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";

const Header = ({ photosCount, profile, followerCount, setFollowerCount }) => {
  const { userData } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeButtonFollow =
    profile?.username && profile?.username !== userData?.username;

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
    await toggleFollow(
      isFollowingProfile,
      userData?.id,
      profile?.docId,
      profile?.userId,
      userData?.userId
    );
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        userData?.username,
        profile?.userId
      );
      setIsFollowingProfile(!!isFollowing);
    };

    if (userData?.username && profile?.userId) {
      isLoggedInUserFollowingProfile();
    }
  }, [userData?.username, profile?.userId]);

  return (
    <div className="grid grid-cols-4 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center">
        {profile?.username && (
          <img
            className="rounded-full h-40 w-40 flex"
            alt={`${profile?.username} pic`}
            src={`/images/avatars/${profile?.username}.jpg`}
          />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profile?.username}</p>
          {activeButtonFollow && (
            <button
              className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
              type="button"
              onClick={handleToggleFollow}
            >
              {isFollowingProfile ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        <div className="container flex mt-4">
          {followerCount === undefined || profile?.following === undefined ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount} photos</span>
              </p>
              <p className="mr-10">
                <span className="font-bold">
                  {followerCount} {` `}{" "}
                  {profile?.followers.length === 1 ? `follower` : "followers"}
                </span>
              </p>
              <p className="mr-10">
                <span className="font-bold">
                  {profile?.following.length} following
                </span>
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {!profile?.fullName ? (
              <Skeleton counr={1} height={24} />
            ) : (
              profile?.fullName
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
