import { initializeApp } from "firebase/app";
/*import { getAnalytics } from "firebase/analytics";*/
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBYmotvbtzYzH8uO6dnnbzHURNZxJTG0gY",
  authDomain: "gardensagendamentos.firebaseapp.com",
  projectId: "gardensagendamentos",
  storageBucket: "gardensagendamentos.appspot.com",
  messagingSenderId: "626929451645",
  appId: "1:626929451645:web:dd7b642dd731749bede714",
  measurementId: "G-HSB1FNNRP5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
/*const analytics = getAnalytics(app);*/

const db = getFirestore(app);
export const storage = getStorage(app);
const auth = getAuth(app);

export { db };

