<script setup lang="ts">
import BellIcon from "@/assets/icons/bell-icon.svg";
import CaretDown from "@/assets/icons/caret-down.svg";
import Logo from "@/assets/icons/logo.svg";
import MenuIcon from "@/assets/icons/menu-icon.svg";
import UserImage from "@/assets/images/userImg.png";
import InputSearch from "@/components/base-input/InputSearch.vue";
import { ref } from "vue";

const navBarContent = ref<HTMLElement | null>(null);
const isMenuVisible = ref(false);
const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value;
  if (navBarContent.value) {
    navBarContent.value.style.display = isMenuVisible.value ? "flex" : "none";
  }
};
</script>

<template>
  <div :class="$style.navBar">
    <img
      :class="$style.navBarLogo"
      :src="Logo"
      alt="Logo"
      @click="$router.push({ path: '/' })"
    />
    <span :class="$style.menuIconWrap" @click="toggleMenu">
      <img :class="$style.menuIcon" :src="MenuIcon" alt="Menu Icon" />
    </span>
    <div :class="$style.navBarContent" ref="navBarContent">
      <InputSearch :class="$style.navBarSearch" />
      <div :class="$style.navBarItems">
        <a :class="$style.docs" href="#docs">Docs</a>
        <img :class="$style.bellIcon" :src="BellIcon" alt="Bell Icon" />
        <div :class="$style.user">
          <img :class="$style.userImg" :src="UserImage" alt="User Image" />
          <div :class="$style.userName">
            Ayodeji
            <span :class="$style.caretDown">
              <img
                :class="$style.caretDown"
                :src="CaretDown"
                alt="Caret Down Icon"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
@use "@/scss/colors";
@use "@/scss/styles";

.navBar {
  position: sticky;
  top: 0;
  z-index: 1;

  display: flex;
  align-items: center;
  gap: styles.$padding-xl;
  background-color: colors.use("bg-primary");
  padding: styles.$padding-lg;
  box-shadow: styles.$box-shadow;

  .navBarLogo {
    height: 40px;
    width: 145px;
    cursor: pointer;
  }
}

.menuIconWrap {
  padding: styles.$padding-sm;
  display: flex;
  display: none;
}

.navBarContent {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: styles.$padding-md;
  width: 100%;
}

.navBarItems {
  display: flex;
  align-items: center;
  gap: styles.$padding-lg;

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
    gap: styles.$padding-sm;
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
        margin-left: styles.$padding-xs;
      }
    }
  }
}

@media screen and (max-width: 960px) {
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
    right: styles.$margin-lg;
    background-color: colors.use("bg-light");
    box-shadow: styles.$box-shadow-lg;
    padding: styles.$padding-md;
    display: none;
  }

  .user {
    order: -1;
  }
}
</style>
