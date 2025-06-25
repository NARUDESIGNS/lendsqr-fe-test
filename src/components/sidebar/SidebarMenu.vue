<script setup lang="ts">
import BadgePercentIcon from "@/assets/vue-icons/BadgePercentIcon.vue";
import BankIcon from "@/assets/vue-icons/BankIcon.vue";
import BriefcaseIcon from "@/assets/vue-icons/BriefcaseIcon.vue";
import ChartBarIcon from "@/assets/vue-icons/ChartBarIcon.vue";
import ClipboardIcon from "@/assets/vue-icons/ClipboardIcon.vue";
import CoinsSolidIcon from "@/assets/vue-icons/CoinsSolidIcon.vue";
import GalaxyIcon from "@/assets/vue-icons/GalaxyIcon.vue";
import HandMoneySackIcon from "@/assets/vue-icons/HandMoneySackIcon.vue";
import HandshakeIcon from "@/assets/vue-icons/HandshakeIcon.vue";
import HomeIcon from "@/assets/vue-icons/HomeIcon.vue";
import MoneySackIcon from "@/assets/vue-icons/MoneySackIcon.vue";
import MultiUsersIcon from "@/assets/vue-icons/MultiUsersIcon.vue";
import PhoneInOutIcon from "@/assets/vue-icons/PhoneInOutIcon.vue";
import PiggyBankIcon from "@/assets/vue-icons/PiggyBankIcon.vue";
import ScrollIcon from "@/assets/vue-icons/ScrollIcon.vue";
import SignOutIcon from "@/assets/vue-icons/SignOutIcon.vue";
import SlidersIcon from "@/assets/vue-icons/SlidersIcon.vue";
import UserCheckIcon from "@/assets/vue-icons/UserCheckIcon.vue";
import UserCogIcon from "@/assets/vue-icons/UserCogIcon.vue";
import UsersIcon from "@/assets/vue-icons/UsersIcon.vue";
import UserXIcon from "@/assets/vue-icons/UserXIcon.vue";
import WheelIcon from "@/assets/vue-icons/WheelIcon.vue";
import SidebarMenuItem from "@/components/sidebar/SidebarMenuItem.vue";
import SidebarMenuSection from "@/components/sidebar/SidebarMenuSection.vue";

const menuData = [
  {
    title: "Customers",
    data: [
      {
        title: "Users",
        icon: UsersIcon,
      },
      {
        title: "Guarantors",
        icon: MultiUsersIcon,
      },
      {
        title: "Loans",
        icon: MoneySackIcon,
      },
      {
        title: "Decision Models",
        icon: HandshakeIcon,
      },
      {
        title: "Savings",
        icon: PiggyBankIcon,
      },
      {
        title: "Loan Requests",
        icon: HandMoneySackIcon,
      },
      {
        title: "Whitelist",
        icon: UserCheckIcon,
      },
      {
        title: "Karma",
        icon: UserXIcon,
      },
    ],
  },
  {
    title: "Businesses",
    data: [
      {
        title: "Organization",
        icon: BriefcaseIcon,
      },
      {
        title: "Loan Products",
        icon: HandMoneySackIcon,
      },
      {
        title: "Savings Products",
        icon: BankIcon,
      },
      {
        title: "Fees and Charges",
        icon: CoinsSolidIcon,
      },
      {
        title: "Transactions",
        icon: PhoneInOutIcon,
      },
      {
        title: "Services",
        icon: GalaxyIcon,
      },
      {
        title: "Service Account",
        icon: UserCogIcon,
      },
      {
        title: "Settlements",
        icon: ScrollIcon,
      },
      {
        title: "Reports",
        icon: ChartBarIcon,
      },
    ],
  },
  {
    title: "Settings",
    data: [
      {
        title: "Preferences",
        icon: SlidersIcon,
      },
      {
        title: "Fees and Pricing",
        icon: BadgePercentIcon,
      },
      {
        title: "Audit Logs",
        icon: ClipboardIcon,
      },
      {
        title: "Systems Messages",
        icon: WheelIcon,
      },
    ],
  },
];
</script>

<template>
  <div :class="$style.sidebarMenu">
    <SidebarMenuItem
      :class="$style.switchOrganization"
      title="Switch Organization"
    >
      <template #icon>
        <BriefcaseIcon />
      </template>
    </SidebarMenuItem>
    <SidebarMenuItem :class="$style.homeIcon" title="Dashboard">
      <template #icon>
        <HomeIcon />
      </template>
    </SidebarMenuItem>
    <SidebarMenuSection
      v-for="(item, index) in menuData"
      :title="item.title"
      :data="item.data"
      :key="index"
    />
    <footer :class="$style.footer">
      <SidebarMenuItem :class="$style.signOutIcon" title="Logout">
        <template #icon>
          <SignOutIcon />
        </template>
      </SidebarMenuItem>
      <p :class="$style.footerText">v1.2.0</p>
    </footer>
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
  gap: styles.$margin-lg-1;
  padding-top: styles.$padding-lg;
  padding-bottom: styles.$padding-md;
  height: calc(100dvh - 112px);
  position: sticky;
  top: 112px;

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }

  &:hover::-webkit-scrollbar {
    display: block;
  }

  .switchOrganization,
  .signOutIcon {
    opacity: 1;
  }
}

.footer {
  display: flex;
  flex-direction: column;
  gap: styles.$margin-lg;
  border-top: 1px solid lighten(colors.use("border"), 60%);
  .footerText {
    color: colors.use(text-dark);
    padding-left: styles.$padding-lg;
  }
}
</style>
