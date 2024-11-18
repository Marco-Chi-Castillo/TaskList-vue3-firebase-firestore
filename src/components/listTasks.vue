<script setup>
import {useTasksStore} from "@/stores/tasksStore.js";
import {computed, onMounted} from "vue";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";

const props = defineProps(['isDone'])

const tasksStore = useTasksStore();
const router = useRouter();

const {getTasks,doneTask, deleteTask} = tasksStore;
const {tasks,loadingData} =storeToRefs(tasksStore);

onMounted(async ()=>{
  await getTasks(props.isDone);
})

const underline =(done)=>{
  return done === false ? '' : 'text-decoration-line-through';
}

</script>

<template>
    <ul class="list-group" v-for="task in tasks">
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <button class="btn btn-success me-2" :disabled="loadingData" @click="doneTask(task.id, task.done)"><i class="bi bi-check"></i></button>
          <span :class="underline(task.done)"> {{task.description}}</span>
        </div>
        <div>
          <button class="btn btn-danger me-2" @click="deleteTask(task.id)" :disabled="loadingData"><i class="bi bi-x-square-fill"></i></button>
          <button v-if="!isDone" class="btn btn-primary" :disabled="loadingData" @click="router.push(`/update/${task.id}`)"> <i class="bi bi-pencil-square"></i></button>
        </div>
      </li>
    </ul>
</template>
