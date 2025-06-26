<script setup lang="ts">
defineProps<{
  /** Icon */
  icon?: string;
  /** Title */
  title: string;
  /** Active Item */
  isActive?: boolean;
}>();
</script>

<template>
  <div :class="[$style.sidebarItemWrap, { [$style.active]: isActive }]">
    <span :class="$style.icon">
      <slot name="icon">
        <img :src="icon" alt="icon" />
      </slot>
    </span>
    <p :class="$style.title">{{ title }}</p>
  </div>
</template>

<style module lang="scss">
@use "@/scss/colors";
@use "@/scss/styles" as *;

.sidebarItemWrap {
  display: flex;
  align-items: center;
  gap: $padding-sm-1;
  padding: $padding-sm-1 $padding-lg;
  cursor: pointer;
  transition: 0.3s ease;
  font-weight: 400;
  color: colors.use(text);
  opacity: 0.6;

  &:hover {
    color: colors.use(text-dark);
    opacity: 1;
  }
}

.active {
  opacity: 1;
  background-color: rgba(colors.use(primary), 0.1);
  color: colors.use(text-dark);
  border-left: 3px solid colors.use(primary);
}

.icon {
  display: flex;
}
</style>
