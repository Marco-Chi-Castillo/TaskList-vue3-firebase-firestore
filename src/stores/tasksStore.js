import {defineStore, storeToRefs} from "pinia";
import {querySnapshot,addDocument, deleteDocument, getDocumentById, updateDocument} from "@/firebase/firestore.js";
import {useUserStore} from '@/stores/userStore.js'
import {ref} from "vue";

export const useTasksStore = defineStore('tasks',()=>{
    const tasks = ref([]);
    const loadingData = ref(false);

    const userStore = useUserStore();

    const {getCurrentUser} = userStore;
    const {user} = storeToRefs(userStore);

    const getTasks = async () => {
        loadingData.value = true;
        try{
            if(tasks.value.length !== 0) return;

            await getCurrentUser()

            tasks.value = await querySnapshot(user.value.uid);
        }catch(error){
            console.log(error);
        }finally {
            loadingData.value = false;
        }
    }

    const addTask = async (task) => {
        loadingData.value = true;
        try{
            await getCurrentUser();

            const obj = {
                description: task,
                done : false,
                user : user.value.uid
            }
            const docRef = await addDocument(obj);
            tasks.value.push({id: docRef.id,...obj});
        }catch (error){
            console.log(error);
        }finally {
            loadingData.value = false;
        }
    }

    const deleteTask = async (id) => {
        loadingData.value = true;
        try{
            await deleteDocument(id);
            tasks.value = tasks.value.filter(task=>task.id !== id);
        }catch(error){
            console.log(error)
        }finally {
            loadingData.value = false;
        }
    }

    const getDocument = async (id) =>{
        loadingData.value = true;
        try{
            const data = await getDocumentById(id);
            return data;
        }catch(error){
            console.log(error);
        }finally{
            loadingData.value = false;
        }
    }

    const updateTask = async (id, description) =>{
        loadingData.value = true;
        try{
            await updateDocument(id, description);
            tasks.value = tasks.value.map((task)=>
                task.id === id ? {...task, description} : task
            );
        }catch(error){
            console.log(error)
        }finally {
            loadingData.value = false;
        }
    }

    const $reset = () =>{
        tasks.value = [];
    }

    return {
        tasks,
        loadingData,
        getTasks,
        addTask,
        deleteTask,
        $reset,
        getDocument,
        updateTask
    }
})