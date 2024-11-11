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
  <h1>{{isRegister ? 'Register': 'Login'}}</h1>
  <form @submit.prevent="handleSubmit">
    <input type="email" placeholder="email" v-model.trim="email">
    <input type="password" placeholder="password" v-model.trim="password">
    <button type="submit" :disabled="loading">{{isRegister ? 'Register': 'Login'}}</button>
  </form>
</template>
