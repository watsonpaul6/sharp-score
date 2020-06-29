// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyASqocFMpU1xejiD8TgQ43AeIbNa8iRik4",
    authDomain: "sharpscorekeeper.firebaseapp.com",
    databaseURL: "https://sharpscorekeeper.firebaseio.com",
    projectId: "sharpscorekeeper",
    storageBucket: "sharpscorekeeper.appspot.com",
    messagingSenderId: "272876468819",
    appId: "1:272876468819:web:90a56629f196f5e3cc64a6",
    measurementId: "G-TNZ6JYN70Q"
  },
  collections : {
    users: 'UsersTEST',
    dartgames: 'dartgamesTEST'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
