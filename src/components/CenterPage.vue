<script setup lang="ts"></script>

<template>
  <div :class="$style.pageCenterWrap">
    <slot />
  </div>
</template>

<style module lang="scss">
.pageCenterWrap {
  min-height: 100vh;
  max-width: 1440px;
  margin: 0 auto;
  //   background: colors.use(background-light);
}
</style>
