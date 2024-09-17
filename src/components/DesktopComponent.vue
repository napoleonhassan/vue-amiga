<template>
  <div class="desktop">
    <WindowComponent 
      v-for="(window, index) in store.windows"
      :title="window.title"
      :id="window.id"
      :zi="upCount()"
      :key="`window-${window.id}`"
      :index="index"
    />
  </div>
</template>

<script setup lang="ts">

import { useWindowStore } from '@/store/index'

import { upCount } from '@/utils/Utils';

import WindowComponent from '@/components/WindowComponent.vue';

const store = useWindowStore()

</script>

<style scoped>

</style>
