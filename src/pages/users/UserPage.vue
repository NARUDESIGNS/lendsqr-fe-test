<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <div :class="$style.overallWrap">
    <NavBar />
    <div class="container">
      <h1>User Page</h1>
      <p>This is the user page content.</p>
    </div>
  </div>
</template>

<style module lang="scss">
.overallWrap {
  // styles here...
}
</style>
