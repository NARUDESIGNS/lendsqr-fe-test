<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  /** Title */
  title: string;
  /** Icon */
  icon: string;
  /** Count */
  count: number;
}>();

function formatNumber(num: number) {
  return num > 1000000
    ? new Intl.NumberFormat("en", {
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(num)
    : num.toLocaleString();
}

const count = computed(() => formatNumber(props.count));
</script>

<template>
  <div :class="$style.userStatsCard">
    <slot name="icon">
      <img :src="icon" :class="$style.icon" alt="Icon" />
    </slot>
    <p :class="$style.title">{{ title }}</p>
    <p :class="$style.count">{{ count || 0 }}</p>
  </div>
</template>

<style module lang="scss">
@use "@/scss/colors";
@import "@/scss/spaces";

.userStatsCard {
  background-color: colors.use("bg-primary");
  padding: $padding-lg;
  display: flex;
  flex-direction: column;
  gap: $padding-sm-1;
  box-shadow: 3px 5px 20px rgba(0, 0, 0, 0.1);
}

.icon {
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
