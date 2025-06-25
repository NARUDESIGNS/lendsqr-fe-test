<script setup lang="ts">
import { formatNumber } from "@/utils/formatNumber";
import { computed } from "vue";

const props = defineProps<{
  /** Title */
  title: string;
  /** Icon */
  icon?: string;
  /** Count */
  count: number;
}>();

const count = computed(() => formatNumber(props.count));
</script>

<template>
  <div :class="$style.userStatsCard">
    <slot name="icon">
      <img v-if="icon" :src="icon" :class="$style.imgIcon" alt="Icon" />
    </slot>
    <p :class="$style.title">{{ title }}</p>
    <p :class="$style.count">{{ count || 0 }}</p>
  </div>
</template>

<style module lang="scss">
@use "@/scss/colors";
@use "@/scss/styles" as *;

.userStatsCard {
  background-color: colors.use("bg-primary");
  padding: $padding-lg;
  display: flex;
  flex-direction: column;
  gap: $padding-sm-1;
  box-shadow: $box-shadow;
  border-radius: 4px;
}

.imgIcon {
  width: 24px;
  height: 24px;
}

.title {
  text-transform: uppercase;
  font-size: 0.75rem;
}

.count {
  font-size: 1.5rem;
  font-weight: 600;
  color: colors.use("text-dark");
}
</style>
