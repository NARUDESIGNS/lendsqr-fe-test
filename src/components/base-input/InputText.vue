<script setup lang="ts">
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
</script>

<template>
  <div :class="[$style.container]">
    <input
      v-model="modelValue"
      :class="[$style.input, { [$style.disabled]: disabled }, $attrs.class]"
      :disabled="disabled"
      :placeholder="placeholder"
      v-bind="$attrs"
    />
  </div>
</template>

<style module lang="scss">
@use "@/scss/colors";

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
    border: 1px solid colors.use(border);
  }
}

.disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

// @media screen and (max-width: 400px) {
//   .input {
//     padding: 15px;
//   }
// }
</style>
