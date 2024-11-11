<script setup>
import {useUserStore} from '@/stores/userStore.js'
import Form from "@/components/Form.vue";

const userStore = useUserStore();
const {signIn} = userStore;

const submit = (email,password) =>{
  signIn(email,password);
}
</script>

<template>
  <Form :is-register="false" @submit="submit"></Form>
</template>