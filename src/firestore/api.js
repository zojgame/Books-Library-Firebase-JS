import { getDocs, collection } from "firebase/firestore";
import { db } from "./firestore";

export async function getBooks() {
    const books = collection(db, 'books');
    const snap = await getDocs(books);
    const cityList = snap.docs.map(doc => ({id: doc.id, ...doc.data()}));
    
    return cityList;
}