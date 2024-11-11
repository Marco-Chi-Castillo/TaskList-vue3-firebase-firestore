import {auth} from '@/firebase/config'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut, onAuthStateChanged} from 'firebase/auth'

export const registerUser = async (email, password)=>{
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const  signInUser = async (email, password)=>{
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async ()=>{
    return await signOut(auth);
}

export const currentUser = () =>{
    return new Promise((resolve,reject)=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            unsubscribe();
            resolve(user);
        },
            error => {
            unsubscribe();
            reject(error)});
    })
}