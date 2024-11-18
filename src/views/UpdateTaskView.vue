<script setup>
import {useRoute, useRouter} from 'vue-router';
import {onMounted, ref} from 'vue';
import {useTasksStore} from "@/stores/tasksStore.js";
import { storeToRefs } from 'pinia';

const route = useRoute();
const router = useRouter();

const tasksStore = useTasksStore();

const {updateTask, getDocument} = tasksStore;
const {loadingData} = storeToRefs(tasksStore);

const description = ref('');

onMounted(async ()=>{
  const data = await getDocument(route.params.id);
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
  <form v-else class="row g-3 mt-2" @submit.prevent="handleSubmit">
    <div class="col-auto">
      <label for="inputPassword2" class="visually-hidden">description</label>
      <input type="text" class="form-control" placeholder="task" id="inputPassword2" v-model.trim="description">
    </div>
    <div class="col-auto">
      <button type="submit" class="btn btn-primary mb-3" :disabled="loadingData">Update</button>
    </div>
  </form>
</template>
