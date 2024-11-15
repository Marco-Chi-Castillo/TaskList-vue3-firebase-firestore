import {db,auth} from '@/firebase/config.js';
import {collection, getDocs, addDoc, deleteDoc, doc, where, query, getDoc, updateDoc} from 'firebase/firestore';

export const querySnapshot = async (id) =>{
    const q = query(collection(db,"Tasks"), where('user','==',id));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc)=>({id: doc.id,...doc.data()}));
}

export const addDocument = async (obj)=>{
    return await addDoc(collection(db,"Tasks"),obj);
}

export const deleteDocument = async (id)=>{
    const docRef = doc(db,'Tasks',id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error('The data does not exist');

    if(docSnap.data().user !== auth.currentUser.uid) throw new Error('The user is incorrect');

    return await deleteDoc(docRef);
}

export const getDocumentById = async (id)=>{
    const docRef = doc(db,"Tasks",id);
    const docSnap =  await getDoc(docRef);

    if(!docSnap.exists()) throw new Error('The data does not exist');

    return docSnap.data();

}

export const updateDocument = async (id, description) =>{
    const docRef = doc(db,'Tasks', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) throw new Error('The data does not exist');

    if(docSnap.data().user !== auth.currentUser.uid) throw new Error('The user is incorrect');
    return await updateDoc(docRef,{
        description
    });
}
