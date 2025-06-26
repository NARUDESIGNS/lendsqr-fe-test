<script setup lang="ts">
defineProps<{
  /** Title */
  title: string;
  /** Details */
  dataList: DataList[];
}>();

type DataList = {
  title: string;
  value?: string | number;
};
</script>

<template>
  <div :class="$style.wrap">
    <p :class="$style.title">{{ title }}</p>
    <div :class="$style.dataListWrap">
      <div :class="$style.dataList" v-for="data in dataList" :key="data.title">
        <p :class="$style.dataListTitle">{{ data.title }}</p>
        <p :class="$style.dataListValue" :title="data.value?.toString()">
          {{ data.value }}
        </p>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
@use "@/scss/colors";
@use "@/scss/styles" as *;

.wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: $margin-md-1;
  padding-bottom: $padding-md;
  margin-bottom: $margin-md;
}

.dataListWrap {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: $margin-md-1;
}

.title {
  font-weight: 500;
  color: colors.use(text-dark);
}

.dataListTitle {
  font-weight: 400;
  font-size: 0.75rem;
  text-transform: uppercase;
}

.dataListValue {
  font-weight: 500;
  max-width: 230px;
  white-space: noWrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

@media screen and (max-width: 910px) {
  .dataListWrap {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
