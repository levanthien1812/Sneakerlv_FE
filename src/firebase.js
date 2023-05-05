// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCsmVE6uu56AMO2CqW-XBMVYCsTVuxNSt0",
    authDomain: "sneakerlv.firebaseapp.com",
    projectId: "sneakerlv",
    storageBucket: "sneakerlv.appspot.com",
    messagingSenderId: "396993378300",
    appId: "1:396993378300:web:e33c9cf74b3a133fc0a479"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
export default auth