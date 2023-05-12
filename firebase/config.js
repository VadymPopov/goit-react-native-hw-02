// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAv65Jpj4_S1WbInDdt5kymDrf-ZtZeWYs",
  authDomain: "goit-react-native-hw-06.firebaseapp.com",
  projectId: "goit-react-native-hw-06",
  storageBucket: "goit-react-native-hw-06.appspot.com",
  messagingSenderId: "453613555976",
  appId: "1:453613555976:web:4407f8a95f5634a7f1dcbd",
  measurementId: "G-LS3EZC100R"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);





