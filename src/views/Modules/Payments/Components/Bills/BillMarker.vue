<template>
  <span :class="{
    [stateBgColor]: true,
    'marker': true,
  }"/>
</template>

<script lang="ts">
export default {
  props: {
    planned: {
      type: Number,
      required: true,
    },
    spend: {
      type: Number,
      required: true,
    }
  },
  computed: {
    stateBgColor(): string {
      if (this.spend > this.planned) {
        return 'bg-red-500'
      }

      if (this.spend >= 0.75 * this.planned) {
        return 'bg-orange-500';
      }

      return 'bg-green-500';
    }
  }
}
</script>

<style lang="scss" scoped>
.marker {
  $diameter: 15px;
  height: $diameter;
  width: $diameter;
  @apply rounded-xl inline-block mr-1
}
</style>