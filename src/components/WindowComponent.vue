<template>
  <div
    :class="['window-frame', max ? 'full-size' : 'custom-size']"
    @mousedown="bringToFront"
    :style="windowStyle"
  >
    <div class="window-top">
      <!-- Close Window Icon -->
      <span @click="removeWindow">
        <span>■</span>
      </span>

      <!-- Draggable Title -->
      <span
        class="title"
        @mousedown="startDrag"
        @mousemove="onMouseMove"
      >
        {{ title }}
      </span>

      <!-- Maximize/Restore Button -->
      <span @click="toggleMaximize">{{ max ? '-' : '+' }}</span>
    </div>

    <!-- Window content -->
    <div class="window-middle">
      <div class="window-content">
        <!-- PLACE WINDOW CONTENT HERE -->
      </div>
      <div class="window-right" />
    </div>

    <div class="window-bottom">
      <div class="window-corner" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, ref } from 'vue';
import { useStore } from 'vuex'; // Assuming you're using Vuex for state management
import { upCount } from '../utils/Utils';

// Props
const props = defineProps<{
  title?: string;
  id?: string;
}>();

const title = props.title ?? "";
const id = props.id ?? "0";

// Vuex store for dispatch (equivalent of useAppDispatch)
const store = useStore();

// Reactive state (similar to useState in React)
const zi = ref(upCount());
const max = ref(false);
const posi = ref({ x: 100, y: 100 });
const offs = ref({ x: 100, y: 100 });

// Methods
const bringToFront = () => {
  zi.value = upCount();
};

const removeWindow = () => {
  store.dispatch('windows/removeWindow', { id, title });
};

const getLayerX = (event: MouseEvent) => {
  return event.clientX - (event.target as HTMLElement).getBoundingClientRect().x;
};

const getLayerY = (event: MouseEvent) => {
  return event.clientY - (event.target as HTMLElement).getBoundingClientRect().y;
};

// Drag and move logic
const startDrag = (event: MouseEvent) => {
  offs.value = {
    x: getLayerX(event),
    y: getLayerY(event),
  };
};

const onMouseMove = (event: MouseEvent) => {
  if (event.buttons === 1 && !max.value) {
    posi.value = {
      x: event.clientX - (offs.value.x + 30),
      y: event.clientY - (offs.value.y + 2),
    };
  }
};

const toggleMaximize = () => {
  max.value = !max.value;
};

// Computed style for window position and z-index
const windowStyle = computed(() => {
  if (max.value) {
    return {
      position: 'relative',
      left: '0px',
      top: '0px',
      zIndex: zi.value,
    };
  } else {
    return {
      left: `${posi.value.x}px`,
      top: `${posi.value.y}px`,
      zIndex: zi.value,
    };
  }
});
</script>

<style scoped>
.window-frame {
  position: absolute;
}

.full-size {
  width: 100vw;
  height: 100vh;
}

.custom-size {
  width: 400px;
  height: 300px;
}

/* .window-top {
  cursor: move;
}

.title {
  cursor: move;
} */

.window-middle {
  /* Add your styles for the window content */
}

.window-bottom,
.window-corner {
  /* Add styles as needed */
}
</style>
