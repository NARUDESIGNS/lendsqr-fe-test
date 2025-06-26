<script setup lang="ts">
import UserOutlineIcon from "@/assets/vue-icons/UserOutlineIcon.vue";

defineProps<{
  /** id */
  id: string;
  /** Full Name */
  fullName: string;
  /**  User Rating */
  userRating: number;
  /**  Income */
  income: string;
  /**  Account Number */
  accountNumber: string;
  /**  Account Name */
  accountName: string;
}>();
</script>

<template>
  <div :class="$style.userSummary">
    <div :class="$style.userDetails">
      <span :class="$style.userImg">
        <UserOutlineIcon />
      </span>
      <div :class="$style.userInfo">
        <p :class="$style.username">
          {{ fullName }}
        </p>
        <p :class="$style.id">{{ id }}</p>
      </div>
      <hr :class="$style.divider" />
      <div :class="$style.tierRating">
        <p>User's Tier</p>
        <span>* * *</span>
      </div>
      <hr :class="$style.divider" />
      <div :class="$style.accountDetails">
        <p :class="$style.income">{{ income }}</p>
        <p :class="$style.accountName">{{ accountNumber }}/{{ accountName }}</p>
      </div>
    </div>
    <ul :class="$style.summaryNav">
      <li :class="[$style.summaryNavItems, $style.active]">General Details</li>
      <li :class="$style.summaryNavItems">Documents</li>
      <li :class="$style.summaryNavItems">Bank Details</li>
      <li :class="$style.summaryNavItems">Loans</li>
      <li :class="$style.summaryNavItems">Savings</li>
      <li :class="$style.summaryNavItems">App and System</li>
    </ul>
  </div>
</template>

<style module lang="scss">
@use "@/scss/colors";
@use "@/scss/styles" as *;

.userSummary {
  display: flex;
  flex-direction: column;
  gap: $margin-lg;
  width: 100%;
  box-shadow: $box-shadow;
  background-color: colors.use(bg-light);
  padding: $padding-md-1;
  padding-bottom: 0;
  line-height: 1;
  border-radius: 4px;
}

.userDetails {
  display: flex;
  align-items: center;
  gap: $margin-lg;
  flex-wrap: wrap;
}

.userImg {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $padding-md-1;
  background: rgba(colors.use(border), 0.1);
  height: 100px;
  width: 100px;
  border-radius: 50%;
  flex: none;
}

.userInfo {
  display: flex;
  flex-direction: column;
  gap: $margin-sm;
  margin-left: -$margin-md;
}

.username,
.income {
  font-weight: 500;
  font-size: 1.375rem;
  color: colors.use(text-dark);
}

.id,
.accountName {
  font-size: 0.875rem;
  font-weight: 400;
  color: colors.use(text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tierRating {
  line-height: 1.5;
  font-size: 0.875rem;
}

.accountDetails {
  display: flex;
  flex-direction: column;
  gap: $margin-sm;
}

.divider {
  height: 100px;
  width: 1px;
  border: none;
  outline: none;
  background: rgba(colors.use(border), 0.1);
}

.summaryNav {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow-x: auto;

  .summaryNavItems {
    padding: $padding-sm-1 $padding-md;
  }

  .active {
    border-bottom: 2px solid colors.use(primary);
    color: colors.use(primary);
  }
}

@media screen and (max-width: 910px) {
  .summaryNav {
    overflow-x: scroll !important;
    width: 100% !important;
    white-space: nowrap !important;
  }
}

@media screen and (max-width: 640px) {
  .userSummary {
    .divider:last-of-type {
      display: none !important;
    }
  }
}

@media screen and (max-width: 475px) {
  .userSummary {
    .divider:first-of-type {
      display: none !important;
    }
  }
}
</style>
