<template>
  <div style="width: 100vw; height: 100vh"></div>

  <VisibilityWrapper
    selector="#watchedElement"
    @handleVisibility="handleVisibility"
  >
    <template #default="{ isVisible }">
      <div id="watchedElement">
        <p v-if="isVisible">Element is in view</p>
        <p v-else>Element is not in view</p>
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
