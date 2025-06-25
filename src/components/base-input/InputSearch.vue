<script setup lang="ts">
import SearchIcon from "@/assets/icons/search.svg";
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
@use "@/scss/styles";

.input {
  width: 100%;
  max-width: 360px;
  height: 40px;
  border-right: transparent;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  padding: styles.$padding-sm styles.$padding-md;
}
</style>
