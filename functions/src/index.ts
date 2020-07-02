// import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
import { helloWorld, createUser, updateUser } from "./core.functions";
import { createUserTest, updateUserTest } from "./test.functions";

export { helloWorld, createUser, createUserTest, updateUser, updateUserTest };
