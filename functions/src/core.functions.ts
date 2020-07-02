import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";

export const helloWorld = functions.https.onCall((data, context) => {
  return "HELLO WORLD";
});

export const createUser = functions.firestore.document("/Users/{uid}").onCreate(async (snapshot, context) => {
  await snapshot.ref.set({ ...snapshot.data(), joinedOn: snapshot.createTime });
});

export const updateUser = functions.firestore.document("/Users/{uid}").onUpdate(async (change, context) => {
  if (change.before.data().displayName !== change.after.data().displayName) {
    await change.after.ref.set({ ...change.after.data(), changedOn: change.after.updateTime });
  }
});
