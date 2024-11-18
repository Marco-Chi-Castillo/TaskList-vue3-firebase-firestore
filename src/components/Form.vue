<script setup>
import {ref} from "vue";
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/userStore.js";

const userStore = useUserStore();
const {loading} = storeToRefs(userStore);

defineProps(['isRegister']);
const emit = defineEmits(['submit']);

const email = ref('marcochi@gmail.com');
const password = ref('123456');

const handleSubmit = () => {
  emit('submit',email.value,password.value);
}
</script>

<template>
  <div class="container">
    <h1>{{isRegister ? 'Register': 'Login'}}</h1>
    <form class="row g-3 mt-2" @submit.prevent="handleSubmit">
      <div class="col-auto">
        <input  class="form-control" type="email" placeholder="email" v-model.trim="email">
      </div>
      <div class="col-auto">
        <input  class="form-control" type="password" placeholder="password" v-model.trim="password">
      </div>
      <div class="col-auto">
        <button class="btn btn-primary mb-3" type="submit" :disabled="loading">{{isRegister ? 'Register': 'Login'}}</button>
      </div>
    </form>
  </div>

</template>
