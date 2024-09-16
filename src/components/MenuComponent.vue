<template>
  <div :class="`menu-${type}`">
    <Dropdown trigger="File">
      <ItemComponent text="Window" @click="add({payload: { title: 'BabasNeue' }})" />
      <ItemComponent text="Test" @click="add({payload: { title: 'Only', id: '123' }})" />
    </Dropdown>
    <span v-if="type === 'screen'" class="app-version">
      <span>{{ version }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'

import Dropdown from '@/components/DropdownComponent.vue';
import ItemComponent from '@/components/ItemComponent.vue';

import { useWindowStore } from '@/store/index'

const props = defineProps<{
  type?: string;
  version?: string;
}>();

// Set default values for props if they aren't provided
const type = ref(props.type ?? 'window');
const version = ref(props.version ?? '');

const { add } = useWindowStore();

</script>

<style scoped>

</style>
