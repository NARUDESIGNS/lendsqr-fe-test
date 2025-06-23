<script setup lang="ts">
import SearchIcon from "@/assets/icons/search-icon.svg";
import InputText from "@/components/base-input/InputText.vue";
import { ref } from "vue";

const searchText = ref("");
</script>

<template>
  <InputText
    v-model="searchText"
    :class="$style.input"
    placeholder="Search for anything"
    show-button
  >
    <img :src="SearchIcon" alt="Search Icon" :class="$style.searchIcon" />
  </InputText>
</template>

<style module lang="scss">
@import "@/scss/spaces";

.input {
  width: 100%;
  max-width: 360px;
  height: 40px;
  border-right: transparent;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  padding: $padding-sm $padding-md;
}
</style>
