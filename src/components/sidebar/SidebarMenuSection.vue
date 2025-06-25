<script setup lang="ts">
import SidebarMenuItem from "@/components/sidebar/SidebarMenuItem.vue";
import { type Component, computed } from "vue";
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
  icon: Component;
  /** Active item */
  isActive?: boolean;
}

const route = useRoute();
const data = computed(() =>
  props.data.map((item) => {
    const title = item.title.toLocaleLowerCase().replaceAll(" ", "");
    const routeName = route.path
      .split("/")[1]
      .toLocaleLowerCase()
      .replaceAll("-", "");
    return {
      ...item,
      isActive: title === routeName,
    };
  })
);
</script>

<template>
  <div :class="$style.sidebarSection">
    <p :class="$style.title">{{ title }}</p>
    <div :class="$style.content">
      <SidebarMenuItem
        v-for="(item, index) in data"
        :class="$style.sidebarItem"
        :key="index"
        :title="item.title"
        :isActive="item.isActive"
      >
        <template #icon>
          <Component :is="item.icon" />
        </template>
      </SidebarMenuItem>
    </div>
  </div>
</template>

<style module lang="scss">
@use "@/scss/colors";
@use "@/scss/styles" as *;

.sidebarSection {
  display: flex;
  flex-direction: column;
  gap: $margin-sm-1;

  .title {
    padding-left: $padding-lg;
    text-transform: uppercase;
  }

  .sidebarItem:not(:last-child) {
    margin-bottom: $margin-sm-1;
  }
}
</style>
