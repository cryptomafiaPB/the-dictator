// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY!,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.FIREBASE_PROJECT_ID!,
    storageBucket: process.env.FIREBASE_BUCKET_STORAGE!,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.FIREBASE_APP_ID!,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID!

    // apiKey: "AIzaSyAubvCCz6rmbvxZCZir8AZytImSdGJzd88",
    // authDomain: "thedictator-78cb1.firebaseapp.com",
    // projectId: "thedictator-78cb1",
    // storageBucket: "thedictator-78cb1.appspot.com",
    // messagingSenderId: "36069352041",
    // appId: "1:36069352041:web:53d5ef374e7e30e224f8f8",
    // measurementId: "G-WQ3EBCWDH1"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
// export default app;
