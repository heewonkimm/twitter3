import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from 'firebase/storage'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAl3vIY_CoPqZFuMT3zvb1C3YA4JRckQZ8",
  authDomain: "nwitter-reloaded-63b32.firebaseapp.com",
  projectId: "nwitter-reloaded-63b32",
  storageBucket: "nwitter-reloaded-63b32.appspot.com",
  messagingSenderId: "733383655955",
  appId: "1:733383655955:web:9da25e95102f61cf4575e6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app); // 밑에 같이 export 하려는데 안되서 따로 export함

export default auth

