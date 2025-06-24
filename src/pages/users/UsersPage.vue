<script setup lang="ts">
import ActiveUsersIcon from "@/assets/icons/active-users-icon.svg";
import LoansIcon from "@/assets/icons/loans-icon.svg";
import SavingsIcon from "@/assets/icons/savings-icon.svg";
import UsersIcon from "@/assets/icons/users-icon.svg";
import NavBar from "@/components/NavBar.vue";
import SidebarMenu from "@/components/sidebar/SidebarMenu.vue";
import UserStatsCard from "@/pages/users/UserStatsCard.vue";
import { ref } from "vue";

const data = ref([
  { title: "Users", icon: UsersIcon, count: 2453 },
  { title: "Active Users", icon: ActiveUsersIcon, count: 2453 },
  { title: "Users With Loans", icon: LoansIcon, count: 12453 },
  { title: "Users With Savings", icon: SavingsIcon, count: 102453 },
]);
</script>

<template>
  <div :class="$style.overallWrap">
    <NavBar />
    <div :class="$style.contentWrap">
      <SidebarMenu :class="$style.sidebarMenu" />
      <div :class="$style.mainContent">
        <h1 :class="$style.title">Users</h1>
        <div :class="$style.statsWrap">
          <UserStatsCard
            v-for="(item, index) in data"
            :key="index"
            :title="item.title"
            :icon="item.icon"
            :count="item.count"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
@use "@/scss/colors";
@use "@/scss/styles";

.contentWrap {
  display: flex;
}

.sidebarMenu {
  flex: none;
}

.mainContent {
  min-height: 100dvh;
  // border: 1px solid #525252;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: styles.$padding-xl;
}

.title {
  font-weight: 500;
  font-size: 1.5rem;
  color: colors.use("text-dark");
  margin-bottom: styles.$padding-lg;
}

.statsWrap {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: styles.$padding-md-1;
}
</style>
