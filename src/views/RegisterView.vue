<script setup>

import {useUserStore} from '@/stores/userStore.js'
import Form from "@/components/Form.vue";

const userStore = useUserStore();
const {register} = userStore;

const submit = (email, password) =>{
    register(email,password);
}
</script>

<template>
  <Form :is-register="true" @submit="submit"></Form>
</template>