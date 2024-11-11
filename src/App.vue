<script setup>
import { RouterLink, RouterView } from 'vue-router'
import {useUserStore} from "@/stores/userStore.js";
import {storeToRefs} from "pinia";

const userStore = useUserStore();

const {signOut} = userStore;

const {loading,user} = storeToRefs(userStore);

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      <p v-if="loading">Loading...</p>
      <nav v-else>
        <RouterLink to="/" v-if="user">Home | </RouterLink>
        <RouterLink to="/about" v-if="user">About | </RouterLink>
        <RouterLink to="/register" v-if="!user">Register | </RouterLink>
        <RouterLink to="/login" v-if="!user">Login | </RouterLink>
        <button @click="signOut" :disabled="loading" v-if="user">Sign Out</button>
      </nav>
  </header>
  <RouterView />
</template>

