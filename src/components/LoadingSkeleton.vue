<script setup lang="ts">
defineProps<{ loaded: boolean }>()

</script>
<template>

<div role="status" class="w-auto animate-pulse " v-if="!loaded">
    <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
    <span class="sr-only">Loading...</span>
</div>

<slot v-if="loaded" />

</template>



