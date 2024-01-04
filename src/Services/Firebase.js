import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB0bOEqYbhVRadA2P1IGHuyjuySo86R2SU",
  authDomain: "react-netflix-app-7db71.firebaseapp.com",
  projectId: "react-netflix-app-7db71",
  storageBucket: "react-netflix-app-7db71.appspot.com",
  messagingSenderId: "628927007467",
  appId: "1:628927007467:web:e97b8776eb3b8b5c6d4cae"
};

const app=firebase.initializeApp(firebaseConfig)
export const auth=app.auth();
export const firestore=app.firestore();

export default app;