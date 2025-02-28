import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // Importar Realtime Database

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCbRV8MTr58AqBQoyvQssK31-B9jyCirdI",
  authDomain: "bazar-nonino.firebaseapp.com",
  databaseURL: "https://bazar-nonino-default-rtdb.firebaseio.com", // Realtime Database
  projectId: "bazar-nonino",
  storageBucket: "bazar-nonino.firebasestorage.app",
  messagingSenderId: "769674519192",
  appId: "1:769674519192:web:a8e039fe39df285b9726ed",
  measurementId: "G-1M695VTZV9",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Inicializar Realtime Database

export { db };
