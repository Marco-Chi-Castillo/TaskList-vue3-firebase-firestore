<script setup>
import {useUserStore} from '@/stores/userStore.js'
import {storeToRefs} from "pinia";

const userStore = useUserStore();

const {user} = storeToRefs(userStore);

</script>

<template>
  <main>
    <h1>Hello world {{user?.email}}</h1>
  </main>
</template>
