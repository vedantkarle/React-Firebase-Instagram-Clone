import { FieldValue } from "../lib/firebase";
import firebase from "firebase/app";
import "firebase/storage";

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  const resultArray = result.docs.map((user) => user.data());

  return resultArray;
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
}

export async function getUserPhotosByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", userId)
    .get();

  return result.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
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
    .orderBy("dateCreated", "desc")
    .get();

  const myPhotos = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", userId)
    .orderBy("dateCreated", "desc")
    .get();

  const userFollowedPhotos = result.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  const myPhotosArray = myPhotos.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  const photos = [...myPhotosArray, ...userFollowedPhotos];

  const photosWithUserDetails = await Promise.all(
    photos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo?.likes?.includes(userId)) {
        userLikedPhoto = true;
      }
      const user = await getUser(photo.userId);
      const { username } = user[0];
      return { username, ...photo, userLikedPhoto };
    })
  );

  return photosWithUserDetails;
}

export async function isUserFollowingProfile(
  loggedInUserUsername,
  profileUserId
) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", loggedInUserUsername)
    .where("following", "array-contains", profileUserId)
    .get();

  //destructring response and defaulting it to a object
  const [response = {}] = result.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));

  return response.userId;
}

export async function toggleFollow(
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId
) {
  //my doc docid
  // prasads userId
  //is user following profile
  await updateLoggedInUserFollowing(
    activeUserDocId,
    profileUserId,
    isFollowingProfile
  );

  //my doc userId
  // prasads docId
  //is user following profile

  await updateFollowedUserFollowers(
    profileDocId,
    followingUserId,
    isFollowingProfile
  );
}

export function uploadPhoto(file, caption) {
  const userId = firebase.auth().currentUser.uid;
  const storage = firebase.storage();
  const storageRef = storage.ref(file.name);
  const collectionRef = firebase.firestore().collection("photos");
  storageRef.put(file).on(
    "state_changed",
    (snapshot) => {},
    (err) => {},
    async () => {
      const url = await storageRef.getDownloadURL();
      collectionRef.add({
        caption,
        dateCreated: Date.now(),
        imageSrc: url,
        userId,
      });
    }
  );
}
