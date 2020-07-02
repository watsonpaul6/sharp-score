import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";

export const createUserTest = functions.firestore.document("/UsersTEST/{uid}").onCreate(async (snapshot, context) => {
  await snapshot.ref.set({ ...snapshot.data(), joinedOn: snapshot.createTime });
});

export const updateUserTest = functions.firestore.document("/UsersTest/{uid}").onUpdate(async (change, context) => {
  if (change.before.data().displayName !== change.after.data().displayName) {
    await change.after.ref.set({ ...change.after.data(), changedOn: change.after.updateTime });
  }
});
