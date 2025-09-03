import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCqHHWzIe6qTNbz24Gah9CFBRplSib4UtE",
  authDomain: "svit-crochets.firebaseapp.com",
  projectId: "svit-crochets",
  storageBucket: "svit-crochets.firebasestorage.app",
  messagingSenderId: "196304200643",
  appId: "1:196304200643:web:76e1d772d0668e12a21376",
  measurementId: "G-V6SH5WTP45",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
