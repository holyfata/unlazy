<template>
  <slot :is-visible="isVisible"></slot>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import Monitor from "@holyfata/unlazy";

export default defineComponent({
  name: "VisibilityWrapper",
  props: {
    selector: {
      type: String,
      required: true,
    },
  },
  emits: ["handleVisibility"], // 定义触发的事件
  setup(props, { emit }) {
    const isVisible = ref(false);
    let monitor: Monitor | null = null;

    const handleEnter = () => {
      isVisible.value = true;
      emit("handleVisibility", true); // 触发事件并传递可见性状态
    };

    const handleLeave = () => {
      isVisible.value = false;
      emit("handleVisibility", false); // 触发事件并传递可见性状态
    };

    onMounted(() => {
      monitor = new Monitor(props.selector, handleEnter, handleLeave);
    });

    onUnmounted(() => {
      if (monitor) {
        monitor.disconnect();
      }
    });

    return {
      isVisible,
    };
  },
});
</script>
