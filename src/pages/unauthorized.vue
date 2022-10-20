<script setup lang="ts">
const route = useRoute()
const { from } = route.query
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h3 class="text-3xl font-semibold text-primary-500 mb-1">Unauthorized!</h3>
    <p class="text-lg text-gray-800">
      Sorry, permission to access
      <strong class="font-semibold text-gray-600">{{ from }}</strong> page was
      declined.
    </p>
  </div>
</template>
