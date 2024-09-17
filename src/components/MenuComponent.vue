<template>
  <div :class="`menu-${type}`">
    <Dropdown trigger="File">
      <ItemComponent
        v-for="(item, index) in menu"
        :text="item.text"
        :action="item.action"
        :key="`menu-${item}-${index}`"
      />
    </Dropdown>
    
    <!-- Conditional rendering for app version -->
    <span v-if="type === 'screen'" class="app-version">
      <span>{{ version }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

import Dropdown from '@/components/DropdownComponent.vue';
import ItemComponent from '@/components/ItemComponent.vue';

import { useWindowStore } from '@/store/index';

// Define props with optional type and version
const props = defineProps<{
  type?: string;
  version?: string;
}>();

// Set default values for props if they aren't provided
const type = ref(props.type ?? 'window');
const version = ref(props.version ?? '');

// Access the window store
const { add } = useWindowStore();

// Define the menu array and make it reactive
const menu = ref([
  {
    text: 'Window', // Make sure to reference 'text' consistently
    action: () => add({ payload: { title: 'BabasNeue' } }),
  },
  {
    text: 'Test',
    action: () => add({ payload: { title: 'Only', id: '123' } }),
  },
]);

</script>

<style scoped>
/* Add any necessary styling here */
</style>
