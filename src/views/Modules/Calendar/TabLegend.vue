<template>
  <div class="text-left mt-5">
    <h2 class="font-bold text-lg mb-2">{{ $t('calendar.legend.notification.header') }}</h2>
    <ul>
      <li><span class="color-circle bg-green-500"/><span class="text">{{ $t('calendar.legend.notification.in-30-60') }}</span></li>
      <li><span class="color-circle bg-orange-500"/><span class="text">{{ $t('calendar.legend.notification.in-14-30') }}</span></li>
      <li><span class="color-circle bg-red-500"/><span class="text">{{ $t('calendar.legend.notification.up-to-14') }}</span></li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {

}
</script>

<style lang="scss" scoped>
.color-circle {
  $diameter: 30px;
  height: $diameter;
  width: $diameter;
  @apply rounded-xl inline-block border-2
}

ul li {
  @apply flex justify-start
}

li + li {
  @apply mt-1
}

.text {
  @apply self-center ml-1 mt-1
}
</style>