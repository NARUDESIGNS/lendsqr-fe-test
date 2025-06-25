<script setup lang="ts">
import { useEnumLabel } from "@/composables/useEnumLabel";
import { StatusType } from "@/enums/StatusType";

const props = defineProps<{
  status: StatusType;
}>();

const statusColors = {
  [StatusType.Active]: "active",
  [StatusType.Inactive]: "inactive",
  [StatusType.Pending]: "pending",
  [StatusType.Blacklisted]: "blacklisted",
};
</script>

<template>
  <span :class="[$style.tag, $style[statusColors[props.status]]]">
    {{ useEnumLabel(StatusType, props.status) }}
  </span>
</template>

<style module lang="scss">
@use "@/scss/colors";
@use "@/scss/styles" as *;

.tag {
  display: inline-block;
  padding: $padding-sm $padding-md;
  border-radius: 16px;
  font-size: 0.95em;
  font-weight: 500;
  color: colors.use(text);
  width: fit-content;
}

.active {
  background: lighten(colors.use(success), 50%);
  color: colors.use(success);
}
.inactive {
  background: lighten(colors.use(inactive), 50%);
  color: colors.use(inactive);
}
.pending {
  background: lighten(colors.use(warning), 50%);
  color: colors.use(warning);
}
.blacklisted {
  background: lighten(colors.use(danger), 50%);
  color: colors.use(danger);
}
</style>
