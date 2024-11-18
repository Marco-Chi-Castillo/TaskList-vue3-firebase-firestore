import {defineStore, storeToRefs} from "pinia";
import {addDocument, deleteDocument, getDocumentById, querySnapshot, updateDocument} from "@/firebase/firestore.js";
import {useUserStore} from '@/stores/userStore.js'
import {ref} from "vue";

export const useTasksStore = defineStore('tasks',()=>{
    const tasks = ref([]);
    const loadingData = ref(false);

    const userStore = useUserStore();

    const {getCurrentUser} = userStore;
    const {user} = storeToRefs(userStore);

    const getTasks = async (done) => {
        loadingData.value = true;
        tasks.value = [];
        try{
            await getCurrentUser()

            tasks.value = await querySnapshot(user.value.uid, done);
        }catch(error){
            console.log(error);
        }finally {
            loadingData.value = false;
        }
    }

    const addTask = async (task) => {
        loadingData.value = true;
        try{
            if(task === '') return;

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
            return await getDocumentById(id);
        }catch(error){
            console.log(error);
        }finally{
            loadingData.value = false;
        }
    }

    const updateTask = async (id, description) =>{
        loadingData.value = true;
        try{
            const obj = {
                description : description
            }
            await updateDocument(id, obj);
            tasks.value = tasks.value.map((task)=>
                task.id === id ? {...task, description} : task
            );
        }catch(error){
            console.log(error)
        }finally {
            loadingData.value = false;
        }
    }

    const doneTask = async  (id, done) =>{
        loadingData.value  = true;
        try{
            done = done === false;
            const obj = {
                done: done
            }
            await updateDocument(id, obj);

            tasks.value = tasks.value.map((task)=>
                task.id === id ? {...task, done } : task
            );

            tasks.value = tasks.value.filter(task=>task.done !== done);
        }catch (error){
            console.log(error);
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
        updateTask,
        doneTask
    }
})