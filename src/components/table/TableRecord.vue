<script setup lang="ts">
import MoreVerticalIcon from "@/assets/vue-icons/MoreVerticalIcon.vue";
import BaseTag from "@/components/base-tag/BaseTag.vue";
import { StatusType } from "@/enums/StatusType";

defineProps<{
  /** Organization */
  organization: string;
  /** Username */
  username: string;
  /** Email */
  email: string;
  /** Phone number */
  phone: string;
  /** date */
  date: string;
  /** Status */
  status: StatusType;
}>();

defineEmits<{
  showMore: [event: MouseEvent];
}>();
</script>

<template>
  <div :class="$style.tableRecord">
    <p :class="$style.data" :title="organization">{{ organization }}</p>
    <p :class="$style.data" :title="username">{{ username }}</p>
    <p :class="$style.data" :title="email">{{ email }}</p>
    <p :class="$style.data" :title="phone">{{ phone }}</p>
    <p :class="$style.data" :title="date">{{ date }}</p>
    <BaseTag :status="status" :class="$style.tag" />
    <span
      tabindex="0"
      :class="$style.moreIcon"
      @click="$emit('showMore', $event)"
    >
      <MoreVerticalIcon />
    </span>
  </div>
</template>

<style module lang="scss">
@use "@/scss/colors";
@use "@/scss/styles" as *;

.tableRecord {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 0.2fr;
  align-items: center;
  padding: $padding-md 0;
  gap: $padding-md-1;
  color: colors.use(text);
  font-weight: 400;
  font-size: 0.875rem;

  .data {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 180px;
    display: block;
  }

  .moreIcon {
    padding: 0 $padding-sm;
    cursor: pointer;
  }
}

@media screen and (max-width: 690px) {
  .tableRecord {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $margin-sm-1;
  }
  .tag {
    margin-left: auto;
  }
  .data {
    display: none !important;
  }
  .data:nth-child(2) {
    display: flex !important;
  }
}
</style>
