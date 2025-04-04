<template>
  <div style="width: 100vw; height: 100vh"></div>

  <VisibilityWrapper
    selector="#watchedElement"
    @handleVisibility="handleVisibility"
  >
    <template #default="{ isVisible }">
      <div id="watchedElement">
        <p v-if="isVisible">元素在视口中</p>
        <p v-else>元素不在视口中</p>
      </div>
    </template>
  </VisibilityWrapper>
</template>

<script setup>
import { VisibilityWrapper } from "@holyfata/unlazy-vue";

const handleVisibility = (isVisible) => {
  console.log("Visible :", isVisible);
};
</script>
