<template>
  <div :class="`menu-item ${className}`" @click="action">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// Define props for the component
const props = defineProps<{
  text: string;
  className?: string;
  action?: () => void;
}>();

// Set default values for props if not provided
const className = props.className ?? '';
const action = props.action ?? (() => console.log(props.text));

</script>

<style scoped>

</style>