<script setup lang="ts">
import LoginPage from "@/pages/LoginPage.vue";
</script>

<template>
  <div :class="$style.overallWrap">
    <LoginPage />
  </div>
</template>

<style module lang="scss">
@use "@/scss/colors";

.overallWrap {
  background-color: colors.use("bg-light");
}
</style>
