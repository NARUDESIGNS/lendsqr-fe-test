<script setup lang="ts">
import UserImage from "@/assets/images/userImg.png";
import BellIcon from "@/assets/vue-icons/BellIcon.vue";
import CaretDownIcon from "@/assets/vue-icons/CaretDownIcon.vue";
import LogoIcon from "@/assets/vue-icons/LogoIcon.vue";
import MenuIcon from "@/assets/vue-icons/MenuIcon.vue";
import InputSearch from "@/components/base-input/InputSearch.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

defineEmits<{
  toggleMenu: [];
}>();

const navBarContent = ref<HTMLElement | null>(null);
const isMenuVisible = ref(false);
const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value;
  if (navBarContent.value) {
    navBarContent.value.style.display = isMenuVisible.value ? "flex" : "none";
  }
};

const router = useRouter();
const navigateToHome = () => {
  router.push({ path: "/" });
};
</script>

<template>
  <div :class="$style.navBar">
    <Component
      :class="$style.navBarLogo"
      :is="LogoIcon"
      @click="navigateToHome"
    />
    <span :class="$style.menuIconWrap" @click="toggleMenu, $emit('toggleMenu')">
      <Component :class="$style.menuIcon" :is="MenuIcon" alt="Menu Icon" />
    </span>
    <div :class="$style.navBarContent" ref="navBarContent">
      <InputSearch :class="$style.navBarSearch" />
      <div :class="$style.navBarItems">
        <a :class="$style.docs" href="#docs">Docs</a>
        <Component :class="$style.bellIcon" :is="BellIcon" />
        <div :class="$style.user">
          <img :class="$style.userImg" :src="UserImage" alt="User Image" />
          <div :class="$style.userName">
            Ayodeji
            <span :class="$style.caretDown">
              <Component :class="$style.caretDown" :is="CaretDownIcon" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
@use "@/scss/colors";
@use "@/scss/styles" as *;

.navBar {
  position: sticky;
  top: 0;
  z-index: 10;

  display: flex;
  align-items: center;
  gap: $padding-xl;
  background-color: colors.use("bg-primary");
  padding: $padding-lg;
  box-shadow: $box-shadow;

  .navBarLogo {
    height: 40px;
    width: 145px;
    cursor: pointer;
  }
}

.menuIconWrap {
  padding: $padding-sm;
  display: flex;
  display: none;

  .menuIcon {
    cursor: pointer;
  }
}

.navBarContent {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $padding-md;
  width: 100%;
}

.navBarItems {
  display: flex;
  align-items: center;
  gap: $padding-lg;

  .docs {
    color: default;
    text-decoration: underline;
    font-weight: 400;
  }

  .bellIcon {
    height: 24px;
    width: 24px;
    cursor: pointer;
  }

  .user {
    display: flex;
    align-items: center;
    gap: $padding-sm;
    cursor: pointer;

    .userImg {
      height: 48px;
      width: 48px;
      border-radius: 50%;
      object-fit: cover;
      flex: none;
    }

    .userName {
      color: colors.use("text-dark");
      font-weight: 500;
      font-size: 16px;
      display: flex;

      .caretDown {
        font-size: 12px;
        margin-left: $padding-xs;
      }
    }
  }
}

@media screen and (max-width: 1078px) {
  .menuIconWrap {
    display: flex;
    margin-left: auto;
  }

  .navBarContent {
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    max-width: 360px;
    width: 100%;
    position: absolute;
    top: 100px;
    right: $margin-lg;
    background-color: colors.use("bg-light");
    box-shadow: $box-shadow-lg;
    padding: $padding-md;
    display: none;
  }

  .user {
    order: -1;
  }
}
</style>
