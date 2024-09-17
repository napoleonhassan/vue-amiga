<template>
  <div
    :class="['window-frame', max ? 'full-size' : 'custom-size']"
    @mousedown="bringToFront"
    @mouseup="updateState"
    :style="windowStyle"
  >
    <div class="window-top">

      <span @click="removeWindow">
        <span>■</span>
      </span>

      <span
        class="title"
        @mousedown="startDrag"
        @mousemove="onMouseMove"
      >
        {{ active ? `* ${title} *` : title }}
      </span>

      <span @click="toggleFullWindow">{{ max ? '-' : '+' }}</span>
    </div>

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
import { upCount } from '@/utils/Utils';
import { useWindowStore, WindowTemplate } from '@/store/index'

interface ExtendedWindowTemplate extends WindowTemplate {
  index?: number
}

// Props
const props = defineProps<ExtendedWindowTemplate>();
const title = props.title ?? "";
const index = ref(props.index);
const id = ref(props.id);

const indexOffset = {
  x: index.value * 30,
  y: index.value * 30
}

const zi = ref(props.zi);
const max = ref(false);
const position = ref({ x: 100 + indexOffset.x, y: 100 + indexOffset.y });
const offset = ref({ x: 100, y: 100 });

const store = useWindowStore();

// Methods
const bringToFront = () => {
  zi.value = upCount();
  store.focus({ payload: { ...props } })
};

const updateState = () => {
  store.update({ payload: { ...props, zi: zi.value }});
};

const removeWindow = () => {
  store.remove({ payload: { ...props } })
};

const active = computed(() => {
  return store.focused === id.value;
});

// Drag and move logic
const startDrag = (event: MouseEvent) => {
  offset.value = {
    x: event.offsetX,
    y: event.offsetY
  };
};

const onMouseMove = (event: MouseEvent) => {
  if (event.buttons === 1 && !max.value) {
    position.value = {
      x: event.clientX - (offset.value.x + 30),
      y: event.clientY - (offset.value.y + 2),
    };
  }
};

const toggleFullWindow = () => {
  max.value = !max.value;
};

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
      left: `${position.value.x}px`,
      top: `${position.value.y}px`,
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
</style>
