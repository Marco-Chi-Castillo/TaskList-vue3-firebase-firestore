<script setup>
import ListTasks from "@/components/listTasks.vue";
</script>

<template>
  <div class="container mt-3">
    <h1>Tasks done</h1>
    <list-tasks :is-done="true"></list-tasks>
  </div>
</template>

