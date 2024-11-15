import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyChAVnEJmmu1lGyv8rix3G8d55YbGqItns",
    authDomain: "tasklist-basic-cfef3.firebaseapp.com",
    projectId: "tasklist-basic-cfef3",
    storageBucket: "tasklist-basic-cfef3.firebasestorage.app",
    messagingSenderId: "1068693833414",
    appId: "1:1068693833414:web:d15275f29db727c69a79c7",
    measurementId: "G-C7M9EKQ0CT"
};

const app = initializeApp(firebaseConfig);

const auth =  getAuth(app);
const db = getFirestore(app);

export {auth, db}