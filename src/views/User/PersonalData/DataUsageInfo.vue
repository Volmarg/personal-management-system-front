<template>
  <WarningBlock class="mb-6">
    <div class="text-left">
      <div class="font-bold"> {{ $t('user.personalData.messages.dataUsage.partial.keepInMind') }}</div>
      <div class="list-element"> <ua /> {{ $t('user.personalData.messages.dataUsage.partial.usedInApplications') }},</div>
      <div class="list-element"> <ua /> {{ $t('user.personalData.messages.dataUsage.partial.usedInPayments') }},</div>
      <div class="list-element"> <ua /> {{ $t('user.personalData.messages.dataUsage.partial.emailing') }},</div>
      <div class="list-element"> <ua /> {{ $t('user.personalData.messages.dataUsage.partial.etc') }},</div>
    </div>
  </WarningBlock>
</template>

<script lang="ts">
import WarningBlock from "@/components/Page/WarningBlock.vue";

export default {
  components: {
    WarningBlock
  }
}
</script>

<style lang="scss" scoped>
.list-element {
  @apply pt-1 ml-2
}
</style>