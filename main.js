import { collection, addDoc } from "firebase/firestore"; 

try {
const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
});
console.log("Document written with ID: ", docRef.id);
} catch (e) {
console.error("Error adding document: ", e);
}

// Add a second document with a generated ID.
import { addDoc, collection } from "firebase/firestore"; 

try {
const docRef = await addDoc(collection(db, "users"), {
    first: "Alan",
    middle: "Mathison",
    last: "Turing",
    born: 1912
});

console.log("Document written with ID: ", docRef.id);
} catch (e) {
console.error("Error adding document: ", e);
}

import { collection, getDocs } from "firebase/firestore"; 

const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
console.log(`${doc.id} => ${doc.data()}`);
});