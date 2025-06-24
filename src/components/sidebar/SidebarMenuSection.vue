<script setup lang="ts">
import SidebarMenuItem from "@/components/sidebar/SidebarMenuItem.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const props = defineProps<{
  /** Section title */
  title: string;
  /** Section data */
  data: SectionData[];
}>();

interface SectionData {
  /** Title */
  title: string;
  /** Icon */
  icon: string;
  /** Active item */
  isActive?: boolean;
}

const route = useRoute();
const data = computed(() =>
  props.data.map((item) => ({
    ...item,
    isActive:
      item.title.toLocaleLowerCase() ===
      route.name?.toString().toLocaleLowerCase(),
  }))
);
</script>

<template>
  <div :class="$style.sidebarSection">
    <p :class="$style.header">{{ title }}</p>
    <div :class="$style.content">
      <slot>
        <SidebarMenuItem
          v-for="(item, index) in data"
          :class="$style.sidebarItem"
          :key="index"
          :icon="item.icon"
          :title="item.title"
          :isActive="item.isActive"
        />
      </slot>
    </div>
  </div>
</template>

<style module lang="scss">
@use "@/scss/colors";
@use "@/scss/styles";

.sidebarSection {
  display: flex;
  flex-direction: column;
  gap: styles.$padding-sm-1;

  .sidebarItem {
    margin-bottom: styles.$margin-sm-1;
  }
}
</style>
