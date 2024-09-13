<template>
  <div
    class="dropdown"
    :style="{ zIndex: zi }"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <ItemComponent :text="trigger" :className="isShown ? 'invert' : ''" />
    <div v-if="isShown" class="menu-sub" @click="hideDropdown">
      <slot></slot> <!-- Slot for the dropdown items -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { upCount } from '@/utils/Utils';

import ItemComponent from '@/components/ItemComponent.vue';

// Define props
const props = defineProps<{
  trigger: string;
}>();

// State management using ref (similar to useState in React)
const isShown = ref(false);
const zi = ref(Date.now());

// Functions to handle mouse events
const onMouseEnter = () => {
  zi.value = upCount();
  isShown.value = true;
};

const onMouseLeave = () => {
  isShown.value = false;
};

const hideDropdown = () => {
  isShown.value = false;
};
</script>

<style scoped>
.dropdown {
  /* Add your dropdown styles here */
}

.menu-sub {
  /* Add your menu-sub styles here */
}

.invert {
  /* Styling for the inverted state */
}
</style>
