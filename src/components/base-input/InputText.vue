<script setup lang="ts">
import BaseButton from "@/components/base-button/BaseButton.vue";
import { computed, ref } from "vue";

defineProps<{
  /** Disabled */
  disabled?: boolean;
  /** Placeholder */
  placeholder?: string;
  /** Show remove button */
  showButton?: boolean;
}>();

const modelValue = defineModel<string | number>({
  default: "",
  type: [String, Number],
});

defineOptions({
  inheritAttrs: false,
});

const inputRef = ref<HTMLInputElement | null>(null);
const btnHeight = computed(() => `${inputRef.value?.offsetHeight || 40}px`);
</script>

<template>
  <div :class="$style.container">
    <input
      v-model="modelValue"
      :class="[$style.input, { [$style.disabled]: disabled }, $attrs.class]"
      :disabled="disabled"
      :placeholder="placeholder"
      v-bind="$attrs"
      ref="inputRef"
    />
    <BaseButton v-if="showButton" :class="$style.btn">
      <slot> done </slot>
    </BaseButton>
  </div>
</template>

<style module lang="scss">
@use "@/scss/colors";
@use "@/scss/styles";

::placeholder {
  color: colors.use(text);
}

.container {
  display: flex;
  width: 100%;
  min-width: fit-content;
}

.input {
  padding: 16px;
  border-radius: 8px;
  border: 1px solid colors.use(border-light);
  min-width: 250px;
  width: 100%;
  font-size: 0.875rem;
  color: colors.use(text);

  &:focus {
    outline: none;
    border: 1px solid colors.use(primary);
  }
}

.disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.btn {
  height: v-bind(btnHeight);
  width: 56px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding: styles.$padding-md;

  &:active,
  &:focus {
    outline: none;
  }
}
</style>
