// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBSeMLXhhwJW50dOECWNZnSscmN8dc13PU",
  authDomain: "react-native-project-322fc.firebaseapp.com",
  projectId: "react-native-project-322fc",
  storageBucket: "react-native-project-322fc.appspot.com",
  messagingSenderId: "88084191248",
  appId: "1:88084191248:web:d10070b8d5d6b98e365295",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
