<script setup>
import {useUserStore} from '@/stores/userStore.js'
import {useTasksStore} from "@/stores/tasksStore.js";
import {storeToRefs} from "pinia";
import {ref} from "vue";
import ListTasks from "@/components/listTasks.vue";

const userStore = useUserStore();
const tasksStore = useTasksStore();

const task = ref('This is a example');
const {addTask} = tasksStore;

const {user} = storeToRefs(userStore);
const {loadingData} = storeToRefs(tasksStore);

const handleSubmit = () =>{
  addTask(task.value);
}
</script>

<template>
  <main class="container mt-3">
    <h1>Welcome {{user?.email}}</h1>

    <form class="row g-3 mt-2" @submit.prevent="handleSubmit">
      <div class="col-auto">
        <label for="inputPassword2" class="visually-hidden">Task</label>
        <input type="text" class="form-control" placeholder="task" id="inputPassword2" v-model.trim="task">
      </div>
      <div class="col-auto">
        <button type="submit" class="btn btn-primary mb-3" :disabled="loadingData">Add</button>
      </div>
    </form>
    <list-tasks :is-done="false"></list-tasks>
  </main>
</template>
