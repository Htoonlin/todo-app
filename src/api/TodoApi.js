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

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

class TodoApi {
    constructor() {
        this.todoCollection = collection(db, "todo");
    }

    async getAll() {
        try {
            const todo = await getDocs(this.todoCollection);
            const response = todo.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                };
            });
            return response;
        } catch (error) {
            console.warn("Error => ", error);
        }
    }

    async add(task) {
        const ref = await addDoc(this.todoCollection, task);
        return {
            id: ref.id,
            ...task,
        };
    }

    async update(task) {
        const ref = doc(db, "todo", task.id);
        await updateDoc(ref, task);
    }

    async remove(id) {
        try {
            const exist = doc(this.todoCollection, id);
            await deleteDoc(exist);
        } catch (error) {
            console.warn("Error => ", error);
        }
    }
}

export default new TodoApi();
