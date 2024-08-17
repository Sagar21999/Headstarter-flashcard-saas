import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCquwNZRaQCUH22J_5iY6aYn9qPp9Vo018",
    authDomain: "headstarter-flashcard-saas.firebaseapp.com",
    projectId: "headstarter-flashcard-saas",
    storageBucket: "headstarter-flashcard-saas.appspot.com",
    messagingSenderId: "1016603248888",
    appId: "1:1016603248888:web:9ac7aaa99e1705958d930d"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;