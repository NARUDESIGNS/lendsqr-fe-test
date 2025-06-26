<script setup lang="ts">
import ActiveUsersIcon from "@/assets/vue-icons/ActiveUsersIcon.vue";
import LoansIcon from "@/assets/vue-icons/LoansIcon.vue";
import SavingsIcon from "@/assets/vue-icons/SavingsIcon.vue";
import Users2Icon from "@/assets/vue-icons/Users2Icon.vue";
import NavBar from "@/components/NavBar.vue";
import SidebarMenu from "@/components/sidebar/SidebarMenu.vue";
import TableData from "@/components/table/TableData.vue";
import UserStatsCard from "@/pages/users/UserStatsCard.vue";
import { computed, ref, useCssModule } from "vue";
import { useRoute } from "vue-router";

const $style = useCssModule();
const data = [
  { title: "Users", icon: Users2Icon, count: 2453, style: $style.pink },
  {
    title: "Active Users",
    icon: ActiveUsersIcon,
    count: 2453,
    style: $style.purple,
  },
  {
    title: "Users With Loans",
    icon: LoansIcon,
    count: 12453,
    style: $style.red,
  },
  {
    title: "Users With Savings",
    icon: SavingsIcon,
    count: 102453,
    style: $style.orange,
  },
];

const route = useRoute();
const isDetailsPage = computed(
  () => !!route.params.id && Number(route.params.id)
);

const isVisibleSideMenu = ref(false);
const toggleMenu = () => {
  isVisibleSideMenu.value = !isVisibleSideMenu.value;
};
</script>

<template>
  <div :class="$style.overallWrap">
    <NavBar @toggleMenu="toggleMenu" />
    <div :class="$style.contentWrap">
      <SidebarMenu
        :class="[
          $style.sidebarMenu,
          { [$style.toggleMenu]: isVisibleSideMenu },
        ]"
      />
      <template v-if="isDetailsPage">
        <RouterView />
      </template>
      <div v-else :class="$style.mainContent">
        <h1 :class="$style.title">Users</h1>
        <div :class="$style.statsWrap">
          <UserStatsCard
            v-for="(item, index) in data"
            :key="index"
            :title="item.title"
            :count="item.count"
          >
            <template #icon>
              <div :class="[$style.icon, item.style]">
                <Component :is="item.icon" />
              </div>
            </template>
          </UserStatsCard>
        </div>
        <TableData />
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
@use "@/scss/colors";
@use "@/scss/styles" as *;

.overallWrap {
  position: relative;
}

.contentWrap {
  display: flex;
}

.sidebarMenu {
  flex: none;
}

.mainContent {
  display: flex;
  flex-direction: column;
  gap: $padding-lg;
  min-height: 100dvh;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: $padding-xl;
}

.title {
  font-weight: 500;
  font-size: 1.5rem;
  color: colors.use(text-dark);
}

.statsWrap {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: $padding-md-1;
}

.icon {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  padding: $padding-sm;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    height: 24px;
    width: 24px;
  }
}
.pink {
  background-color: rgba(colors.use("pink"), 0.1);
}
.purple {
  background-color: rgba(colors.use("purple"), 0.1);
}
.orange {
  background-color: rgba(colors.use("orange"), 0.1);
}
.red {
  background-color: rgba(colors.use("red"), 0.1);
}

@media screen and (max-width: 1078px) {
  .sidebarMenu {
    display: none;
    position: fixed;
    z-index: 1;
    top: 0;
    bottom: 0;
    min-height: 100vh;
  }
  .toggleMenu {
    display: flex;
  }
}

@media screen and (max-width: 690px) {
  .mainContent {
    padding: $padding-lg;
  }
}
</style>
