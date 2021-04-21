import { firebase, FieldValue } from "../lib/firebase";

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  const resultArray = result.docs.map((user) => user.data());

  return resultArray;
}

export async function getUser(id) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", id)
    .get();

  const user = result.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return user;
}

export async function getUserSuggestions(userId, following) {
  const result = await firebase.firestore().collection("users").limit(10).get();

  return result.docs
    .map((user) => ({ ...user.data(), id: user.id }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following?.includes(profile.userId)
    );
}

export async function updateLoggedInUserFollowing(
  loggedInUserDocId,
  profileId,
  isFollowingProfile
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
}

export async function updateFollowedUserFollowers(spDocId, userId, isFollowed) {
  return firebase
    .firestore()
    .collection("users")
    .doc(spDocId)
    .update({
      followers: isFollowed
        ? FieldValue.arrayRemove(userId)
        : FieldValue.arrayUnion(userId),
    });
}

export async function getPhotos(userId, following) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get();

  const userFollowedPhotos = result.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
}
