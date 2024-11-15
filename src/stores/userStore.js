import { defineStore } from "pinia";
import router from '@/router/index.js';
import {currentUser, registerUser, signInUser, signOutUser} from "@/firebase/auth";
import { ref } from "vue";
import {useTasksStore} from "@/stores/tasksStore.js";

export const useUserStore = defineStore('userStore', ()=> {
    const user = ref(null);
    const loading = ref(false);

    const register = async (email, password) =>{
        loading.value = true;
        try {
            const userCredential = await registerUser(email,password);
            user.value = userCredential.user;
            await router.push("/");
        } catch (error) {
            console.log(error);
        }finally {
            loading.value = false;
        }
    }

    const signIn = async (email, password) => {
        loading.value = true;
        try{
            const userCredential = await signInUser(email, password);
            user.value = userCredential.user;
            await router.push("/");
        }catch(Error){
            console.log(Error);
        }finally {
            loading.value = false;
        }
    }

    const signOut = async () => {
        loading.value = true;
        try{
            await signOutUser();

            const tasksStore = useTasksStore();
            tasksStore.$reset();

            await router.push("/login");
        }catch(Error){
            console.log(Error);
        }finally {
            user.value = null;
            loading.value = false;
        }
    }

    const getCurrentUser = async () =>{
        try{
            user.value = await currentUser();
        }catch (error){
            user.value = null;
            console.log(error);
        }
    }

    return {
        register,
        user,
        signIn,
        signOut,
        loading,
        getCurrentUser
    }
});