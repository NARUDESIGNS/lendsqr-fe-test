<script setup lang="ts"></script>

<template>
  <div :class="$style.overallWrap">
    <RouterView />
  </div>
</template>

<style module lang="scss">
@use "@/scss/colors";

.overallWrap {
  background-color: colors.use("bg-light");
  color: colors.use("text");
}
</style>
