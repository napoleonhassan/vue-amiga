<template>
  <div class="desktop">
    <WindowComponent 
      v-for="(window, index) in store.windows"
      :title="window.title"
      :id="window.id"
      :adjPos="{ x: index, y: index }"
      :key="`window-${window.id}`"
    />
  </div>
</template>

<script setup lang="ts">

import { useWindowStore } from '@/store/index'

import WindowComponent from '@/components/WindowComponent.vue';

const store = useWindowStore()

</script>

<style scoped>

</style>
