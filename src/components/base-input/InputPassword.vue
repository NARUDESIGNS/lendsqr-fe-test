<script setup lang="ts">
import { ref } from "vue";
import InputText from "./InputText.vue";

const modelValue = defineModel<string | undefined>();

defineOptions({
  inheritAttrs: false,
});

const type = ref("password");
const togglePasswordType = () =>
  (type.value = type.value === "password" ? "text" : "password");
</script>

<template>
  <div :class="[$style.container, $attrs.class]">
    <InputText
      :type="type"
      v-model="modelValue"
      v-bind="$attrs"
      :class="$style.input"
    />
    <span :class="$style.showPassword" @click="togglePasswordType">SHOW</span>
  </div>
</template>

<style module lang="scss">
@use "@/scss/colors";
@use "@/scss/styles" as *;

.container {
  width: 100%;
  position: relative;

  .showPassword {
    font-size: 0.75rem;
    position: absolute;
    right: 16px;
    color: colors.use(primary);
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  .input {
    padding-right: $padding-xl;

    @media screen and (max-width: 768px) {
      padding-right: $padding-lg;
    }
  }
}
</style>
