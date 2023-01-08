import firebase from 'firebase/compat/app';
import "firebase/auth";     // 인증 관련
import "firebase/database"; // DB 관련
import "firebase/storage";  // 스토리지 관련

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC52WHCpo_oJUG3LdYBGaPiSaAmPZWnOr4",
    authDomain: "react-firebase-chat-app-a2b11.firebaseapp.com",
    projectId: "react-firebase-chat-app-a2b11",
    storageBucket: "react-firebase-chat-app-a2b11.appspot.com",
    messagingSenderId: "208784728964",
    appId: "1:208784728964:web:d365536b019ec2175033d1",
    measurementId: "G-M118BRX11B"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);


export default firebase;