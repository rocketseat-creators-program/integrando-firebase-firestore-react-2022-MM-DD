import * as FirebaseApp from "firebase/app";
import * as FirebaseFirestore from "firebase/firestore";
import * as Constants from "./constants";

const app = FirebaseApp.initializeApp(Constants.FIREBASE_CONFIG);
const database = FirebaseFirestore.getFirestore(app);

export async function createData(pathOnDB, data, callback) {
  try {
    const collection = FirebaseFirestore.collection(database, pathOnDB);
    const docRef = await FirebaseFirestore.addDoc(collection, data);
    callback(docRef, null);
  } catch (error) {
    callback(null, error);
  }
}

export async function updateData(pathOnDB, data, callback) {
  try {
    const doc = FirebaseFirestore.doc(database, pathOnDB);
    const docRef = await FirebaseFirestore.updateDoc(doc, data);
    callback(doc, null);
  } catch (error) {
    callback(null, error);
  }
}

export async function readAllData(pathOnDB, callback) {
  try {
    const collection = FirebaseFirestore.collection(database, pathOnDB);
    const querySnapshot = await FirebaseFirestore.getDocs(collection);
    callback(querySnapshot.docs, null);
  } catch (error) {
    callback(null, error);
  }
}

export async function readData(pathOnDB, callback) {
  try {
    const doc = FirebaseFirestore.doc(database, pathOnDB);
    const docData = await FirebaseFirestore.getDoc(doc);
    callback(docData.data(), null);
  } catch (error) {
    callback(null, error);
  }
}

export async function deleteData(pathOnDB, callback) {
  try {
    const doc = FirebaseFirestore.doc(database, pathOnDB);
    await FirebaseFirestore.deleteDoc(doc);
    callback(doc, null);
  } catch (error) {
    callback(null, error);
  }
}

export function listenChangeData(pathOnDB, callback) {
  const doc = FirebaseFirestore.doc(database, pathOnDB);
  FirebaseFirestore.onSnapshot(doc, (doc) => {
    callback(doc, null);
  });
}
