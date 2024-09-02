import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD6lDt-5yaP_HGeenQx61egPFGkiDDyxpY",
  authDomain: "coursemanager-50d40.firebaseapp.com",
  projectId: "coursemanager-50d40",
  storageBucket: "coursemanager-50d40.appspot.com",
  messagingSenderId: "515534695718",
  appId: "1:515534695718:web:e733e5ccae053438d4e5e7",
};

const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;
