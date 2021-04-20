// replace 'pGLBqUwZBBTqJ8L3jvoXpRSN9mb2' with your Firebase auth user id (can be taken from Firebase)
export function seedDatabase(firebase) {
  const users = [
    {
      userId: "pGLBqUwZBBTqJ8L3jvoXpRSN9mb2",
      username: "vedant",
      fullName: "Vedant Karle",
      emailAddress: "karlevedant7@gmail.com",
      following: ["2"],
      followers: ["2", "3", "4"],
      dateCreated: Date.now(),
    },
    {
      userId: "2",
      username: "prasad",
      fullName: "Prasad Karle",
      emailAddress: "prasad@gmail.com",
      following: [],
      followers: ["pGLBqUwZBBTqJ8L3jvoXpRSN9mb2"],
      dateCreated: Date.now(),
    },

    {
      userId: "3",
      username: "gayatri",
      fullName: "Gayatri Karle",
      emailAddress: "gayatri@gmail.com",
      following: [],
      followers: ["pGLBqUwZBBTqJ8L3jvoXpRSN9mb2"],
      dateCreated: Date.now(),
    },
    {
      userId: "4",
      username: "priya",
      fullName: "Priya Karle",
      emailAddress: "priya@gmail.com",
      following: [],
      followers: ["pGLBqUwZBBTqJ8L3jvoXpRSN9mb2"],
      dateCreated: Date.now(),
    },
  ];

  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection("users").add(users[k]);
  }

  for (let i = 1; i <= 5; ++i) {
    firebase
      .firestore()
      .collection("photos")
      .add({
        photoId: i,
        userId: "2",
        imageSrc: `/images/users/prasad/${i}.jpg`,
        caption: "Saint George and the Dragon",
        likes: [],
        comments: [
          {
            displayName: "prasad",
            comment: "Love this place, looks like my animal farm!",
          },
          {
            displayName: "gayatri",
            comment: "Would you mind if I used this picture?",
          },
        ],
        userLatitude: "40.7128°",
        userLongitude: "74.0060°",
        dateCreated: Date.now(),
      });
  }
}
