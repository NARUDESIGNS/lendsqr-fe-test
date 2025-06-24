<script setup lang="ts">
import UserIcon from "@/assets/icons/users-icon.svg";
import SidebarMenuSection from "@/components/sidebar/SidebarMenuSection.vue";
import { ref } from "vue";

const menuData = ref([
  {
    title: "Users",
    icon: UserIcon,
    isActive: true,
  },
  {
    title: "Settings",
    icon: UserIcon,
  },
  {
    title: "Profile",
    icon: UserIcon,
  },
]);
</script>

<template>
  <div :class="$style.sidebarMenu">
    <SidebarMenuSection title="Customers" :data="menuData" />
  </div>
</template>

<style module lang="scss">
@use "@/scss/colors";
@use "@/scss/styles";

.sidebarMenu {
  display: flex;
  flex-direction: column;
  background-color: colors.use(bg-primary);
  width: 280px;
  overflow-y: auto;
  box-shadow: styles.$box-shadow;

  // temporary: stick sidebar
  //   height: 100vh;
  height: calc(100dvh - 112px);
  position: sticky;
  top: 112px;
}
</style>
