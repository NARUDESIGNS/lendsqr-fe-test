<script setup lang="ts">
import { computed, useCssModule } from "vue";
import BaseLoader from "../base-loader/BaseLoader.vue";

const props = withDefaults(
  defineProps<{
    /** Button Value */
    value?: string;
    /** Button Width */
    width?: string;
    /** Button Loading State */
    isLoading?: boolean;
    /** Disable Button */
    disabled?: boolean;
    /** Button Type */
    primary?: boolean;
    /** Button Type */
    danger?: boolean;
    /** Button Type */
    outline?: boolean;
  }>(),
  {
    value: undefined,
    width: "100%",
  }
);

const $style = useCssModule();
const style = computed(() => {
  return {
    [$style.primary]: props.primary,
    [$style.danger]: props.danger,
    [$style.outline]: props.outline,
    [$style.disabled]: props.disabled,
  };
});

const width = computed(() => (props.width ? `${props.width}px` : "250px"));
</script>

<template>
  <button :class="[$style.btn, style]" :disabled="disabled" type="button">
    <template v-if="isLoading">
      <BaseLoader :light="!outline" />
    </template>
    <template v-else>
      <slot>
        {{ value }}
      </slot>
    </template>
  </button>
</template>

<style module lang="scss">
@use "@/scss/colors";
@use "@/scss/styles" as *;

.btn {
  width: v-bind(width);
  padding: 0 $padding-sm-1;
  height: 48px;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  color: white;
  background-color: colors.use(primary);
  text-transform: uppercase;
  transition: 0.3s ease;

  &:hover,
  &:focus {
    background-color: darken($color: colors.use(primary), $amount: 7);
  }
}

.danger {
  background: none;
  transition: 0.3s ease;
  border: 1px solid colors.use(danger);
  color: colors.use(danger);

  &:hover,
  &:focus {
    background-color: transparent;
    border-color: darken($color: colors.use(danger), $amount: 10);
    color: darken($color: colors.use(danger), $amount: 10);
  }
}
.outline {
  background: none;
  border: 1px solid colors.use(primary);
  color: colors.use(primary);
  transition: 0.3s ease;

  &:focus,
  &:hover {
    background-color: transparent;
    border-color: darken($color: colors.use(primary), $amount: 10);
    color: darken($color: colors.use(primary), $amount: 10);
  }
}

.disabled {
  cursor: not-allowed;
  opacity: 0.3;
}

@media screen and (max-width: 550px) {
  .btn {
    width: 100%;
  }
}
</style>
