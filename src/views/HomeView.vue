<script setup>
import {useUserStore} from '@/stores/userStore.js'
import {useTasksStore} from "@/stores/tasksStore.js";
import {storeToRefs} from "pinia";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const userStore = useUserStore();
const tasksStore = useTasksStore();
const router = useRouter();

const task = ref('This is a example');
const {getTasks,addTask, deleteTask} = tasksStore;

const {user} = storeToRefs(userStore);
const {tasks,loadingData} = storeToRefs(tasksStore);

onMounted(async()=>{
  await getTasks();
});

const handleSubmit = () =>{
  addTask(task.value);
}
</script>

<template>
  <main>
    <h1>Hello world {{user?.email}}</h1>
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="task" v-model.trim="task">
      <button type="submit" :disabled="loadingData">Add</button>
    </form>

    <template  v-for="task in tasks">
      <p>{{task.description}} - {{task.done}} </p>
      <button @click="deleteTask(task.id)" :disabled="loadingData">Delete</button>
      <button :disabled="loadingData" @click="router.push(`/update/${task.id}`)">Update</button>
    </template>
  </main>
</template>
