import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore/lite";
const firebaseConfig = {
    apiKey: "AIzaSyBYkBomVRa1sSaaCWaXB_72KXG7sVnLiSY",
    authDomain: "task-management-91253.firebaseapp.com",
    projectId: "task-management-91253",
    storageBucket: "task-management-91253.appspot.com",
    messagingSenderId: "353023996869",
    appId: "1:353023996869:web:485703fffa1c6289b1d1ac",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const todoCollection = collection(db, "todo");

class FirebaseApi {
    async addData(task) {
        try {
            const response = await addDoc(todoCollection, task);
            return {
                id: response.id,
                ...task,
            };
        } catch (e) {
            console.warn(`Error => ${e}`);
        }
    }

    async readData() {
        try {
            const resp = await getDocs(todoCollection);
            return resp.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                };
            });
        } catch (error) {
            console.warn("Error => ", error);
        }
    }

    async updateData(task) {
        try {
            const ref = doc(todoCollection, task.id);
            await updateDoc(ref, task);
        } catch (e) {
            console.warn(`Error => ${e}`);
        }
    }

    async deleteData(id) {
        try {
            const ref = doc(todoCollection, id);
            await deleteDoc(ref);
        } catch (e) {
            console.warn(`Error => ${e}`);
        }
    }
}

export default new FirebaseApi();
