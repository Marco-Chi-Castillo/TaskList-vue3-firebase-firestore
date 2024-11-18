<script setup>
import { RouterLink, RouterView } from 'vue-router'
import {useUserStore} from "@/stores/userStore.js";
import {storeToRefs} from "pinia";

const userStore = useUserStore();

const {signOut} = userStore;

const {loading,user} = storeToRefs(userStore);

</script>

<template>
  <div class="container">
    <header>
      <p v-if="loading">Loading...</p>
      <nav v-else class="navbar bg-dark navbar-expand-lg ftco_navbar ftco-navbar-light">
        <div class="container">
          <a class="navbar-brand" href="#">
            <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="30" height="24" />
          </a>
          <div class="collapse navbar-collapse">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item" >
                <RouterLink class="nav-link text-white"  to="/" v-if="user" >Home</RouterLink>
              </li>
              <li class="nav-item" >
                <RouterLink class="nav-link text-white" to="/done" v-if="user">Done</RouterLink>
              </li>
              <li class="nav-item" >
                <RouterLink class="nav-link text-white"  to="/register" v-if="!user">Register</RouterLink>
              </li>
              <li class="nav-item" >
                <RouterLink class="nav-link text-white"  to="/login" v-if="!user">Login</RouterLink>
              </li>
              <button  class="btn btn-light ms-3" @click="signOut" :disabled="loading" v-if="user">Sign Out</button>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <RouterView />
  </div>

</template>

