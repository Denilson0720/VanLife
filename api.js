import { initializeApp } from "firebase/app";
// /lite - no real time firestore database feature
import {getFirestore,collection,getDocs,doc,getDoc,query,where,setDoc} from 'firebase/firestore/lite'

const firebaseConfig = {
    apiKey:'AIzaSyB50phXZJwaSoCOzvdBV4A9TTbPPMdzj50',
    authDomain: "vanlife-14c01.firebaseapp.com",
    projectId: "vanlife-14c01",
    storageBucket: "vanlife-14c01.appspot.com",
    messagingSenderId: "1097989842755",
    appId: "1:1097989842755:web:bde9607fd4ead07b07f1f6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const vansCollectionRef = collection(db,'vans')
const usersCollectionRef = collection(db,'users')

export async function getVans() {
       // from firestore sdk docs
       // const vansCollectionRef = collection(db,'vans')
       const snapshot = await getDocs(vansCollectionRef);
       //rearrange data so its in the same format the components are expecting
       const vans = snapshot.docs.map(doc=>({
           ...doc.data(),
           id:doc.id
       }))
    //    console.log(vans);
       return vans
}
export async function getVan(id){
    // database,collection, specific instance
    const docRef = doc(db,'vans',id);
    const snapshot = await getDoc(docRef)
    const van = snapshot.data();
    console.log(van);
    return van;
}
export async function getHostVans(hostId){ 
    // console.log('hostId : ', hostId)
    const id = parseInt(hostId)
    const q  = query(vansCollectionRef,where('hostId','==',id))
    const querySnapshot = await getDocs(q);
    const vans = querySnapshot.docs.map(doc=>({
        // console.log(doc)
        ...doc.data(),
        id:doc.id
    }))
    // console.log(querySnapshot.docs)
    console.log(vans)
    return vans
}
export async function loginUser(creds){
    // login with the formData
    // if a user is found with that data then set up LocalStorage
    const {email,password} = creds;
    // firestore- collection group query
    const q = query(usersCollectionRef, where("email","==",email),where("password","==",password))
    const querySnapshot = await getDocs(q);
    // firestore returns a ton of other data objects, only save what we need
    const users = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
    }));
    if (users.length === 0) {
        throw {
        message: 'Could not find user, please check email/password',
        status: 400
        };
    }
    return users;
}

export async function registerUser(creds){
    console.log('user creds at api: ', creds)
    // const newCityRef = doc(collection(db, "cities"));
    await setDoc(doc(db, "users", creds.userId), creds);
}