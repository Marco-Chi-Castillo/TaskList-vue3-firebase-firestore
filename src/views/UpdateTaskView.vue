<script setup>
import {useRoute, useRouter} from 'vue-router';
import {onMounted, ref} from 'vue';
import {useTasksStore} from "@/stores/tasksStore.js";
import { storeToRefs } from 'pinia';

const route = useRoute();
const router = useRouter();

const tasksStore = useTasksStore();

const {updateTask} = tasksStore;
const {loadingData} = storeToRefs(tasksStore);

const description = ref('');

onMounted(async ()=>{
  const data = await tasksStore.getDocument(route.params.id);
  description.value = data?.description;
});

const handleSubmit = () =>{
  updateTask(route.params.id, description.value);
  router.push('/');
}

</script>

<template>
  <h2>Task: {{route.params.id}}</h2>
  <p v-if="loadingData">loading...</p>
    <form v-else @submit.prevent="handleSubmit">
      <input type="text" placeholder="task" v-model.trim="description">
      <button type="submit" :disabled="loadingData">Update</button>
    </form>
</template>
